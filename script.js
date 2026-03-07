let mobileMenuInitialized = false;

document.addEventListener('DOMContentLoaded', async () => {
  await injectComponents();
  await renderLatestIntel();
});

async function injectComponents() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  const tasks = [];

  if (headerPlaceholder) {
    tasks.push(fetch('/partials/header.html').then(r => r.text()).then(html => {
      headerPlaceholder.innerHTML = html;
      highlightActiveNav();
      initMobileMenu();
    }).catch(console.error));
  }

  if (footerPlaceholder) {
    tasks.push(fetch('/partials/footer.html').then(r => r.text()).then(html => {
      footerPlaceholder.innerHTML = html;
    }).catch(console.error));
  }

  await Promise.all(tasks);
}

function highlightActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if ((path === '/' || path.endsWith('/index.html')) && href === '/index.html') {
      link.classList.add('is-active');
    }
    if (path.startsWith('/devlog') && href === '/devlog/index.html') {
      link.classList.add('is-active');
    }
    if (path.startsWith('/about') && href === '/about/index.html') {
      link.classList.add('is-active');
    }
  });
}

function initMobileMenu() {
  if (mobileMenuInitialized) return;
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  mobileMenuInitialized = true;
}

async function renderLatestIntel() {
  const mount = document.getElementById('latest-intel-list');
  if (!mount) return;

  const posts = [
    { id: '002', url: '/devlogs/posts/002.html' },
    { id: '001', url: '/devlogs/posts/001.html' }
  ];

  try {
    const parsed = await Promise.all(posts.map(async post => {
      const text = await fetch(post.url).then(r => r.text());
      const title = text.match(/<h1>(.*?)<\/h1>/i)?.[1] || `Devlog #${post.id}`;
      const meta = text.match(/<p class="article-meta">(.*?)<\/p>/i)?.[1] || '';
      const date = meta.split('•')[0]?.trim() || 'Recent';
      return { ...post, title, date };
    }));

    mount.innerHTML = parsed.map(item =>
      `<a href="${item.url}"><strong>${item.title}</strong><br><span class="meta">${item.date}</span></a>`
    ).join('');
  } catch (err) {
    mount.innerHTML = '<a href="/devlog/index.html"><strong>Read the latest updates</strong></a>';
  }
}
