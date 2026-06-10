const styleLinks = document.querySelectorAll('.alternate-style');
const bodySkin = document.querySelectorAll('.body-skin');

function setActiveStyle(color) {
    localStorage.setItem('selectedStyle', color);
    styleLinks.forEach(link => { link.disabled = link.getAttribute('title') !== color; });
}

function setBodySkin(skin) {
    localStorage.setItem('selectedSkin', skin);
    document.body.className = skin === 'dark' ? 'dark' : '';
    bodySkin.forEach(radio => { radio.checked = radio.value === skin; });
}

document.querySelector('.toggle-style-switcher').addEventListener('click', () => {
    document.querySelector('.style-switcher').classList.toggle('open');
});

document.querySelectorAll('.skin-color-btn').forEach(btn => {
    btn.addEventListener('click', () => setActiveStyle(btn.getAttribute('data-color')));
});

bodySkin.forEach(radio => {
    radio.addEventListener('change', () => setBodySkin(radio.value));
});

document.addEventListener('DOMContentLoaded', () => {
    const savedStyle = localStorage.getItem('selectedStyle') || 'blue';
    setActiveStyle(savedStyle);
    const savedSkin = localStorage.getItem('selectedSkin') || 'light';
    setBodySkin(savedSkin);
});