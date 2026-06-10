// Preloader
window.addEventListener('load', function () {
    document.querySelector('.preloader').classList.add('opacity-0');
    setTimeout(function () {
        document.querySelector('.preloader').style.display = 'none';
    }, 1000);
});

// Photo lightbox
(function () {
    const lb = document.createElement('div');
    lb.id = 'photo-lightbox';
    lb.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img class="lightbox-img" src="" alt="">';
    document.body.appendChild(lb);

    const img = lb.querySelector('.lightbox-img');

    function open(src, alt) {
        img.src = src;
        img.alt = alt || '';
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lb.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.addEventListener('click', function (e) {
        const photo = e.target.closest('.timeline-photo, .cert-photo, .ach-photo');
        if (photo) { open(photo.src, photo.alt); return; }
        if (e.target === lb || e.target.closest('.lightbox-close')) { close(); }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
    });
})();
