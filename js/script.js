document.addEventListener('DOMContentLoaded', () => {
  const cartCount = document.querySelector('.content-shopping-cart .number');
  const addToCartButtons = document.querySelectorAll('.add-cart');
  const filterOptions = document.querySelectorAll('.container-options span');
  const searchForm = document.querySelector('.search-form');
  const searchInput = searchForm?.querySelector('input[type="search"]') || null;

  // Función para actualizar el número en el carrito visualmente
  const updateCartNumber = (count) => {
    if (cartCount) {
      cartCount.textContent = `(${count})`;
    }
  };

  // Obtener carrito de localStorage o inicializar vacío
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Calcular la cantidad total de productos en carrito
  let cartItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  // Actualizar contador inicial
  updateCartNumber(cartItems);

  // Evento para agregar al carrito
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.card-product');

      const productId = button.dataset.id || card?.dataset.id || `${Date.now()}`; // fallback id
      const productName = button.dataset.name || card?.querySelector('h3')?.textContent.trim();
      const productPriceRaw = button.dataset.price || card?.querySelector('.price')?.textContent.trim();

      if (!productName || !productPriceRaw) {
        alert('Error al obtener datos del producto');
        return;
      }

      let productPrice = productPriceRaw.split(' ')[0].replace(/[^\d]/g, '');
      productPrice = parseInt(productPrice, 10);

      if (isNaN(productPrice)) {
        alert('Precio inválido');
        return;
      }

      const existingProductIndex = carrito.findIndex(item => item.id === productId);

      if (existingProductIndex > -1) {
        carrito[existingProductIndex].cantidad++;
      } else {
        carrito.push({
          id: productId,
          name: productName,
          price: productPrice,
          cantidad: 1
        });
      }

      cartItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
      updateCartNumber(cartItems);

      localStorage.setItem('carrito', JSON.stringify(carrito));

      window.location.href = 'menu.html';
    });
  });

  // Filtro de productos destacados
  filterOptions.forEach(option => {
    option.addEventListener('click', () => {
      filterOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      alert(`Filtro seleccionado: ${option.textContent}`);
      // Aquí puedes agregar lógica para filtrar productos según el texto
    });
  });

  // Evento de búsqueda (simulación)
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        alert(`Buscando: ${query}`);
        // Aquí puedes agregar la lógica para filtrar o buscar productos
      } else {
        alert('Por favor ingresa un término de búsqueda.');
      }
    });
  }

  // Preguntas Frecuentes - desplegar respuestas
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const answerId = button.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);

      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        answer.hidden = true;
      } else {
        button.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });

  // Interacciones con los botones del grupo (Ver, Me gusta, Comparar)
  const actionIcons = document.querySelectorAll('.button-group span');
  actionIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const iconClass = icon.querySelector('i')?.classList.value || '';
      if (iconClass.includes('fa-eye')) {
        alert('Vista rápida del producto');
      } else if (iconClass.includes('fa-heart')) {
        alert('Agregado a favoritos');
      } else if (iconClass.includes('fa-code-compare')) {
        alert('Producto añadido para comparar');
      }
    });
  });
});
