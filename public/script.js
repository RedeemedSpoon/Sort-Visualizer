const themeToggle = document.getElementById('theme');
const themeToggleBtn = document.getElementById('toggle');
const lightThemeImg = document.getElementById('light');
const darkThemeImg = document.getElementById('dark');

document.addEventListener('DOMContentLoaded', function () {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('color-theme');
  const theme = storedTheme || (prefersDarkMode.matches ? 'dark' : 'light');

  if (theme === 'dark') {
    document.body.classList.add('dark');
    addDarkTheme();
  }
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
};

const removeDarkTheme = () => {
  document.body.classList.remove('dark');
  lightThemeImg.classList.add('active');
  darkThemeImg.classList.remove('active');
  themeToggle.classList.remove('night');
  themeToggleBtn.classList.remove('left');
};
