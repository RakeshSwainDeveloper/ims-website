window.addEventListener('DOMContentLoaded', () => {
  includeHTML();
});

function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');
  let pending = includes.length;

  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => {
        if (res.ok) return res.text();
        else throw new Error(`Failed to load ${file}`);
      })
      .then(html => {
        el.innerHTML = html;

        // Run nav logic only after header is loaded
        if (file.includes('header.html')) {
          setActiveNavLink();
          enableDropdownMenus();
          adjustBodyPadding(); // 👈 THIS IS CRITICAL
          window.addEventListener('resize', adjustBodyPadding); // Recalculate on resize
        }

      })
      .catch(err => {
        el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
        console.error(err);
      });
  });
}

function adjustBodyPadding() {
  const header = document.querySelector('.site-header');
  if (header) {
    // Wait until the header is fully rendered
    requestAnimationFrame(() => {
      const height = header.offsetHeight;
      document.body.style.paddingTop = `${height}px`;
      console.log("Header height set:", height);
    });
  } else {
    console.warn("Header not found.");
  }
}


function setActiveNavLink() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function enableDropdownMenus() {
  const dropdownItems = document.querySelectorAll('.nav-links .has-submenu');

  dropdownItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.classList.add('open');
    });

    item.addEventListener('mouseleave', () => {
      item.classList.remove('open');
    });
    const triggerLink = item.querySelector('a');
    if (triggerLink) {
      triggerLink.addEventListener('click', e => {
        if (window.innerWidth < 768) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });
}
