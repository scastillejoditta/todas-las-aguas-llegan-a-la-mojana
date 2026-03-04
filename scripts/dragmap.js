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

// scripts para el mapa
const mapPanel = document.getElementById('mapPanel');
const mapImage = document.getElementById('mapImage');

// make sure the map itself (an <img>) isn't draggable, otherwise touch
// swipes try to drag it instead of scrolling the container
mapImage.addEventListener('dragstart', e => e.preventDefault());
mapImage.setAttribute('draggable', 'false');
        
// Scroll horizontal con rueda del mouse
mapPanel.addEventListener('wheel', (e) => {
  if (e.deltaY !== 0) {
    e.preventDefault();
    mapPanel.scrollLeft += e.deltaY;
  }
});

// Navegación con teclado (flechas)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    mapPanel.scrollLeft -= 50;
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    mapPanel.scrollLeft += 50;
  }
});

// Arrastrar con el mouse (y también touch para móviles)
let isDown = false;
let startX;
let scrollLeft;

const startDrag = (pageX) => {
  isDown = true;
  startX = pageX - mapPanel.offsetLeft;
  scrollLeft = mapPanel.scrollLeft;
};
const moveDrag = (pageX) => {
  if (!isDown) return;
  const x = pageX - mapPanel.offsetLeft;
  const walk = (x - startX) * 2;
  mapPanel.scrollLeft = scrollLeft - walk;
};

mapPanel.addEventListener('mousedown', (e) => {
  startDrag(e.pageX);
});
mapPanel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  moveDrag(e.pageX);
});
mapPanel.addEventListener('mouseleave', () => { isDown = false; });
mapPanel.addEventListener('mouseup', () => { isDown = false; });

// touch equivalents allow finger dragging as well as native scrolling doesn't
// get blocked by the JS listeners
mapPanel.addEventListener('touchstart', (e) => {
  startDrag(e.touches[0].pageX);
});
mapPanel.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  moveDrag(e.touches[0].pageX);
});
mapPanel.addEventListener('touchend', () => { isDown = false; });

// Marcadores del mapa
const markers = document.querySelectorAll('.marker');

// Agregar evento de click a cada marcador
markers.forEach(marker => {
  marker.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar que el click se propague al panel
    marker.classList.toggle('marker_active');
  });
});

// Opcional: Cerrar todos los marcadores al hacer click fuera de ellos
mapPanel.addEventListener('click', () => {
  markers.forEach(marker => marker.classList.remove('marker_active'));
});