movie = {};
selected_actors = [];
movie["actors"] = selected_actors;

base_url = "https://still-atoll-31705.herokuapp.com/"; //"http://localhost:8080/";
async function fetchAsync(url) {
	let response = await fetch(url);
	let data = await response.json();
	return data;
}

selected_ids = [];

// var producers = document.getElementById("producers");
var actors = document.getElementById("actors");

movieId = localStorage.getItem("movieId");

fetchAsync(base_url + "actor/all/").then(function (data) {
	let new_actor = document.createElement("li");
	new_actor.innerText = "Add New Actor";
	new_actor.classList.add("list-group-item");
	new_actor.classList.add("font-weight-bold");
	actors.appendChild(new_actor);

	new_actor.onclick = function (event) {
		let actorDetails = document.getElementById("selected-actors");

		let divMain = document.createElement("div");
		let div = document.createElement("div");
		let actName_Cancel = document.createElement("div");
		let actorName = document.createElement("input");
		let actorBio = document.createElement("input");
		let actorDob = document.createElement("input");
		let actorSex = document.createElement("input");
		let actorRemove = document.createElement("i");

		actorName.classList.add("new_actor_name");
		actorBio.classList.add("new_actor_bio");
		actorDob.classList.add("new_actor_dob");
		actorSex.classList.add("new_actor_sex");

		// console.log($(this).val());

		actorRemove.onclick = function (eve) {
			var list = eve.srcElement.parentNode.parentNode.parentNode;
			list.parentNode.removeChild(list);
		};

		actName_Cancel.classList.add("d-flex");
		actName_Cancel.classList.add("justify-content-between");
		actorRemove.classList.add("material-icons");
		actorRemove.style.cursor = "pointer";
		actorRemove.style.fontSize = "20px";
		actorRemove.innerText = "cancel";
		actorName.style.color = "#000000";
		actorBio.style.color = "#000000";
		actorDob.style.color = "#000000";
		actorSex.style.color = "#000000";
		//   div.classList.add("card-body");
		actorName.required = true;
		actorName.classList.add("m-3");
		actorBio.classList.add("m-3");
		actorDob.classList.add("m-3");
		actorSex.classList.add("m-3");

		actorBio.placeholder = "Actor Bio";
		actorName.placeholder = "Actor Name";
		actorDob.placeholder = "Actor DOB";
		actorSex.placeholder = "Actor Sex";

		divMain.classList.add("card");
		divMain.classList.add("text-white");
		divMain.classList.add("text-white");
		divMain.classList.add("bg-dark");
		divMain.classList.add("m-3");
		divMain.classList.add("d-inline-block");
		divMain.setAttribute("style", "max-width: 20rem;");

		div.classList.add("card-body");

		actName_Cancel.appendChild(actorName);
		actName_Cancel.appendChild(actorRemove);
		div.appendChild(actName_Cancel);

		div.appendChild(actorBio);
		div.appendChild(actorDob);
		div.appendChild(actorSex);
		divMain.appendChild(div);
		actorDetails.appendChild(divMain);
	};

	insertNewActor(data);

	fetchAsync(base_url + "movie/" + movieId).then(function (movieDetails) {
		console.log(movieDetails);
		let movieName = document.getElementById("movie-name");
		let movieYor = document.getElementById("movie-yor");
		let movieDescription = document.getElementById("movie-description");
		let producerName = document.getElementById("producer-name");
		let producerBio = document.getElementById("producer-bio");
		let producerDob = document.getElementById("producer-dob");
		let producerSex = document.getElementById("producer-sex");

		movie["producerId"] = movieDetails["producerId"];
		movie["movieId"] = movieDetails["movieId"];

		movieName.value = movieDetails["movieName"];
		movieYor.value = movieDetails["movieYor"];
		movieDescription.value = movieDetails["moviePlot"];
		producerName.value = movieDetails["producerName"];
		producerBio.value = movieDetails["producerBio"];
		producerDob.value = movieDetails["producerDob"];
		producerSex.value = movieDetails["producerSex"];

		addActors(movieDetails["actors"]);
	});
});
function addActors(data) {
	for (i = 0; i < data.length; i++) {
		let actor = document.createElement("li");
		let actorId = data[i].actorId;
		let actorName = data[i].actorName;
		let actorSex = data[i].actorSex;
		let actorDob = data[i].actorDob;
		let actorBio = data[i].actorBio;

		actor.innerText = data[i].actorName;
		actor.classList.add("list-group-item");
		actors.appendChild(actor);

		let actorDetails = document.getElementById("selected-actors");

		selected_act = {};
		selected_act["actorName"] = actorName;
		selected_act["actorId"] = actorId;
		selected_act["actorSex"] = actorSex;
		selected_act["actorDob"] = actorDob;
		selected_act["actorBio"] = actorBio;

		selected_ids.push(actorId);
		selected_actors.push(selected_act);
		// producerDetails.removeAttribute("HIDDEN");
		// producerDetails.innerHTML = "";

		let divMain = document.createElement("div");
		let div = document.createElement("div");
		let actName_Cancel = document.createElement("div");
		let actName = document.createElement("input");
		let actBio = document.createElement("input");
		// let actDob_Sex = document.createElement("div");
		let actDob = document.createElement("input");
		let actSex = document.createElement("input");
		let actRemove = document.createElement("i");

		actName.onkeyup = function (event) {
			selected_act["actorName"] = actName.value;
		};

		actBio.onkeyup = function (event) {
			selected_act["actorBio"] = actBio.value;
		};

		actDob.onkeyup = function (event) {
			selected_act["actorDob"] = actDob.value;
		};

		actSex.onkeyup = function (event) {
			selected_act["actorSex"] = actSex.value;
		};

		actName.value = data[i].actorName;
		actBio.value = data[i].actorBio;
		actSex.value = data[i].actorSex;
		actDob.value = data[i].actorDob;
		actName.style.color = "#000000";
		actBio.style.color = "#000000";
		actDob.style.color = "#000000";
		actSex.style.color = "#000000";

		actRemove.onclick = function (eve) {
			var list = eve.srcElement.parentNode.parentNode.parentNode;
			list.parentNode.removeChild(list);

			for (var i = 0; i < selected_actors.length; i++) {
				if (selected_actors[i] === selected_act) {
					selected_actors.splice(i, 1);
				}
			}
			let index = selected_ids.indexOf(actorId);
			selected_ids.splice(index, 1);
			// selected_ids.indexOf(actorId)
			// console.log(eve.srcElement.parentNode);
			//   console.log(selected_actors);
			//   console.log(movie);
			//   console.log(selected_ids);
		};

		actName_Cancel.classList.add("d-flex");
		actName_Cancel.classList.add("justify-content-between");
		actRemove.classList.add("material-icons");
		actRemove.style.cursor = "pointer";
		//   divMain.setAttribute("cursor", " pointer");
		//   actRemove.classList.add("flex-shrink-0");

		actRemove.style.fontSize = "20px";

		divMain.classList.add("card");
		divMain.classList.add("text-white");
		divMain.classList.add("text-white");
		divMain.classList.add("bg-dark");
		divMain.classList.add("m-3");
		divMain.classList.add("d-inline-block");
		divMain.setAttribute("style", "max-width: 20rem;");

		div.classList.add("card-body");

		actName.classList.add("card-title");
		actBio.classList.add("card-text");
		// actDob_Sex.classList.add("justify-content-between");
		// actDob_Sex.classList.add("d-flex");
		actDob.classList.add("card-text");
		actSex.classList.add("card-text");

		actRemove.innerText = "cancel";
		actName.innerText = actorName;
		actBio.innerText = actorBio;
		actDob.innerText = actorDob;
		actSex.innerText = actorSex;
		actName_Cancel.append(actName);
		actName_Cancel.appendChild(actRemove);
		div.appendChild(actName_Cancel);
		div.appendChild(actBio);
		div.appendChild(actDob);
		div.appendChild(actSex);
		// div.appendChild(actDob_Sex);
		divMain.appendChild(div);
		actorDetails.appendChild(divMain);
	}

	let page = document.getElementById("page");
	page.removeAttribute("HIDDEN");

	let spinner = document.getElementById("spinner");
	spinner.setAttribute("HIDDEN", true);
}
function insertNewActor(data) {
	for (i = 0; i < data.length; i++) {
		let actor = document.createElement("li");
		let actorId = data[i].actorId;
		let actorName = data[i].actorName;
		let actorSex = data[i].actorSex;
		let actorDob = data[i].actorDob;
		let actorBio = data[i].actorBio;

		actor.innerText = data[i].actorName;
		actor.classList.add("list-group-item");
		actors.appendChild(actor);
		actor.onclick = function (event) {
			if (selected_ids.indexOf(actorId) == -1) {
				let actorDetails = document.getElementById("selected-actors");

				selected_act = {};
				selected_act["actorName"] = actorName;
				selected_act["actorId"] = actorId;
				selected_act["actorSex"] = actorSex;
				selected_act["actorDob"] = actorDob;
				selected_act["actorBio"] = actorBio;

				selected_ids.push(actorId);
				selected_actors.push(selected_act);
				// producerDetails.removeAttribute("HIDDEN");
				// producerDetails.innerHTML = "";

				let divMain = document.createElement("div");
				let div = document.createElement("div");
				let actName_Cancel = document.createElement("div");
				let actName = document.createElement("h4");
				let actBio = document.createElement("p");
				let actDob_Sex = document.createElement("div");
				let actDob = document.createElement("div");
				let actSex = document.createElement("div");
				let actRemove = document.createElement("i");

				actRemove.onclick = function (eve) {
					var list = eve.srcElement.parentNode.parentNode.parentNode;
					list.parentNode.removeChild(list);

					for (var i = 0; i < selected_actors.length; i++) {
						if (selected_actors[i] === selected_act) {
							selected_actors.splice(i, 1);
						}
					}
					let index = selected_ids.indexOf(actorId);
					selected_ids.splice(index, 1);
					// selected_ids.indexOf(actorId)
					// console.log(eve.srcElement.parentNode);
					//   console.log(selected_actors);
					//   console.log(movie);
					//   console.log(selected_ids);
				};

				actName_Cancel.classList.add("d-flex");
				actName_Cancel.classList.add("justify-content-between");
				actRemove.classList.add("material-icons");
				actRemove.style.cursor = "pointer";
				//   divMain.setAttribute("cursor", " pointer");
				//   actRemove.classList.add("flex-shrink-0");

				actRemove.style.fontSize = "20px";

				divMain.classList.add("card");
				divMain.classList.add("text-white");
				divMain.classList.add("text-white");
				divMain.classList.add("bg-dark");
				divMain.classList.add("m-3");
				divMain.classList.add("d-inline-block");
				divMain.setAttribute("style", "max-width: 20rem;");

				div.classList.add("card-body");

				actName.classList.add("card-title");
				actBio.classList.add("card-text");
				actDob_Sex.classList.add("justify-content-between");
				actDob_Sex.classList.add("d-flex");
				actDob.classList.add("card-text");
				actSex.classList.add("card-text");

				actRemove.innerText = "cancel";
				actName.innerText = actorName;
				actBio.innerText = actorBio;
				actDob.innerText = actorDob;
				actSex.innerText = actorSex;
				actName_Cancel.append(actName);
				actName_Cancel.appendChild(actRemove);
				div.appendChild(actName_Cancel);
				div.appendChild(actBio);
				actDob_Sex.appendChild(actDob);
				actDob_Sex.appendChild(actSex);
				div.appendChild(actDob_Sex);
				divMain.appendChild(div);
				actorDetails.appendChild(divMain);
			}
		};
	}
}

function update_movie() {
	console.log("inside update");

	// let page = document.getElementById("spinner");
	// page.removeAttribute("HIDDEN");

	// let spinner = document.getElementById("page");
	// spinner.setAttribute("HIDDEN", true);

	movie["movieName"] = document.getElementById("movie-name").value;
	movie["movieYor"] = document.getElementById("movie-yor").value;
	movie["moviePlot"] = document.getElementById("movie-description").value;

	let actor_names = document.getElementsByClassName("new_actor_name");
	let actor_bio = document.getElementsByClassName("new_actor_bio");
	let actor_dob = document.getElementsByClassName("new_actor_dob");
	let actor_sex = document.getElementsByClassName("new_actor_sex");

	for (let i = 0; i < actor_names.length; i++) {
		selected_act = {};
		selected_act["actorName"] = actor_names[i].value;
		selected_act["actorSex"] = actor_sex[i].value;
		selected_act["actorDob"] = actor_dob[i].value;
		selected_act["actorBio"] = actor_bio[i].value;

		selected_actors.push(selected_act);
	}

	movie["producerName"] = document.getElementById("producer-name").value;
	movie["producerSex"] = document.getElementById("producer-sex").value;
	movie["producerDob"] = document.getElementById("producer-dob").value;
	movie["producerBio"] = document.getElementById("producer-bio").value;

	console.log(movie);

	//   alert("hi");
	// https://still-atoll-31705.herokuapp.com/
	const url = "https://still-atoll-31705.herokuapp.com/movie/update/";
	//   console.log(JSON.stringify(movie));
	$.ajax({
		url: url,
		type: "POST",
		data: JSON.stringify(movie),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function () {
			console.log("in success");

			// let page = document.getElementById("page");
			// page.removeAttribute("HIDDEN");

			// let spinner = document.getElementById("spinner");
			// spinner.setAttribute("HIDDEN", true);

			// window.location.replace = "index.html";
		},
		error: function () {
			console.log("failed");
			// window.location.replace = "index.html";
		}
	});
	// window.location.replace = "index.html";
	console.log("end");

}
