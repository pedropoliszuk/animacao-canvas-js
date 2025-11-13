const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');

const circulos = [];
for (let i = 0; i < 10; i++) {
  circulos.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    raio: 20 + Math.random() * 30,
    cor: getCorAleatoria(),
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4
  });
}

function getCorAleatoria() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let c of circulos) {

    c.x += c.dx;
    c.y += c.dy;

    if (c.x + c.raio > canvas.width || c.x - c.raio < 0) c.dx *= -1;
    if (c.y + c.raio > canvas.height || c.y - c.raio < 0) c.dy *= -1;

    ctx.beginPath();
    ctx.arc(c.x, c.y, c.raio, 0, Math.PI * 2);
    ctx.fillStyle = c.cor;
    ctx.fill();
  }

  requestAnimationFrame(animar);
}

canvas.addEventListener('click', (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  circulos.forEach(c => {
    const distancia = Math.sqrt((mouseX - c.x) ** 2 + (mouseY - c.y) ** 2);
    if (distancia < c.raio) {
      c.cor = getCorAleatoria();
    }
  });
});

animar();
