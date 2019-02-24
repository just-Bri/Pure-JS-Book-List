class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");
    // insert cols
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="" class="delete">X</a></td>
  `;
    list.appendChild(row);
    // Event Listener - Delete
    document.querySelector(".delete").addEventListener("click", function(e) {
      //   console.log(e);
      //   Instantiate UI
      const ui = new UI();
      ui.deleteBook(e.target);
      // Show message
      ui.showAlert("Book Removed", "success");

      e.preventDefault();
    });
  }
  showAlert(message, className) {
    // Create div
    const div = document.createElement("div");
    // add class
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".container");
    // get form
    const form = document.querySelector("#book-form");
    // insert alert
    container.insertBefore(div, form);
    // timeout after 3s
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Event Listener - Add
document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  //   Instantiate UI
  const ui = new UI();
  // Validate
  if (title === "" || author === "" || isbn === "") {
    // alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Show success
    ui.showAlert("Book added", "success");

    // Clear Fields
    ui.clearFields();
  }

  e.preventDefault();
});
