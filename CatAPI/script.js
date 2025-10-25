const inputValue = document.getElementById('cat-name');
const image = document.getElementById('cat-image');
const cat_name_display = document.getElementById('cat-name-search');
const cat_weight_display = document.getElementById('cat-weight-search');
const cat_origin_display = document.getElementById('cat-origin-search');
const description = document.getElementById('description');
const descHeading = document.getElementById('desc-heading');
const labelName = document.getElementById('label-cat-name');
const subHeading = document.querySelector('.sub-heading');
const table = document.getElementById('cat-details-table');
const likeBtn = document.querySelector('.btn-like');
const disLikeBtn = document.querySelector('.btn-dislike');
const noOfLike = document.querySelector('.nu-like');
const noOfDislike = document.querySelector('.nu-dislike');
const likeDislikeSection = document.querySelector('.like-dislike');

let currentCatId = null;
let currentCatLiked = false;
let currentCatDisliked = false;

let catStats = {};

const getCatStatsFromLocalStorage = () => {
    const storedStats = localStorage.getItem('catCompetitionStats');
    return storedStats ? JSON.parse(storedStats) : {};
};

const saveCatStatsToLocalStorage = () => {
    localStorage.setItem('catCompetitionStats', JSON.stringify(catStats));
};

const updateLikeDislikeUI = () => {
    const stats = catStats[currentCatId] || { likes: 0, dislikes: 0, likedByMe: false, dislikedByMe: false };

    noOfLike.textContent = stats.likes;
    noOfDislike.textContent = stats.dislikes;

    if (stats.likedByMe) {
        likeBtn.classList.add('active');
    } else {
        likeBtn.classList.remove('active');
    }

    if (stats.dislikedByMe) {
        disLikeBtn.classList.add('active');
    } else {
        disLikeBtn.classList.remove('active');
    }
};

const initUI = () => {
    image.style.display = 'none';
    table.style.display = 'none';
    descHeading.style.display = 'none';
    subHeading.style.display = 'none';
    description.innerText = '';
    cat_name_display.innerText = '';
    cat_weight_display.innerText = '';
    cat_origin_display.innerText = '';
    likeDislikeSection.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    catStats = getCatStatsFromLocalStorage();
});


likeBtn.addEventListener('click', () => {
    if (!currentCatId) return;

    const stats = catStats[currentCatId] || { likes: 0, dislikes: 0, likedByMe: false, dislikedByMe: false };

    if (!stats.likedByMe) {
        stats.likes++;
        stats.likedByMe = true;

        if (stats.dislikedByMe) {
            stats.dislikes--;
            stats.dislikedByMe = false;
        }
    } else {
        stats.likes--;
        stats.likedByMe = false;
    }

    catStats[currentCatId] = stats;
    updateLikeDislikeUI();
    saveCatStatsToLocalStorage();
});

disLikeBtn.addEventListener('click', () => {
    if (!currentCatId) return;

    const stats = catStats[currentCatId] || { likes: 0, dislikes: 0, likedByMe: false, dislikedByMe: false };

    if (!stats.dislikedByMe) {
        stats.dislikes++;
        stats.dislikedByMe = true;

        if (stats.likedByMe) {
            stats.likes--;
            stats.likedByMe = false;
        }
    } else {
        stats.dislikes--;
        stats.dislikedByMe = false;
    }

    catStats[currentCatId] = stats;
    updateLikeDislikeUI();
    saveCatStatsToLocalStorage();
});


async function getCat(e) {
    e.preventDefault();
    const inputText = inputValue.value.trim();

    try {
        labelName.innerText = 'Loading...';
        labelName.style.color = 'yellow';

        image.style.display = 'none';
        table.style.display = 'none';
        descHeading.style.display = 'none';
        subHeading.style.display = 'none';
        likeDislikeSection.style.display = 'none';
        description.innerText = '';
        cat_name_display.innerText = '';
        cat_weight_display.innerText = '';
        cat_origin_display.innerText = '';

        const headers = {
            "Content-Type": "application/json",
            "x-api-key": "Your_Api_Key_From_thecatapi.com"
        };

        const res = await fetch("https://api.thecatapi.com/v1/breeds", {
            method: 'GET',
            headers: headers
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        let foundCat = null;

        if (inputText) {
            foundCat = data.find(cat => cat.name.toLowerCase() === inputText.toLowerCase());
        } else {
            foundCat = data[Math.floor(Math.random() * data.length)];
        }

        if (foundCat) {
            currentCatId = foundCat.id;

            image.src = foundCat.image?.url || '';
            image.alt = foundCat.name ? `${foundCat.name} cat` : 'Cat Image';
            image.style.display = foundCat.image?.url ? 'block' : 'none';

            cat_name_display.innerText = foundCat.name || 'N/A';
            cat_origin_display.innerText = foundCat.origin || 'N/A';
            cat_weight_display.innerText = foundCat.weight?.metric ? `${foundCat.weight.metric} kg` : 'N/A';

            description.innerText = foundCat.description || 'No description available.';

            table.style.display = 'table';
            subHeading.style.display = 'block';
            descHeading.innerText = 'Description';
            descHeading.style.color = '#fff';
            descHeading.style.display = 'block';
            likeDislikeSection.style.display = 'grid';

            if (!catStats[currentCatId]) {
                catStats[currentCatId] = { likes: 0, dislikes: 0, likedByMe: false, dislikedByMe: false };
            }
            updateLikeDislikeUI();

        } else {
            descHeading.innerText = "Sorry! This name doesn't exist.";
            descHeading.style.color = 'red';
            descHeading.style.display = 'block';
            image.style.display = 'none';
            table.style.display = 'none';
            subHeading.style.display = 'none';
            likeDislikeSection.style.display = 'none';
            description.innerText = '';
            currentCatId = null;
        }

    } catch (error) {
        console.error('Error fetching cat data:', error);
        labelName.innerText = 'Failed to fetch data';
        labelName.style.color = 'red';
        image.style.display = 'none';
        table.style.display = 'none';
        descHeading.style.display = 'block';
        descHeading.innerText = 'Error loading cat data.';
        descHeading.style.color = 'red';
        subHeading.style.display = 'none';
        likeDislikeSection.style.display = 'none';
        description.innerText = '';
        currentCatId = null;
    } finally {
        labelName.innerText = 'Enter Cat Name';
        labelName.style.color = '#fff';
    }
    inputValue.value = '';
}

inputValue.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getCat(event);
        inputValue.blur();
        inputValue.value = '';
    }
});
