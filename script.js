(function () {
  'use strict';

  // Año en el footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Menú móvil
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var navClose = document.querySelector('.nav-close');
  var navOverlay = document.getElementById('nav-overlay');

  function setMenuOpen(open) {
    if (!navLinks || !toggle) return;
    navLinks.setAttribute('data-open', String(open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    toggle.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (navOverlay) {
      navOverlay.setAttribute('aria-hidden', String(!open));
    }
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var open = navLinks.getAttribute('data-open') !== 'true';
      setMenuOpen(open);
    });

    if (navClose) {
      navClose.addEventListener('click', function () {
        setMenuOpen(false);
      });
    }

    if (navOverlay) {
      navOverlay.addEventListener('click', function () {
        setMenuOpen(false);
      });
    }

    // Cerrar al hacer clic en un enlace (navegación móvil)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });
  }

  // Foco por sección: activa la que contiene el "punto focal"
  var sections = document.querySelectorAll('main > section[id]');
  if (sections.length === 0) return;

  var scrollTargetId = null;
  var scrollTargetUntil = 0;

  function setActiveSection() {
    var vh = window.innerHeight;
    var scrollBottom = window.scrollY + vh;
    var docHeight = document.documentElement.scrollHeight;
    // Zonas del documento: final = Habilidades, muy final = Contacto
    var nearBottom = scrollBottom > docHeight - vh * 0.25;
    var veryBottom = scrollBottom > docHeight - vh * 0.12;
    // Punto focal: 20% arriba en general; 55% en zona Habilidades; 85% en zona Contacto (para que Contacto se aclare al llegar al final)
    var focalY = veryBottom ? vh * 0.85 : (nearBottom ? vh * 0.55 : vh * 0.2);
    var best = null;

    // Si acabamos de hacer clic en un enlace #, priorizar esa sección mientras sea visible
    if (scrollTargetId && Date.now() < scrollTargetUntil) {
      for (var k = 0; k < sections.length; k++) {
        if (sections[k].id === scrollTargetId) {
          var tr = sections[k].getBoundingClientRect();
          if (tr.bottom > 0 && tr.top < vh) {
            best = sections[k];
            break;
          }
        }
      }
    }

    // Entre las que contienen el punto focal, elegir la que MÁS se ve en pantalla
    // (evita que Certificaciones robe el foco cuando solo asoma por arriba estando en Habilidades/Contacto)
    if (!best) {
      var bestArea = 0;
      for (var i = 0; i < sections.length; i++) {
        var r = sections[i].getBoundingClientRect();
        if (r.top <= focalY && r.bottom >= focalY) {
          var top = Math.max(0, r.top);
          var bottom = Math.min(vh, r.bottom);
          var visible = Math.max(0, bottom - top);
          if (visible > bestArea) {
            bestArea = visible;
            best = sections[i];
          }
        }
      }
    }
    // Si ninguna contiene el punto focal, usar la que más se vea
    if (!best) {
      var bestArea2 = 0;
      for (var j = 0; j < sections.length; j++) {
        var rect = sections[j].getBoundingClientRect();
        var top = Math.max(0, rect.top);
        var bottom = Math.min(vh, rect.bottom);
        var visible = Math.max(0, bottom - top);
        if (visible > bestArea2) {
          bestArea2 = visible;
          best = sections[j];
        }
      }
    }
    var activeId = best ? best.id : sections[0].id;
    sections.forEach(function (s) {
      s.classList.toggle('section-active', s.id === activeId);
    });
    
    // Actualizar enlaces del menú con clase active
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === '#' + activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      setActiveSection();
      ticking = false;
    });
  }

  setActiveSection();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // Al hacer clic en un enlace #, priorizar esa sección unos instantes (scroll suave + re-renders)
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === '#') return;
    link.addEventListener('click', function () {
      scrollTargetId = href.slice(1);
      scrollTargetUntil = Date.now() + 2600;
      var run = 0;
      function check() {
        setActiveSection();
        run += 1;
        if (run < 10) setTimeout(check, 100);
      }
      setTimeout(check, 50);
    });
  });
})();
