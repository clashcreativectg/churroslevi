document.addEventListener('DOMContentLoaded', () => {
  const cartCount = document.querySelector('.content-shopping-cart .number');
  const addToCartButtons = document.querySelectorAll('.add-cart');
  const filterOptions = document.querySelectorAll('.container-options span');
  const searchForm = document.querySelector('.search-form');
  const searchInput = searchForm?.querySelector('input[type="search"]') || null;

  const updateCartNumber = (count) => {
    if (cartCount) {
      cartCount.textContent = `(${count})`;
    }
  };

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let cartItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  updateCartNumber(cartItems);

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.card-product');
      const productId = button.dataset.id || card?.dataset.id || `${Date.now()}`;
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
        carrito.push({ id: productId, name: productName, price: productPrice, cantidad: 1 });
      }

      cartItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
      updateCartNumber(cartItems);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      window.location.href = 'menu.html';
    });
  });

  filterOptions.forEach(option => {
    option.addEventListener('click', () => {
      filterOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      alert(`Filtro seleccionado: ${option.textContent}`);
    });
  });

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        alert(`Buscando: ${query}`);
      } else {
        alert('Por favor ingresa un término de búsqueda.');
      }
    });
  }

  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const answerId = button.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);
      button.setAttribute('aria-expanded', !isExpanded);
      answer.hidden = isExpanded;
    });
  });

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

  // Menú hamburguesa con cierre al hacer clic fuera
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevenir cierre inmediato al hacer clic en el botón
      menu.classList.toggle('active');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && e.target !== menuToggle) {
        menu.classList.remove('active');
      }
    });
  }
});
