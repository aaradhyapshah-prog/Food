// The Momo House — small, purposeful interactions.
const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

// Restore a visitor's preferred theme, while respecting their first visit.
const savedTheme = localStorage.getItem('momo-theme');
if (savedTheme) root.dataset.theme = savedTheme;
const updateThemeIcon = () => {
  const dark = root.dataset.theme === 'dark';
  themeButton.innerHTML = `<span>${dark ? '☾' : '☼'}</span>`;
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
};
updateThemeIcon();
themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('momo-theme', root.dataset.theme);
  updateThemeIcon();
});

// Mobile navigation.
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.textContent = open ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

// Menu category filtering.
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.menu-card').forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));

// Keep the demo reservation flow friendly without sending a request.
document.querySelector('.reservation-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = event.currentTarget.elements.name.value.trim();
  const message = event.currentTarget.querySelector('.form-message');
  message.textContent = name ? `Thanks, ${name}! We will confirm your table shortly.` : 'Please add your name to continue.';
  if (name) event.currentTarget.reset();
});
