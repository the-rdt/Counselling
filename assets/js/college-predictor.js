/**
 * @prettier
 */

// function getRank(percentile, category) {
// 	const url = `https://counsellingapi.herokuapp.com/v1/rank-with-percentile?percentile=${percentile}&category=${category}`;
// 	console.log(url);

// 	fetch(url)
// 		.then((response) => {
// 			// console.log(response);
// 			// console.log(response.body);
// 			return response.json();
// 		})
// 		.then((data) => data.rank);
// }

function collegePredictor(e) {
	e.preventDefault();
	const percentile = document.getElementById('percentile').value;
	const category = document.getElementById('category').value;
	let rank = document.getElementById('rank').value;

	if (percentile && category) {
		console.log(percentile, category);
		const url = `https://counsellingapi.herokuapp.com/v1/rank-with-percentile?percentile=${percentile}&category=${category}`;
		console.log(url);

		fetch(url)
			.then((response) => {
				// console.log(response);
				// console.log(response.body);
				return response.json();
			})
			.then((data) => {
				rank = data.rank;
				console.log(rank);
			});
    }
    
}
