let index = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const dotsContainer = document.querySelector('.dots');
let autoSlide = true;
let interval;

// Create dots dynamically
slides.forEach((_, i) => {
    let dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        index = i;
        showSlide(index);
    });
    dotsContainer.appendChild(dot);
});

function showSlide(i) {
    if (i >= slides.length) index = 0;
    if (i < 0) index = slides.length - 1;
    
    slider.style.transform = `translateX(-${index * 100}%)`;
    
    updateDots();
}

function nextSlide() {
    index++;
    showSlide(index);
}

function prevSlide() {
    index--;
    showSlide(index);
}

function updateDots() {
    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
    document.querySelectorAll('.dot')[index].classList.add('active');
}

// Auto Slide
function startAutoSlide() {
    interval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

// Play/Pause Toggle
function toggleAutoSlide() {
    autoSlide = !autoSlide;
    if (autoSlide) {
        startAutoSlide();
        document.getElementById("playPause").innerText = "⏸";
    } else {
        stopAutoSlide();
        document.getElementById("playPause").innerText = "▶";
    }
}

// Start auto-slide on load
startAutoSlide();
