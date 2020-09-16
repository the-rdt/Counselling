/**
 * @prettier
 */
var iiitData;
var allSelection = []; //stores all selected colleges-with-branches by user in form of objescts
// allSelection = [
//    {
// 		collegeShortID : "iiitl",
// 		collegeFullName : "IIIT Lucknow",
// 		branch : "Computer Science and Engineering"
//    }
// ]
//
var selectedBranches = []; // stores current selected branches from the selected college
//  selectedBranches = [
//  	"branch 1",
// 		"branch 2"
// ]
var unsortedData = [];

const colleges = document.getElementById('colleges');
const branchHolder = document.getElementById('branch');
const textarea = document.getElementById('all-selection');

////////////////////////////////////////////////////////////////////////////////////////////////////
// very important custom sort function
function dynamicsort(property) {
	var sort_order = 1;
	return function (a, b) {
		// a should come before b in the sorted order
		if (a[property] < b[property]) {
			return -1 * sort_order;
			// a should come after b in the sorted order
		} else if (a[property] > b[property]) {
			return 1 * sort_order;
			// a and b are the same
		} else {
			return 0 * sort_order;
		}
	};
}
////////////////////////////////////////////////////////////////////////////////////////////////////

$.getJSON('./assets/iiitList.json', (data) => {
	console.log(data.length);
	iiitData = data;
	var iiit = data.map((value) => {
		return `<option value=${value.shortID}>${value.name}</option>`;
	});
	$(colleges).html(iiit);
});

const handleCollegeChange = () => {
	$(branchHolder).dropdown('restore defaults'); // clear current branches dropdown selection (only ui)
	// console.log(colleges.options[colleges.selectedIndex].value);
	var branches = iiitData[colleges.selectedIndex].branch.map((value) => {
		return `<option>${value}</option>`;
	});
	// console.log(branches);
	$(branchHolder).html(branches);
};

colleges.onchange = handleCollegeChange;

const addCollege = () => {
	event.preventDefault();
	// document.getElementById('all-selection').textContent =
	// 	'hello\nworking\non testing\nwith dummy\ntext\nby rdt';

	selectedBranches = []; // clear previous selected branches from array

	for (var i = 0; i < branchHolder.selectedOptions.length; i++) {
		// console.log(branchHolder.selectedOptions[i].value);
		selectedBranches.push(branchHolder.selectedOptions[i].text);
	}
	$('#branch :selected').remove();

	// console.log(selectedBranches);

	let currBranches = selectedBranches.map((value) => {
		// push each selected branch with college name and shortID as a object in allSelection
		allSelection.push({
			collegeShordID: colleges.options[colleges.selectedIndex].value,
			collegeFullName: colleges.options[colleges.selectedIndex].text,
			branch: value,
		});
		return `${colleges.options[colleges.selectedIndex].text} - ${value}\n`;
	});
	textarea.append(currBranches); // display selection in textarea

	//so that on pressing add more than once without changing selection doesn't add same thing again and agian
	$(branchHolder).dropdown('restore defaults'); // so clear selection so selectedBranches.length == 0
};

function predictResult() {
	event.preventDefault();
	const category = document.getElementById('category').value;
	// console.log(category);
	if (allSelection.length > 0 && category) {
		document.getElementById('myDIV').style.display = 'block';
		document.getElementById('choiceFillingData').innerHTML = '';
		document.getElementById('tableLoader').style.display = 'block';
		// console.log(allSelection);
		unsortedData = allSelection.map((branchValue) => {
			// branchValue = {
			// 		collegeShortID : "iiitl",
			// 		collegeFullName : "IIIT Lucknow",
			// 		branch : "Computer Science and Engineering"
			// }
			// console.log(value.collegeShordID, value.branch);

			const url = `https://josaa.herokuapp.com/v1/josaa-data?institute=${branchValue.collegeShordID}&branch=${branchValue.branch}&category=${category}&year=2019`;

			// get data from server
			let getData = async () => {
				let openCloseData = await fetch(url).then((response) => {
					return response.json();
				});
				// console.log(openCloseData);
				return openCloseData;
			};
			// openCloseData = [
			// 		{
			// 			round : "Round1",
			// 			opening : 8078,
			// 			closing : 12847
			// 		}
			// ]
			let receivedData = getData().then((openCloseValue) => {
				// console.log(openCloseValue);
				return {
					collegeShordID: branchValue.collegeShordID,
					collegeFullName: branchValue.collegeFullName,
					branch: branchValue.branch,
					open1: openCloseValue[0].opening,
					close1: openCloseValue[0].closing,
					open2: openCloseValue[1].opening,
					close2: openCloseValue[1].closing,
					open3: openCloseValue[2].opening,
					close3: openCloseValue[2].closing,
					open4: openCloseValue[3].opening,
					close4: openCloseValue[3].closing,
					open5: openCloseValue[4].opening,
					close5: openCloseValue[4].closing,
					open6: openCloseValue[5].opening,
					close6: openCloseValue[5].closing,
					open7: openCloseValue[6].opening,
					close7: openCloseValue[6].closing,
				};
			});
			// console.log('receivedData', receivedData);
			return receivedData;
		});
		////////////////////////////////////////////////////////////////////////////////////////////////////
		// bad way of doing same thing. retain here for future reference to know what not to do
		// var unsortedData = fetch(url)
		// 	.then((response) => {
		// 		// console.log(response);
		// 		return response.json();
		// 	})
		// 	.then((data) => {
		// 		// console.log(data);
		// 		receivedData.push({
		// 			collegeID: value.collegeShordID,
		// 			college: value.college,
		// 			branch: value.branch,
		// 			open1: data[0].opening,
		// 			close1: data[0].closing,
		// 			open2: data[1].opening,
		// 			close2: data[1].closing,
		// 			open3: data[2].opening,
		// 			close3: data[2].closing,
		// 			open4: data[3].opening,
		// 			close4: data[3].closing,
		// 			open5: data[4].opening,
		// 			close5: data[4].closing,
		// 			open6: data[5].opening,
		// 			close6: data[5].closing,
		// 			open7: data[6].opening,
		// 			close7: data[6].closing,
		// 		});
		// 		console.log(receivedData);
		// 		return receivedData;
		// 	});
		// console.log('finalData', finalData);
		////////////////////////////////////////////////////////////////////////////////////////////////////

		Promise.all(unsortedData)
			.then((toSort) => {
				// console.log('resolved unsortedData', toSort);

				toSort.sort(dynamicsort('close1'));
				console.log('choices', toSort);
				displayTable(toSort);
			})
			.catch((error) => {
				alert(
					"we think internet broke his leg\nso he couldn't deliver the request\nplease refresh page and try again"
				);
			});

		// Promise.all(unsortedData).then((toSort) => {
		// 	// console.log('resolved unsortedData', toSort);

		// 	toSort.sort(dynamicsort('open1'));
		// 	console.log('choices', toSort);

		// 	toSort.forEach((tableRow) => {
		// 		var tableData = `
		// 	<tr>
		// 		<td
		// 			rowspan="2"
		// 			style="
		// 				background-color: #343a40;
		// 				color: #ffffff;
		// 			"
		// 		>
		// 			${tableRow.collegeFullName}
		// 		</td>
		// 		<td>${tableRow.branch} (open)</td>
		// 		<td>${tableRow.open1}</td>
		// 		<td>${tableRow.open2}</td>
		// 		<td>${tableRow.open3}</td>
		// 		<td>${tableRow.open4}</td>
		// 		<td>${tableRow.open5}</td>
		// 		<td>${tableRow.open6}</td>
		// 		<td>${tableRow.open7}</td>
		// 	</tr>
		// 	<tr>
		// 		<td>${tableRow.branch} (close)</td>
		// 		<td>${tableRow.close1}</td>
		// 		<td>${tableRow.close2}</td>
		// 		<td>${tableRow.close3}</td>
		// 		<td>${tableRow.close4}</td>
		// 		<td>${tableRow.close5}</td>
		// 		<td>${tableRow.close6}</td>
		// 		<td>${tableRow.close7}</td>
		// 	</tr>`;
		// 		document.getElementById('tableLoader').style.display = 'none';
		// 		document
		// 			.getElementById('choiceFillingData')
		// 			.insertAdjacentHTML('beforeend', tableData);
		// 	});
		// });
	} else {
		alert(
			'nahi majaak chal raha hai yahan\nbhai college aur gender to select karle pehle'
		);
	}
}

function displayTable(dataoftable) {
	dataoftable.forEach((tableRow) => {
		var tableData = `
			<tr>
				<td
					rowspan="2"
					style="
						background-color: #343a40;
						color: #ffffff;
					"
				>
					${tableRow.collegeFullName}
				</td>
				<td>${tableRow.branch} (open)</td>
				<td>${tableRow.open1}</td>
				<td>${tableRow.open2}</td>
				<td>${tableRow.open3}</td>
				<td>${tableRow.open4}</td>
				<td>${tableRow.open5}</td>
				<td>${tableRow.open6}</td>
				<td>${tableRow.open7}</td>
			</tr>
			<tr>
				<td>${tableRow.branch} (close)</td>
				<td>${tableRow.close1}</td>
				<td>${tableRow.close2}</td>
				<td>${tableRow.close3}</td>
				<td>${tableRow.close4}</td>
				<td>${tableRow.close5}</td>
				<td>${tableRow.close6}</td>
				<td>${tableRow.close7}</td>
			</tr>`;
		document.getElementById('tableLoader').style.display = 'none';
		document
			.getElementById('choiceFillingData')
			.insertAdjacentHTML('beforeend', tableData);
	});
}

// sort button
document.getElementById('sort').onchange = () => {
	// console.log(document.getElementById('sort').value);
	document.getElementById('choiceFillingData').innerHTML = '';
	Promise.all(unsortedData).then((toSort) => {
		// console.log('resolved unsortedData', toSort);

		toSort.sort(dynamicsort(document.getElementById('sort').value));
		console.log('choices', toSort);
		displayTable(toSort);
	});
};
