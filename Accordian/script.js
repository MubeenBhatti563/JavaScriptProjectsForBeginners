// Variables

const accordian = document.getElementsByClassName('content-container');

for (let i = 0; i < accordian.length; i++) {
    accordian[i].addEventListener('click', function () {
        // Close all other items first
        for (let j = 0; j < accordian.length; j++) {
            if (accordian[j] !== this) {
                accordian[j].classList.remove('active');
            }
        }
        // Toggle item
        this.classList.toggle('active');
    });
}