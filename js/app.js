import { blogs } from './portfolio.js';

const routes = {
  sidebar: 'partials/sidebar.html',
  home: 'partials/main.html',
  about: 'partials/about.html',
  certification: 'partials/certification.html',
  certifications: 'partials/certification.html',
  services: 'partials/service.html',
  portfolio: 'partials/portfolio.html',
  blog: 'partials/blog.html',
  contact: 'partials/contact.html'
};

let navLinks, navToggler, aside, mainContent;

// --- Lightbox ---

const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxText = lightbox.querySelector('.caption-text');
const lightboxCounter = lightbox.querySelector('.caption-counter');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const prevBtn = lightbox.querySelector('.prev-item');
const nextBtn = lightbox.querySelector('.next-item');
let portfolioItems = [];
let itemIndex = 0;

function openLightbox(index) {
  itemIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
  lightbox.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
}

function updateLightbox() {
  const item = portfolioItems[itemIndex];
  lightboxImg.src = item.querySelector('.portfolio-img img').getAttribute('src');
  lightboxImg.alt = item.querySelector('h4').textContent;
  lightboxText.textContent = item.querySelector('h4').textContent;
  lightboxCounter.textContent = `${itemIndex + 1} of ${portfolioItems.length}`;
}

function prevItem() {
  itemIndex = itemIndex === 0 ? portfolioItems.length - 1 : itemIndex - 1;
  updateLightbox();
}

function nextItem() {
  itemIndex = itemIndex === portfolioItems.length - 1 ? 0 : itemIndex + 1;
  updateLightbox();
}

lightboxClose.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', prevItem);
nextBtn.addEventListener('click', nextItem);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevItem();
  if (e.key === 'ArrowRight') nextItem();
});

// --- App bootstrap ---

async function initializeApp() {
  await loadSidebar();
  setupEventListeners();
  const initialSection = window.location.hash.substring(1) || 'home';
  await loadSection(initialSection);
}

async function loadSidebar() {
  try {
    const response = await fetch(routes.sidebar);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const rootContainer = document.getElementById('root-container');
    rootContainer.innerHTML = html;

    const copyright = rootContainer.querySelector('.copyright-text');
    if (copyright) {
      copyright.innerHTML = `&copy; ${new Date().getFullYear()} Shahriar Rahman`;
    }

    navLinks = document.querySelectorAll('.nav a');
    navToggler = document.querySelector('.nav-toggler');
    aside = document.querySelector('.aside');
    mainContent = document.getElementById('main-content');
  } catch (error) {
    console.error('Error loading sidebar:', error);
  }
}

function setupEventListeners() {
  navToggler.addEventListener('click', () => aside.classList.toggle('open'));

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = link.getAttribute('href').substring(1);
      handleNavigation(section);
    });
  });

  window.addEventListener('popstate', handlePopState);
  window.addEventListener('resize', handleResize);
  document.addEventListener('click', handleDocumentClick);
}

async function loadSection(section) {
  try {
    const [base, slug] = section.split('/');
    const url = base === 'blog' && slug
      ? `partials/blog-posts/${encodeURIComponent(slug)}.html`
      : routes[section] || routes.home;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    mainContent.innerHTML = html;
    mainContent.scrollTop = 0;
    window.scrollTo(0, 0);

    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav a[href="#${base}"]`);
    if (activeLink) activeLink.classList.add('active');

    if (section === 'portfolio') initPortfolioFilter();
    else if (section === 'blog') initBlogPosts();
    else if (section === 'home') initTyped();
    else if (section === 'contact') initContactForm();

    wireNavButtons();
  } catch (error) {
    console.error('Error loading section:', error);
  }
}

// Wire any [data-nav-section] element in the loaded content to SPA navigation
function wireNavButtons() {
  mainContent.querySelectorAll('[data-nav-section]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      handleNavigation(el.getAttribute('data-nav-section'));
    });
  });
}

// --- Section initialisers ---

function initTyped() {
  const el = document.querySelector('.iTyped');
  if (el && typeof window.ityped !== 'undefined') {
    window.ityped.init(el, {
      strings: ['Software Engineer', 'Backend & Cloud Engineer', 'AWS Certified Engineer'],
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
}

function initPortfolioFilter() {
  const filterContainer = mainContent.querySelector('.portfolio-filter');
  portfolioItems = Array.from(mainContent.querySelectorAll('.portfolio-item'));

  if (!filterContainer || portfolioItems.length === 0) return;

  const filterBtns = filterContainer.querySelectorAll('button');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterContainer.querySelector('.active').classList.remove('active');
      this.classList.add('active');
      const filterValue = this.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        const match = filterValue === 'all' || item.getAttribute('data-category') === filterValue;
        item.classList.toggle('show', match);
        item.classList.toggle('hide', !match);
      });
    });
  });

  portfolioItems.forEach((item, i) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => openLightbox(i));
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initBlogPosts() {
  const blogContainer = document.getElementById('blog-posts');
  if (!blogContainer) return;

  blogContainer.innerHTML = blogs.map(blog => `
    <div class="blog-item padd-15" data-tags="${escapeHtml(blog.tags.map(t => t.toLowerCase()).join(' '))}">
      <div class="blog-item-inner shadow-dark" data-nav-section="blog/${escapeHtml(blog.slug)}" role="link" tabindex="0" aria-label="Read post: ${escapeHtml(blog.title)}">
        <div class="blog-img">
          <img src="${escapeHtml(blog.image)}" alt="${escapeHtml(blog.title)}" loading="lazy">
          <div class="blog-date">${escapeHtml(blog.date)}</div>
        </div>
        <div class="blog-info">
          <h4 class="blog-title"><strong>${escapeHtml(blog.title)}</strong></h4>
          <p class="blog-description">${escapeHtml(blog.description)}</p>
          <p class="blog-tags">Tags: ${blog.tags.map(tag =>
            `<span class="tag">${escapeHtml(tag)}</span>`).join(', ')}</p>
          <span class="blog-read-more">Read More <i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>
        </div>
      </div>
    </div>
  `).join('');

  blogContainer.addEventListener('keydown', e => {
    const card = e.target.closest('[data-nav-section]');
    if (card && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleNavigation(card.getAttribute('data-nav-section'));
    }
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset();
        document.getElementById('form-success').style.display = 'block';
        btn.textContent = 'Sent!';
      } else {
        btn.textContent = 'Error — try again';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Error — try again';
      btn.disabled = false;
    }
  });
}

// --- Navigation helpers ---

function handleNavigation(section) {
  history.pushState({ section }, '', `#${section}`);
  loadSection(section);
  if (window.innerWidth <= 1199) aside.classList.remove('open');
}

function handlePopState(e) {
  const section = e.state?.section || 'home';
  loadSection(section);
}

function handleResize() {
  if (window.innerWidth > 1199) aside.classList.remove('open');
}

function handleDocumentClick(e) {
  if (
    window.innerWidth <= 1199 &&
    !aside.contains(e.target) &&
    !e.target.closest('.nav-toggler')
  ) {
    aside.classList.remove('open');
  }
}

window.addEventListener('DOMContentLoaded', initializeApp);
