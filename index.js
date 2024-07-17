const movieContainer = document.querySelector(".movie-container"); // Selecting the movie container element
const urlEndpoint = "http://localhost:8900/films"; // Endpoint for fetching movie data

// Function to fetch movie data from API
async function fetchMovies() {
    try {
        let response = await fetch(urlEndpoint); // Fetch data from API
        let data = await response.json(); // Parse response as JSON
        displayMovies(data); // Display movies on the webpage
    } catch (error) {
        console.error('Error fetching movies:', error);
        alert('Failed to fetch movies. Please try again later.');
    }
}

// Function to display movies in the DOM
function displayMovies(movies) {
    movieContainer.innerHTML = movies.map(movie => `
        <div class="movie-item">
            <img src="${movie.poster}" alt="">
            <h1>${movie.title}</h1>
            <p>${movie.description}</p>
            <ul>
                <li>Showtime: ${movie.showtime}</li>
                <li>Runtime: ${movie.runtime}</li>
                <li>Capacity: ${movie.capacity}</li>
                <li>Tickets Sold: ${movie.tickets_sold}</li>
            </ul>
            <button onclick="purchaseTicket(${movie.id}, ${movie.tickets_sold})">Purchase Ticket</button>
        </div>
    `).join('');
}

// Function to purchase a ticket (PATCH request to update tickets_sold)
async function purchaseTicket(id, ticketsSold) {
    try {
        let ticketsNew = { tickets_sold: ticketsSold + 1 }; // Increment tickets_sold by 1
        let response = await fetch(`${urlEndpoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketsNew) // Convert object to JSON string
        });
        let data = await response.json(); // Parse response as JSON
        console.log('Ticket purchased successfully:', data); // Log success message
        // Optionally update the UI or fetch updated data
        fetchMovies(); // Refresh movie list after ticket purchase
    } catch (error) {
        console.error('Error purchasing ticket:', error);
        alert('Failed to purchase ticket. Please try again later.');
    }
}

// Fetch movies when the page loads
fetchMovies();
