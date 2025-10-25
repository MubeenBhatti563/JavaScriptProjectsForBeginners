const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const closeTab = document.querySelector('.close-tab');
const picList = document.querySelector('.pictures-item');
const dark = document.getElementById('dark');
const body = document.body;

hamburger.addEventListener('click', function () {
    navList.classList.add('active');
});

closeTab.addEventListener('click', function () {
    navList.classList.remove('active');
});

dark.addEventListener('click', function () {
    if (dark.innerHTML === '<i class="fa-regular fa-sun"></i>'.trim()) {
        dark.innerHTML = '<i class="fa-regular fa-moon"></i>';
        body.classList.add('dark-mode');
    } else {
        dark.innerHTML = '<i class="fa-regular fa-sun"></i>';
        body.classList.remove('dark-mode');
    }
});

const data = [
    {
        img: "https://www.w3schools.com/w3images/sandwich.jpg",
        heading: "The Perfect Sandwich, A Real NYC Classic",
        paragraph: "Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.",
    },
    {
        img: "https://www.w3schools.com/w3images/steak.jpg",
        heading: "Let Me Tell You About This Steak",
        paragraph: "Once again, some random text to lorem lorem lorem lorem ipsum text praesent tincidunt ipsum lipsum.",
    },
    {
        img: "https://www.w3schools.com/w3images/cherries.jpg",
        heading: "Cherries, interrupted",
        paragraph: "Lorem ipsum text praesent tincidunt ipsum lipsum. What else?",
    },
    {
        img: "https://www.w3schools.com/w3images/wine.jpg",
        heading: "Once Again, Robust Wine and Vegetable Pasta",
        paragraph: "Lorem ipsum text praesent tincidunt ipsum lipsum.",
    },
    {
        img: "https://www.w3schools.com/w3images/popsicle.jpg",
        heading: "All I Need Is a Popsicle",
        paragraph: "Lorem ipsum text praesent tincidunt ipsum lipsum.",
    },
    {
        img: "https://www.w3schools.com/w3images/salmon.jpg",
        heading: "Salmon For Your Skin",
        paragraph: "Once again, some random text to lorem lorem lorem lorem ipsum text praesent tincidunt ipsum lipsum.",
    },
    {
        img: "https://www.w3schools.com/w3images/sandwich.jpg",
        heading: "The Perfect Sandwich, A Real Classic",
        paragraph: "Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.",
    },
    {
        img: "https://www.w3schools.com/w3images/croissant.jpg",
        heading: "Le French",
        paragraph: "Lorem lorem lorem lorem ipsum text praesent tincidunt ipsum lipsum.",
    },
];

data.forEach(e => {
    let li = document.createElement('li');
    li.classList.add('pictures');

    li.innerHTML = `
                <img src="${e.img}" alt="${e.heading}">
                <h3 id="pic-heading">${e.heading}</h3>
                <p class="pic-para">${e.paragraph}</p>`;

    picList.appendChild(li);
});