
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCohqbsOhJq8xhPzbLGvJCHzTnWIu0mQDk",
  authDomain: "churros-levi.firebaseapp.com",
  projectId: "churros-levi",
  storageBucket: "churros-levi.firebasestorage.app",
  messagingSenderId: "509825412186",
  appId: "1:509825412186:web:7c665e2d44ab916d277c63"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.container-products');
  if (!container) return;

  try {
    const snapshot = await getDocs(collection(db, "promociones"));
    const promociones = snapshot.docs.map(doc => doc.data());

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

    const createStarsHTML = (estrellas) => {
      return Array.from({ length: 5 }, (_, i) => {
        if (i < Math.floor(estrellas)) return '<i class="fa-solid fa-star"></i>';
        if (i < estrellas) return '<i class="fa-solid fa-star-half-stroke"></i>';
        return '<i class="fa-regular fa-star"></i>';
      }).join('');
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

      const estrellasHTML = createStarsHTML(estrellas);
      const precioHTML = `
        <p class="price">
          ${formatCOP(precio)}
          ${precioOriginal > precio ? `<span>${formatCOP(precioOriginal)}</span>` : ""}
        </p>
      `;

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

  } catch (error) {
    container.innerHTML = "<p>Error al cargar promociones.</p>";
    console.error("Error al obtener promociones desde Firebase:", error);
  }
});
