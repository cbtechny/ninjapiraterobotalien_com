/** Shared components enhance complete static navigation; failed requests leave it intact. */
document.addEventListener('DOMContentLoaded', () => {
  initDeferredVideos();
  highlightActiveNav();
  initMobileMenu();
  injectComponents();
});

async function injectComponents() {
  await Promise.all(['header', 'footer'].map(async component => {
    const mount = document.getElementById(`${component}-placeholder`);
    if (!mount) return;
    try {
      const response = await fetch(`/partials/${component}.html`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      // A slow response must not replace navigation/footer while it is in use.
      if (mount.contains(document.activeElement) || mount.querySelector('.main-nav.active')) return;
      // Only repository-authored, same-origin partials are inserted here.
      mount.innerHTML = html;
      highlightActiveNav();
      if (component === 'header') initMobileMenu();
    } catch (error) {
      console.warn(`${component} unavailable; keeping static fallback.`, error);
    }
  }));
}

function highlightActiveNav() {
  const normalize = path => path.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
  const current = normalize(location.pathname);
  document.querySelectorAll('.main-nav a, .footer-nav a').forEach(link => {
    const target = normalize(new URL(link.href).pathname);
    const exact = current === target;
    const section = (target === '/devlog' && current.startsWith('/devlogs/posts/')) || (target !== '/' && new URL(link.href).pathname.endsWith('/index.html') && current.startsWith(target + '/'));
    link.classList.toggle('is-active', exact || section);
    link.removeAttribute('aria-current');
    if (exact || section) link.setAttribute('aria-current', exact ? 'page' : 'location');
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav || toggle.dataset.initialized) return;
  toggle.dataset.initialized = 'true';
  toggle.hidden = false;
  const small = matchMedia('(max-width: 768px)');
  let open = false;
  function setOpen(value, restoreFocus = false) {
    open = value;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.classList.toggle('active', open);
    nav.classList.toggle('active', open);
    nav.hidden = small.matches && !open;
    nav.inert = small.matches && !open;
    if (restoreFocus) toggle.focus();
  }
  nav.classList.add('menu-ready');
  toggle.addEventListener('click', () => {
    setOpen(!open);
    if (open) nav.querySelector('a')?.focus();
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false, small.matches);
  });
  // Bind to this header so replacement does not leave document listeners behind.
  toggle.closest('header').addEventListener('keydown', event => {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false, true);
    }
  });
  toggle.closest('header').addEventListener('focusout', event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  });
  small.addEventListener('change', () => {
    if (!toggle.isConnected) return;
    const restore = small.matches && nav.contains(document.activeElement);
    setOpen(false, restore);
  });
  setOpen(false);
}

function initDeferredVideos() {
  document.querySelectorAll('[data-video-player]').forEach(player => {
    const button = player.querySelector('button');
    const preview = player.querySelector('img');
    const status = player.querySelector('[role="status"]');
    let video;
    button.hidden = false;
    button.addEventListener('click', async () => {
      if (!video) {
        video = document.createElement('video');
        video.controls = true;
        video.playsInline = true;
        video.muted = true;
        video.preload = 'none';
        video.poster = preview.src;
        video.width = Number(preview.getAttribute('width'));
        video.height = Number(preview.getAttribute('height'));
        video.setAttribute('aria-label', button.dataset.label);
        video.setAttribute('aria-describedby', player.dataset.description);
        video.addEventListener('error', () => {
          video.hidden = true;
          preview.hidden = false;
          button.hidden = false;
          status.textContent = 'Video could not load. The preview and explanation are still available. Press Play to retry.';
        });
        player.querySelector('.video-stage').append(video);
      }
      status.textContent = '';
      preview.hidden = true;
      video.hidden = false;
      button.hidden = true;
      // No media element or source exists until this explicit visitor action.
      video.src = player.dataset.video;
      video.focus();
      try {
        await video.play();
      } catch (error) {
        if (!video.error) status.textContent = 'Press Play in the video controls to start playback.';
      }
    });
  });
}
