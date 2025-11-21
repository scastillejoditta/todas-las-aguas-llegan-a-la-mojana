// script para que la lista de la conversación se pueda navegar horizontal con a rueda del mouse
const ruta = document.querySelector('.ruta');

ruta.addEventListener('wheel', (e) => {
  if (e.deltaY !== 0) {
    e.preventDefault();
    ruta.scrollLeft += e.deltaY;
  }
});

// script para que el menú lateral escuche en qué panel está y reaccione

const panels = document.querySelectorAll('.panel');
  const links = document.querySelectorAll('#indicator .nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(panels).indexOf(entry.target);
        links.forEach(link => link.classList.remove('active'));
        if (links[index]) links[index].classList.add('active');
      }
    });
  }, {
    threshold: 0.4 // panel debe estar al menos 30% visible
  });

  panels.forEach(panel => observer.observe(panel));
