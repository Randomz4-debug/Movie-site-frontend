const input = document.getElementById("query");
const moviecards = document.querySelector(".movie-cards");
const movieTypeDropdown = document.getElementById("movieType");

let movieName = "popular";
let movieType = "shows";

async function loadMovies(name = movieName, type = movieType) {

    moviecards.innerHTML = "<h2>Loading...</h2>";

    try {

        const response = await fetch(
            `https://api.shadowstream.space/movies?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`
        );

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const moviesData = await response.json();

        moviecards.innerHTML = "";

        if (!Array.isArray(moviesData) || moviesData.length === 0) {
            moviecards.innerHTML = "<h2>No results found.</h2>";
            return;
        }

        moviesData.forEach((item) => {

            const data = item.show || item.person;

            if (!data) return;

            const card = document.createElement("div");
            card.className = "card";

            const image = document.createElement("img");
            image.src =
                data.image?.medium ??
                "https://placehold.co/210x295?text=No+Image";

            image.alt = data.name;

            const title = document.createElement("h2");
            title.textContent = data.name;

            card.appendChild(image);
            card.appendChild(title);

            moviecards.appendChild(card);

        });

    } catch (err) {

        console.error(err);

        moviecards.innerHTML = `
            <h2 style="color:red;text-align:center">
                Failed to load data.<br>
                ${err.message}
            </h2>
        `;

    }

}

window.addEventListener("DOMContentLoaded", () => {
    loadMovies();
});

input.addEventListener("input", () => {

    movieName = input.value.trim();

    if (movieName === "") {
        movieName = "popular";
    }

    loadMovies(movieName, movieType);

});

movieTypeDropdown.addEventListener("change", () => {

    movieType = movieTypeDropdown.value;

    loadMovies(movieName, movieType);

});