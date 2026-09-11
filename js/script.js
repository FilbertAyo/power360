(function () {
  'use strict';

  var nav = document.getElementById('navbarmain');
  var toggler = document.querySelector('.navbar-toggler');

  function closeNav() {
    if (!nav || !toggler) {
      return;
    }
    nav.classList.remove('show');
    toggler.classList.add('collapsed');
    toggler.setAttribute('aria-expanded', 'false');
  }

  if (toggler && nav) {
    toggler.addEventListener('click', function () {
      var open = nav.classList.toggle('show');
      toggler.classList.toggle('collapsed', !open);
      toggler.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (event) {
      if (window.matchMedia('(min-width: 992px)').matches) {
        return;
      }
      event.preventDefault();
      var parent = toggle.closest('.dropdown');
      var isOpen = parent.classList.contains('show');
      document.querySelectorAll('.dropdown.show').forEach(function (item) {
        item.classList.remove('show');
        var openToggle = item.querySelector('.dropdown-toggle');
        if (openToggle) {
          openToggle.setAttribute('aria-expanded', 'false');
        }
      });
      if (!isOpen) {
        parent.classList.add('show');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.navbar')) {
      document.querySelectorAll('.dropdown.show').forEach(function (item) {
        item.classList.remove('show');
      });
      closeNav();
    }
  });

  var backtop = document.querySelector('.backtop');
  if (backtop) {
    window.addEventListener('scroll', function () {
      backtop.classList.toggle('reveal', window.scrollY > 70);
    }, { passive: true });
  }
})();
