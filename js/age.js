let ageEl = document.getElementById("age");

let time = (new Date() - new Date(1122665400000)) / (1000 * 60 * 60 * 24 * 365.25); // milliseconds per year
ageEl.innerText = time.toString().substring(0, 2);

setInterval(() => {
	let time = (new Date() - new Date(1122665400000)) / (1000 * 60 * 60 * 24 * 365.25); // milliseconds per year
	ageEl.innerText = time.toString().substring(0, 2);
	console.log(time.toString())
}, 60000);
