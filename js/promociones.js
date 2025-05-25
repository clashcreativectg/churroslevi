document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container-products');
  const promociones = JSON.parse(localStorage.getItem('promocionesChurrosLevi')) || [];

  if (!container) return;

  if (promociones.length === 0) {
    container.innerHTML = "<p>No hay promociones disponibles por ahora.</p>";
    return;
  }

  const formatCOP = (valor) => {
    return valor.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    });
  };

  container.innerHTML = promociones.map(promo => {
    const {
      titulo = 'Promoción sin título',
      precio = 0,
      precioOriginal = 0,
      imagen = 'img/default_promo.png',
      estrellas = 0,
      descuento = ''
    } = promo;

    const estrellasHTML = Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(estrellas)) return '<i class="fa-solid fa-star"></i>';
      if (i < estrellas) return '<i class="fa-solid fa-star-half-stroke"></i>';
      return '<i class="fa-regular fa-star"></i>';
    }).join('');

    let precioHTML = `<p class="price">${formatCOP(precio)}`;
    if (precioOriginal > precio) {
      precioHTML += ` <span>${formatCOP(precioOriginal)}</span>`;
    }
    precioHTML += `</p>`;

    return `
      <div class="card-product">
        <div class="container-img">
          <img src="${imagen}" alt="${titulo}" loading="lazy" />
          ${descuento ? `<span class="discount">${descuento}</span>` : ""}
        </div>
        <div class="content-card-product">
          <h3>${titulo}</h3>
          <div class="stars">${estrellasHTML}</div>
          ${precioHTML}
        </div>
      </div>
    `;
  }).join('');
});