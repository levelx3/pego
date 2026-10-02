/**
 * Anti-Screenshot & Inspectie Beveiliging
 * Ontmoedigt basispogingen tot het vastleggen of inspecteren van de pagina.
 */
(function () {
  'use strict';

  // CSS toevoegen voor soepele overgangen
  const style = document.createElement('style');
  style.textContent = `
    body {
      transition: filter 0.2s ease, opacity 0.2s ease;
    }
    .protected-blur {
      filter: blur(25px) !important;
    }
    .protected-hide {
      opacity: 0 !important;
    }
  `;
  document.head.appendChild(style);

  // 1. Pagina vervagen bij verlies van focus (bijv. Alt+Tab, Snipping Tool)
  window.addEventListener('blur', () => {
    document.body.classList.add('protected-blur');
  });

  window.addEventListener('focus', () => {
    document.body.classList.remove('protected-blur');
  });

  // 2. Inhoud verbergen wanneer de muis het venster verlaat
  document.addEventListener('mouseleave', () => {
    document.body.classList.add('protected-hide');
  });

  document.addEventListener('mouseenter', () => {
    document.body.classList.remove('protected-hide');
  });

  // 3. Verbergen bij verdachte toetscombinaties (Cmd / Ctrl / PrintScreen)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Meta' || e.key === 'Control' || e.key === 'PrintScreen') {
      document.body.classList.add('protected-hide');
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Meta' || e.key === 'Control' || e.key === 'PrintScreen') {
      document.body.classList.remove('protected-hide');
    }
  });

  // 4. Detectie van Developer Tools via venstergrootte
  function checkDevTools() {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
      document.body.innerHTML = `
        <div style="display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; text-align:center;">
          <h1>Toegang Geweigerd</h1>
          <p>Ontwikkelaarsgereedschap is gedetecteerd op deze pagina.</p>
        </div>
      `;
    }
  }

  window.addEventListener('resize', checkDevTools);
  checkDevTools(); // Meteen controleren bij inladen
})();