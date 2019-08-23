base_url = "https://still-atoll-31705.herokuapp.com/";

async function fetchAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

var cookiename = "movieId";

var add = document.getElementById("add");

add.onclick = function(event) {
  localStorage.removeItem("movieId");
  window.location.href = "./movie.html";
};

var movies = document.getElementById("movies");
fetchAsync(base_url + "movie/all/").then(function(data) {
  for (i = 0; i < data.length; i++) {
    let row = document.createElement("tr");
    let column_number = document.createElement("th");
    let movie_name = document.createElement("td");
    let movie_yor = document.createElement("td");
    let producer = document.createElement("td");
    let actors = document.createElement("td");
    let edit_button = document.createElement("td");

    let button = document.createElement("button");

    button.classList.add("btn");
    button.classList.add("btn-secondary");
    button.innerText = "EDIT";
    edit_button.appendChild(button);
    let movieId = data[i].movieId;
    edit_button.onclick = function(event) {
      localStorage.setItem("movieId", movieId);
      window.location.href = "./edit_movie.html";
    };

    actors_list = data[i].actors;

    actor_names = "";
    for (actor_index = 0; actor_index < actors_list.length; actor_index++) {
      actor_names = actor_names + actors_list[actor_index].actorName + ", ";
    }
    column_number.innerText = i + 1;
    movie_name.innerText = data[i].movieName;
    movie_yor.innerText = data[i].movieYor;
    producer.innerText = data[i].producerName;
    actors.innerText = actor_names.substring(0, actor_names.length - 2);

    row.appendChild(column_number);
    row.appendChild(movie_name);
    row.appendChild(movie_yor);
    row.appendChild(producer);
    row.appendChild(actors);
    row.appendChild(edit_button);

    movies.appendChild(row);
  }

  let page = document.getElementById("page");
  page.removeAttribute("HIDDEN");

  let spinner = document.getElementById("spinner");
  spinner.setAttribute("HIDDEN", true);
});
