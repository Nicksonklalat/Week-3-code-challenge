const BASE_URL = "http://localhost:3001";

// Function to fetch and display details of a single movie by id
const displayMovieDetails = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/films/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const movie = await res.json();

    const movieItem = document.querySelector(".movie-item");

    // Clear previous movie details
    movieItem.innerHTML = "";

    // Poster
    const img = document.createElement("img");
    img.src = movie.poster;
    img.classList.add("poster");
    movieItem.appendChild(img);

    // Metadata
    const metadata = document.createElement("div");
    metadata.classList.add("metadata");

    // Title
    const h2 = document.createElement("h2");
    h2.innerText = movie.title;
    metadata.appendChild(h2);

    // Runtime
    const h4Runtime = document.createElement("h4");
    h4Runtime.innerText = `${movie.runtime} minutes`;
    metadata.appendChild(h4Runtime);

    // Showtime
    const pShowtime = document.createElement("p");
    pShowtime.innerText = `Showtime: ${movie.showtime}`;
    metadata.appendChild(pShowtime);

    // Available tickets calculation
    const availableTickets = movie.capacity - movie.tickets_sold;
    const h3Tickets = document.createElement("h3");
    h3Tickets.innerText = `Available tickets: ${availableTickets}`;
    metadata.appendChild(h3Tickets);

    // Buy Ticket button
    const buyTicket = document.createElement("button");
    buyTicket.innerText = availableTickets > 0 ? "Buy Ticket" : "Sold Out";
    buyTicket.classList.add("buy-ticket");
    buyTicket.addEventListener("click", async () => {
      if (availableTickets <= 0) {
        alert("Tickets are sold out!");
        return;
      }

      // Update tickets_sold locally
      movie.tickets_sold++;
      h3Tickets.innerText = `Available tickets: ${movie.capacity - movie.tickets_sold}`;
      buyTicket.innerText = movie.tickets_sold < movie.capacity ? "Buy Ticket" : "Sold Out";

    });
    metadata.appendChild(buyTicket);

    // Description 
    const pDescription = document.createElement("p");
    pDescription.innerText = movie.description;
    metadata.appendChild(pDescription);

    // Append metadata to movieItem container
    movieItem.appendChild(metadata);
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};

// Function to fetch all movies and populate the film menu
const populateFilmMenu = async () => {
  try {
    const res = await fetch(`${BASE_URL}/films`);
    if (!res.ok) {
      throw new Error("Failed to fetch movie list");
    }
    const movies = await res.json();

    const filmsList = document.getElementById("films");
    filmsList.innerHTML = ""; // Clear existing list items

    movies.forEach((movie) => {
      const li = document.createElement("li");
      li.classList.add("film", "item");
      li.innerText = movie.title;
      li.addEventListener("click", () => {
        displayMovieDetails(movie.id);
      });
      filmsList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching movie list:", error);
  }
};

// Initial setup when the page loads
window.onload = () => {
  displayMovieDetails(1); 
  populateFilmMenu(); 
};
