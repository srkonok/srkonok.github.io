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

// --- SEO: per-route document title, description, canonical ---

const SITE_URL = 'https://srkonok.github.io/';
const SITE_NAME = 'Md Shahriar Rahman';
const DEFAULT_TITLE = document.title;
const DEFAULT_DESCRIPTION = document
  .querySelector('meta[name="description"]')
  .getAttribute('content');

const sectionMeta = {
  about: ['About', 'About Md Shahriar Rahman - Software Engineer in Dhaka, Bangladesh. Skills, education, and experience in backend development, AWS cloud, and DevOps.'],
  certification: ['Certifications', 'Professional certifications of Md Shahriar Rahman, including AWS Certified Cloud Practitioner.'],
  certifications: ['Certifications', 'Professional certifications of Md Shahriar Rahman, including AWS Certified Cloud Practitioner.'],
  services: ['Services', 'Services offered by Md Shahriar Rahman: backend API development, AWS cloud architecture, CI/CD pipelines, and DevOps consulting.'],
  portfolio: ['Portfolio', 'Selected projects by Md Shahriar Rahman - ERP systems, government platforms, backend APIs, and cloud deployments.'],
  blog: ['Blog', 'Articles on backend development, AWS cloud, DevOps, CI/CD, and system design by Md Shahriar Rahman.'],
  contact: ['Contact', 'Get in touch with Md Shahriar Rahman for backend, cloud, and DevOps work.']
};

function updateSEO(base, slug) {
  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESCRIPTION;
  let canonical = SITE_URL;

  if (base === 'blog' && slug) {
    const post = blogs.find(b => b.slug === slug);
    if (post) {
      title = `${post.title} - ${SITE_NAME}`;
      description = post.description;
      canonical = `${SITE_URL}blog/${post.slug}/`;
    }
  } else if (sectionMeta[base]) {
    title = `${sectionMeta[base][0]} - ${DEFAULT_TITLE}`;
    description = sectionMeta[base][1];
    if (base === 'blog') canonical = `${SITE_URL}blog/`;
  }

  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute('content', description);
  document.querySelector('link[rel="canonical"]').setAttribute('href', canonical);
}

let portfolioItems = [];

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

    updateSEO(base, slug);

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

  portfolioItems.forEach(item => {
    const link = item.querySelector('.portfolio-info a');
    if (!link) return;
    item.style.cursor = 'pointer';
    item.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      window.open(link.href, '_blank', 'noopener');
    });
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const POSTS_PER_PAGE = 6;

function initBlogPosts() {
  const blogContainer = document.getElementById('blog-posts');
  const pagination = document.getElementById('blog-pagination');
  if (!blogContainer) return;

  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);
  let currentPage = 1;

  function renderPage(page) {
    currentPage = page;
    const start = (page - 1) * POSTS_PER_PAGE;
    blogContainer.innerHTML = blogs.slice(start, start + POSTS_PER_PAGE).map(blog => `
      <div class="blog-item padd-15" data-tags="${escapeHtml(blog.tags.map(t => t.toLowerCase()).join(' '))}">
        <div class="blog-item-inner shadow-dark" data-blog-slug="${escapeHtml(blog.slug)}" role="link" tabindex="0" aria-label="Read post: ${escapeHtml(blog.title)}">
          <div class="blog-img">
            <img src="${escapeHtml(blog.image)}" alt="${escapeHtml(blog.title)}" loading="lazy">
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
    renderPagination();
  }

  function renderPagination() {
    if (!pagination) return;
    if (totalPages <= 1) {
      pagination.innerHTML = '';
      return;
    }
    let html = `<button class="page-btn prev" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous page"><i class="fa fa-angle-left" aria-hidden="true"></i></button>`;
    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="page-btn${i === currentPage ? ' active' : ''}" data-page="${i}" ${i === currentPage ? 'aria-current="page"' : ''} aria-label="Page ${i}">${i}</button>`;
    }
    html += `<button class="page-btn next" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Next page"><i class="fa fa-angle-right" aria-hidden="true"></i></button>`;
    pagination.innerHTML = html;
  }

  function openCard(card) {
    handleNavigation(`blog/${card.getAttribute('data-blog-slug')}`);
  }

  blogContainer.addEventListener('click', e => {
    const card = e.target.closest('[data-blog-slug]');
    if (card) openCard(card);
  });

  blogContainer.addEventListener('keydown', e => {
    const card = e.target.closest('[data-blog-slug]');
    if (card && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      openCard(card);
    }
  });

  if (pagination) {
    pagination.addEventListener('click', e => {
      const btn = e.target.closest('button.page-btn');
      if (!btn || btn.disabled) return;
      let page = currentPage;
      if (btn.classList.contains('prev')) page -= 1;
      else if (btn.classList.contains('next')) page += 1;
      else page = Number(btn.getAttribute('data-page'));
      if (page < 1 || page > totalPages || page === currentPage) return;
      renderPage(page);
      const section = blogContainer.closest('.section');
      if (section) section.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  renderPage(1);
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
        btn.textContent = 'Error, try again';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Error, try again';
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
