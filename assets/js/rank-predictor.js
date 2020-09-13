/**
 * @prettier
 */
function predictRank(e) {
	e.preventDefault();
	// prompt("hello")
	const percentile = document.getElementById('percentile').value;
	const category = document.getElementById('category').value;

	console.log(percentile, category);
	const url = `https://counsellingapi.herokuapp.com/v1/rank-with-percentile?percentile=${percentile}&category=${category}`;
	console.log(url);

	fetch(url)
		.then((response) => {
			console.log(response);
			// console.log(response.body);
			return response.json();
		})
		.then((data) => {
			// console.log(data.rank);
			document.getElementById(
				'rank'
			).textContent = `Your expected rank is : ${data.rank}`;
		});
}
