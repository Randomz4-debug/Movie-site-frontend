const input = document.getElementById("query");
const moviecards = document.querySelector(".movie-cards");

// FIX 1: make function async
async function loadMovies(movieName = "popular", Videotype = "shows") {
    const response = await fetch(`https://api.shadowstream.space/movies?name=${movieName}&type=${Videotype}`);

    const moviesData = await response.json();

    moviecards.innerHTML = "";

    moviesData.forEach((movie) => {
        if (!movie.show) return; // safety check

        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = movie.show.name;

        const image = document.createElement("img");
        image.src = movie.show.image
            ? movie.show.image.medium
            : "https://placehold.co/150x220?text=No+Image";

        card.appendChild(title);
        card.appendChild(image);
        moviecards.appendChild(card);
    });
}

// FIX 2: correct load event + proper call
window.addEventListener("DOMContentLoaded", () => {
    loadMovies();
});

// FIX 3: search input
input.addEventListener("input", async (e) => {
    const movieName = e.target.value.trim();

    if (!movieName) {
        await loadMovies("Popular"); // show default again
        return;
    }

    await loadMovies(movieName);
});

movieType.addEventListener("change", async () => {

    const value = input.value.trim();

    await loadMovies(value || "popular");

});