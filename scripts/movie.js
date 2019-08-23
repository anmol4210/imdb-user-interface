movie = {};
selected_actors = [];
movie["actors"] = selected_actors;

base_url = "https://still-atoll-31705.herokuapp.com/"; //"http://localhost:8080/" ;

async function fetchAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

selected_ids = [];

var producers = document.getElementById("producers");
var actors = document.getElementById("actors");

function add_new_producer() {
  let producerDetails = document.getElementById("producer-details");
  producerDetails.removeAttribute("HIDDEN");
  producerDetails.innerHTML = "";

  let div = document.createElement("div");
  let prodName = document.createElement("input");
  let prodBio = document.createElement("input");
  let prodDob = document.createElement("input");
  let prodSex = document.createElement("input");

  prodName.style.color = "#000000";
  prodBio.style.color = "#000000";
  prodDob.style.color = "#000000";
  prodSex.style.color = "#000000";
  //   div.classList.add("card-body");
  prodName.required = true;
  prodDob.required = true;
  prodName.classList.add("m-3");
  prodBio.classList.add("m-3");
  prodDob.classList.add("m-3");
  prodSex.classList.add("m-3");

  prodName.classList.add("new_producer_name");
  prodBio.classList.add("new_producer_bio");
  prodDob.classList.add("new_producer_dob");
  prodSex.classList.add("new_producer_sex");

  prodBio.placeholder = "Producer Bio";
  prodName.placeholder = "Producer Name";
  prodDob.placeholder = "Produce DOB";
  prodSex.placeholder = "Producer Sex";

  div.appendChild(prodName);
  div.appendChild(prodBio);
  div.appendChild(prodDob);
  div.appendChild(prodSex);

  producerDetails.appendChild(div);
}
add_new_producer();
fetchAsync(base_url + "producer/all/").then(function(data) {
  let new_producer = document.createElement("li");
  new_producer.innerText = "Add New Producer";
  new_producer.classList.add("list-group-item");
  new_producer.classList.add("font-weight-bold");

  new_producer.onclick = function(event) {
    add_new_producer();
  };

  producers.appendChild(new_producer);

  for (i = 0; i < data.length; i++) {
    let producer = document.createElement("li");
    let producerId = data[i].producerId;
    let producerName = data[i].producerName;
    let producerSex = data[i].producerSex;
    let producerDob = data[i].producerDob;
    let producerBio = data[i].producerBio;

    producer.innerText = data[i].producerName;
    producer.classList.add("list-group-item");

    producer.onclick = function(event) {
      let producerDetails = document.getElementById("producer-details");
      producerDetails.removeAttribute("HIDDEN");
      producerDetails.innerHTML = "";

      movie["producerName"] = producerName;
      movie["producerSex"] = producerSex;
      movie["producerDob"] = producerDob;
      movie["producerBio"] = producerBio;
      movie["producerId"] = producerId;

      let div = document.createElement("div");
      let prodName = document.createElement("h4");
      let prodBio = document.createElement("p");
      let prodDob_Sex = document.createElement("div");
      let prodDob = document.createElement("div");
      let prodSex = document.createElement("div");

      div.classList.add("card-body");
      prodName.classList.add("card-title");
      prodBio.classList.add("card-text");
      prodDob_Sex.classList.add("justify-content-between");
      prodDob_Sex.classList.add("d-flex");
      prodDob.classList.add("card-text");
      prodSex.classList.add("card-text");

      prodName.innerText = producerName;
      prodBio.innerText = producerBio;
      prodDob.innerText = producerDob;
      prodSex.innerText = producerSex;

      div.appendChild(prodName);
      div.appendChild(prodBio);
      prodDob_Sex.appendChild(prodDob);
      prodDob_Sex.appendChild(prodSex);
      div.appendChild(prodDob_Sex);
      producerDetails.appendChild(div);

      console.log(producerId);
    };

    producers.appendChild(producer);
  }
});

/////////////Actor Details///////////////////

fetchAsync(base_url + "actor/all/").then(function(data) {
  let new_actor = document.createElement("li");
  new_actor.innerText = "Add New Actor";
  new_actor.classList.add("list-group-item");
  new_actor.classList.add("font-weight-bold");
  actors.appendChild(new_actor);

  new_actor.onclick = function(event) {
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

    actorRemove.onclick = function(eve) {
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
    actorDob.required = true;
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
    actor.onclick = function(event) {
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

        actRemove.onclick = function(eve) {
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
          console.log(selected_actors);
          console.log(movie);
          console.log(selected_ids);
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

  let page = document.getElementById("page");
  page.removeAttribute("HIDDEN");

  let spinner = document.getElementById("spinner");
  spinner.setAttribute("HIDDEN", true);
});

function add_movie() {
  let page = document.getElementById("spinner");
  page.removeAttribute("HIDDEN");

  let spinner = document.getElementById("page");
  spinner.setAttribute("HIDDEN", true);

  movie["movieName"] = "" + document.getElementById("movie-name").value;
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

  if (movie["producerId"] == undefined) {
    let producer_names = document.getElementsByClassName("new_producer_name");
    let producer_bio = document.getElementsByClassName("new_producer_bio");
    let producer_dob = document.getElementsByClassName("new_producer_dob");
    let producer_sex = document.getElementsByClassName("new_producer_sex");
    for (let i = 0; i < producer_names.length; i++) {
      movie["producerName"] = producer_names[i].value;
      movie["producerSex"] = producer_sex[i].value;
      movie["producerDob"] = producer_dob[i].value;
      movie["producerBio"] = producer_bio[i].value;
      movie["producerId"] = 0;
    }
  }
  // https://still-atoll-31705.herokuapp.com/
  const url = "https://still-atoll-31705.herokuapp.com/movie/add/";
  console.log(JSON.stringify(movie));
  $.ajax({
    url: url,
    type: "POST",
    data: JSON.stringify(movie),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function() {
      let page = document.getElementById("page");
      page.removeAttribute("HIDDEN");

      let spinner = document.getElementById("spinner");
      spinner.setAttribute("HIDDEN", true);

      window.location.href = "/index.html";
    }
  });
}
