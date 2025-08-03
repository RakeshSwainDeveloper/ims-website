window.addEventListener('DOMContentLoaded', () => {
  includeHTML();
});

function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => {
        if (res.ok) return res.text();
        else throw new Error(`Failed to load ${file}`);
      })
      .then(html => {
        el.innerHTML = html;
      })
      .catch(err => {
        el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
        console.error(err);
      });
  });
}
