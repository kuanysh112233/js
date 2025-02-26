// Получаем элементы
const addBookBtn = document.getElementById("add-book-btn");
const modal = document.getElementById("book-modal");
const closeModalBtn = document.getElementById("close-modal");
const bookForm = document.getElementById("book-form");
const bookContainer = document.getElementById("books-container");

// Открытие модального окна
addBookBtn.addEventListener("click", () => {
  modal.style.display = "block"; // Показываем модальное окно
});

// Закрытие модального окна
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none"; // Скрываем модальное окно
});

// Закрытие модального окна при клике вне его
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Функция для добавления книги
bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Предотвращаем перезагрузку страницы

  // Получаем данные из формы
  const bookTitle = document.getElementById("book-title").value;
  const bookAuthor = document.getElementById("book-author").value;
  const bookImage = document.getElementById("book-image").value;

  if (bookTitle && bookAuthor && bookImage) {
    // Создаем карточку книги
    const card = document.createElement("div");
    card.classList.add("card");
    const lastBookId = getFromLocalStorage("books").length;
    addToLocalStorage("books", {
      id: lastBookId + 1,
      title: bookTitle,
      imageLink: bookImage,
      author: bookAuthor,
    });
    card.innerHTML = `
             <a href="#"><img src="${bookImage}" alt="${bookTitle}"></a>
             <div>
                 <h3>${bookTitle}</h3>
                 <p>${bookAuthor}</p>
             </div>
         `;

    // Добавляем карточку в контейнер
    bookContainer.appendChild(card);

    // Закрываем модальное окно
    modal.style.display = "none";

    // Очищаем форму
    bookForm.reset();
  } else {
    alert("Пожалуйста, заполните все поля!");
  }
});

// Функция для отображения модального окна
function showModal() {
  document.getElementById("registrationModal").style.display = "block";
}

// Функция для закрытия модального окна
function closeModal() {
  document.getElementById("registrationModal").style.display = "none";
}

// Закрытие окна при клике вне его области
window.onclick = function (event) {
  var modal = document.getElementById("registrationModal");
  if (event.target == modal) {
    closeModal();
  }
};

window.addEventListener("load", () => {
  const books = getFromLocalStorage("books");
  showBooks(books);
});

const inputElem = document.getElementById("searchBooks");

const addToCart = (id) => {
  const books = getFromLocalStorage("books"); // Достаем все книги из локального хранилища
  const foundBook = books.find((i) => i.id === +id); // Ищем книгу по id

  if (foundBook) {
      addToLocalStorage("cart", foundBook); // Добавляем книгу в корзину
      alert("Добавлено в корзину");
  } else {
      alert("Книга не найдена");
  }
};

const showBooks = (books) => {
  const container = document.getElementById("books-container");
  container.textContent = ""; // Очищаем контейнер перед обновлением

  books.forEach((book) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
          <div> 
              <a href="../book/Китап1.html"><img src="${book.imageLink}" alt="${book.title}"></a> 
              <div> 
                  <h3 style=" font-size:19px;">${book.title}</h3> 
                  <p style=" font-size:17px;">${book.author}</p><br> 
                  <button class="button" onclick="addToCart(${book.id})">Купить</button>
              </div> 
          </div>
      `;

      container.appendChild(card);
  });
};

const findBooks = () => {
  const books = getFromLocalStorage("books");
  const inputValue = inputElem.value.toUpperCase();
  const filteredBooks = books.filter((i) =>
      i.title.toUpperCase().includes(inputValue)
  );
  showBooks(filteredBooks);
};



