// ===============================
// ELEMENTOS
// ===============================

const header = document.querySelector(".header");

const searchToggle = document.querySelector(".search-toggle");
const searchBox = document.querySelector(".search-box");
const searchInput = document.querySelector("#searchInput");
const closeSearch = document.querySelector("#closeSearch");

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

const cartButton = document.querySelector(".cart-btn");
const cart = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
const closeCart = document.querySelector(".close-cart");

const cartItemsContainer = document.querySelector("#cartItems");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.querySelector("#cartTotal");

const toast = document.querySelector("#toast");

// ===============================
// HEADER AO ROLAR
// ===============================

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ===============================
// MENU MOBILE
// ===============================

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");

  const icon = menuToggle.querySelector("i");

  if (menu.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");

    const icon = menuToggle.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

// ===============================
// PESQUISA
// ===============================

searchToggle.addEventListener("click", () => {
  searchBox.classList.toggle("active");

  if (searchBox.classList.contains("active")) {
    searchInput.focus();
  }
});

closeSearch.addEventListener("click", () => {
  searchBox.classList.remove("active");
  searchInput.value = "";

  filterBooks("");
});

// ===============================
// DADOS DOS LIVROS
// ===============================

const books = [
  {
    title: "O Código da Noite",
    author: "Lucas Martins",
    category: "Ficção",
    price: 49.9,
  },

  {
    title: "Depois do Inverno",
    author: "Clara Mendes",
    category: "Romance",
    price: 39.9,
  },

  {
    title: "Código para Humanos",
    author: "Daniel Rocha",
    category: "Tecnologia",
    price: 59.9,
  },

  {
    title: "A Última Estação",
    author: "Marina Alves",
    category: "Ficção",
    price: 44.9,
  },
];

// ===============================
// FILTRO DOS LIVROS
// ===============================

const filters = document.querySelectorAll(".filter");
const bookCards = document.querySelectorAll(".book-card");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => {
      item.classList.remove("active");
    });

    filter.classList.add("active");

    const category = filter.dataset.filter;

    filterBooks(category);
  });
});

function filterBooks(category) {
  bookCards.forEach((card) => {
    const cardCategory = card.dataset.category;

    if (category === "Todos" || category === "" || cardCategory === category) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// ===============================
// CATEGORIAS
// ===============================

const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;

    document.querySelector("#livros").scrollIntoView({
      behavior: "smooth",
    });

    filters.forEach((filter) => {
      filter.classList.remove("active");

      if (filter.dataset.filter === category) {
        filter.classList.add("active");
      }
    });

    filterBooks(category);
  });
});

// ===============================
// PESQUISA DE LIVROS
// ===============================

searchInput.addEventListener("input", () => {
  const search = searchInput.value.toLowerCase().trim();

  bookCards.forEach((card) => {
    const title = card.dataset.title.toLowerCase();
    const author = card.dataset.author.toLowerCase();
    const category = card.dataset.category.toLowerCase();

    const match =
      title.includes(search) ||
      author.includes(search) ||
      category.includes(search);

    card.style.display = match ? "" : "none";
  });
});

// ===============================
// FAVORITOS
// ===============================

document.querySelectorAll(".favorite").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("liked");

    const icon = button.querySelector("i");

    if (button.classList.contains("liked")) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
    } else {
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
    }
  });
});

// ===============================
// CARRINHO
// ===============================

let cartItems = [];

// Abrir carrinho

cartButton.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartMenu);

overlay.addEventListener("click", closeCartMenu);

function openCart() {
  cart.classList.add("active");
  overlay.classList.add("active");

  document.body.classList.add("no-scroll");
}

function closeCartMenu() {
  cart.classList.remove("active");
  overlay.classList.remove("active");

  document.body.classList.remove("no-scroll");
}

// ===============================
// ADICIONAR AO CARRINHO
// ===============================

document.querySelectorAll(".add-cart").forEach((button, index) => {
  button.addEventListener("click", () => {
    const book = books[index];

    const existingBook = cartItems.find((item) => item.title === book.title);

    if (existingBook) {
      existingBook.quantity++;
    } else {
      cartItems.push({
        ...book,
        quantity: 1,
      });
    }

    updateCart();

    showToast();
  });
});

// ===============================
// ATUALIZAR CARRINHO
// ===============================

function updateCart() {
  cartItemsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>Seu carrinho está vazio</h3>

                <p>
                    Adicione livros para começar sua compra.
                </p>

            </div>
        `;
  } else {
    cartItems.forEach((item, index) => {
      const cartItem = document.createElement("div");

      cartItem.className = "cart-item";

      cartItem.innerHTML = `

                <div class="cart-item-cover">
                    ${item.title}
                </div>

                <div class="cart-item-info">

                    <h4>${item.title}</h4>

                    <span>${item.author}</span>

                    <div class="cart-item-price">

                        <strong>
                            R$ ${(item.price * item.quantity)
                              .toFixed(2)
                              .replace(".", ",")}
                        </strong>

                        <span>
                            ${item.quantity}x
                        </span>

                        <button
                            class="remove-item"
                            data-index="${index}">
                            Remover
                        </button>

                    </div>

                </div>
            `;

      cartItemsContainer.appendChild(cartItem);
    });
  }

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  cartCount.textContent = totalItems;

  cartTotal.textContent = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;

  // Remover itens

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      cartItems.splice(index, 1);

      updateCart();
    });
  });
}

// ===============================
// TOAST
// ===============================

function showToast() {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ===============================
// NEWSLETTER
// ===============================

const newsletter = document.querySelector(".newsletter");

newsletter.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = newsletter.querySelector("input");

  if (email.value.trim() !== "") {
    email.value = "";

    toast.querySelector("span").textContent = "E-mail cadastrado com sucesso!";

    showToast();
  }
});

// ===============================
// CHECKOUT
// ===============================

document.querySelector(".checkout").addEventListener("click", () => {
  if (cartItems.length === 0) {
    toast.querySelector("span").textContent = "Adicione um livro ao carrinho.";

    showToast();

    return;
  }

  toast.querySelector("span").textContent = "Pedido iniciado com sucesso!";

  showToast();
});

// ===============================
// ESC PARA FECHAR CARRINHO
// ===============================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCartMenu();

    searchBox.classList.remove("active");
  }
});

// Inicialização

updateCart();
