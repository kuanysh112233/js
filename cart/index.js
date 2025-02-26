const carts = getFromLocalStorage("cart");

window.addEventListener("load", () => {
  const cartItems = getFromLocalStorage("cart");
  showCartItems(cartItems);
});

// Функция для отображения товаров в корзине
const showCartItems = (cartItems) => {
  const cartContainer = document.getElementById("card-container");
  cartContainer.textContent = "";  // Очистка контейнера перед добавлением новых товаров

  cartItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div>
        <a href="#" class="card-container"><img src="${item.imageLink}" alt="${item.title}"></a>
        <div>
            <h3>${item.title}</h3>
            <p>${item.author}</p>
            <button class="remove-btn">Удалить</button>
            <button class="buy-btn">Купить</button>
        </div>
        </div>
    `;

    // Обработчик для кнопки "Удалить"
    const removeButton = card.querySelector(".remove-btn");
    removeButton.addEventListener("click", () => {
      // Удаление товара из корзины
      cartItems.splice(index, 1); // Удаляем элемент из массива
      saveToLocalStorage("cart", cartItems); // Обновляем localStorage
      showCartItems(cartItems); // Перерисовываем корзину
    });

    // Обработчик для кнопки "Купить"
    const buyButton = card.querySelector(".buy-btn");
    buyButton.addEventListener("click", () => {
      // Логика для покупки товара (например, переход на страницу оформления заказа)
      alert(`Книга ${item.title} была куплена!`);
    });

    cartContainer.appendChild(card);
  });
};

// Функция для сохранения данных в localStorage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

