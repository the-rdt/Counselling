/**
 * @prettier
 */
var iiitData;
var allSelection = []; //stores all selected colleges-with-branches in form of objescts
var selectedBranches = []; // stores current selected branches from the selected college

const colleges = document.getElementById('colleges');
const branchHolder = document.getElementById('branch');
const textarea = document.getElementById('all-selection');

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

	// console.log(selectedBranches);

	//so that on pressing add more than once without changing selection doesn't add same thing again and agian
	if (selectedBranches.length > 0) {
		allSelection.push({
			collegeShordID: colleges.options[colleges.selectedIndex].value,
			allbranches: selectedBranches,
		});
	}

	// console.log(allSelection);

	let currBranches = selectedBranches.map((vlu) => {
		return `${colleges.options[colleges.selectedIndex].text} - ${vlu}\n`;
	});
	textarea.append(currBranches); // display selection in textarea

	//so that on pressing add more than once without changing selection doesn't add same thing again and agian
	$(branchHolder).dropdown('restore defaults'); // so clear selection so selectedBranches.length == 0
};

function predictResult() {
	event.preventDefault();
	document.getElementById('myDIV').style.display = 'block';
	console.log(allSelection);
}
