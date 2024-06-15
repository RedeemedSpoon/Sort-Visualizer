const themeToggle = document.getElementById('theme');
const themeToggleBtn = document.getElementById('toggle');
const lightThemeImg = document.getElementById('light');
const darkThemeImg = document.getElementById('dark');

const selectorBtn = document.getElementById('algo-selector');
const overlay = document.getElementById('overlay');
const navBar = document.querySelector('nav');

// NavBar
selectorBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleNavBar();
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('nav')) {
    navBar.classList.contains('slide-in') && toggleNavBar();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    toggleNavBar();
  }
});

const toggleNavBar = () => {
  const isOpen = navBar.classList.contains('slide-in');
  navBar.setAttribute('class', isOpen ? 'slide-out' : 'slide-in');
  overlay.classList.toggle('active');
};

// Theme
document.addEventListener('DOMContentLoaded', function () {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('color-theme');
  const theme = storedTheme || (prefersDarkMode.matches ? 'dark' : 'light');
  theme === 'dark' && addDarkTheme();
});

[themeToggle, themeToggleBtn].forEach((element) => {
  element.addEventListener('click', () => {
    lightThemeImg.classList.contains('active') ? addDarkTheme() : removeDarkTheme();
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('color-theme', theme);
  });
});

const addDarkTheme = () => {
  document.body.classList.add('dark');
  lightThemeImg.classList.remove('active');
  darkThemeImg.classList.add('active');
  themeToggle.classList.add('night');
  themeToggleBtn.classList.add('left');
  navBar.id = 'dark-mode';
};

const removeDarkTheme = () => {
  document.body.classList.remove('dark');
  lightThemeImg.classList.add('active');
  darkThemeImg.classList.remove('active');
  themeToggle.classList.remove('night');
  themeToggleBtn.classList.remove('left');
  navBar.removeAttribute('id');
};
