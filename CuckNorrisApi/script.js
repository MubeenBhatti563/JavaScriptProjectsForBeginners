const loadJoke = async () => {
    try {
        const chuckNorrisFetch = await fetch('https://api.chucknorris.io/jokes/random', {
            headers: {
                'Accept': 'application/json'
            }
        });

        // Good practice: check for HTTP errors
        if (!chuckNorrisFetch.ok) {
            throw new Error(`HTTP error! Status: ${chuckNorrisFetch.status}`);
        }

        const jokeData = await chuckNorrisFetch.json();
        document.getElementById('loadingJoke').innerHTML = jokeData.value;
    } catch (error) {
        console.error("Error loading joke:", error); // Use console.error for errors
        document.getElementById('loadingJoke').innerHTML = "Failed to load joke. Please try again.";
    }
}

document.getElementById('loadJokeBtn').addEventListener('click', loadJoke);