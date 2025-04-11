const links = document.querySelectorAll('.alternate-style'),
    totalLinks = links.length;

function setActiveStyle(color) {
    localStorage.setItem('selectedStyle', color);
    for (let i = 0; i < totalLinks; i++) {
        links[i].disabled = color !== links[i].getAttribute('title');
    }
}

// Body skin handling
const bodySkin = document.querySelectorAll('.body-skin');

function setBodySkin(skin) {
    localStorage.setItem('selectedSkin', skin);
    document.body.className = skin === 'dark' ? 'dark' : '';
    bodySkin.forEach(radio => radio.checked = radio.value === skin);
}

// Event listeners
document.querySelector('.toggle-style-switcher').addEventListener('click', () => {
    document.querySelector('.style-switcher').classList.toggle('open');
});

bodySkin.forEach(radio => {
    radio.addEventListener('change', () => setBodySkin(radio.value));
});

// Initialize with defaults
document.addEventListener('DOMContentLoaded', () => {
    // Set default style
    const savedStyle = localStorage.getItem('selectedStyle') || 'pink';
    setActiveStyle(savedStyle);

    // Set default dark skin
    const savedSkin = localStorage.getItem('selectedSkin') || 'dark';
    setBodySkin(savedSkin);
    
    // Update radio buttons
    bodySkin.forEach(radio => {
        radio.checked = radio.value === savedSkin;
    });
});