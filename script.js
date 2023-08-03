console.log("JavaScript is working Here! With ES6");

const tableBody = document.getElementById("tableBody");
let books = []
tableBody.innerHTML = (books.length === 0) && "<span class='no-books'>No Books</span>";


class Book {
  constructor(bookId, name, type, author) {
    this.bookId = bookId;
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

class Display {

  deleteBook(id) {
    const index = books.findIndex(book => book.bookId === id);
    if (index !== -1) {
      books.splice(index, 1);
      this.updateTable();
      this.show("success", "Book has been deleted successfully!", "Success");
    } else {
      this.show("error", "Book not found. Unable to delete.", "Error");
    }
  }


  add(book) {
    // console.log("Adding to UI");
    let uiString = `
      <tr>
          <td>${book.id}</td>
          <td>${book.name}</td>
          <td>${book.type}</td>
          <td>${book.author}</td>
      </tr>
      `;

    tableBody.innerHTML += uiString;
  }

  clear() {
    const libraryForm = document.getElementById("myForm");
    libraryForm.reset();
  }

  validate(book) {
    return book.name.length >= 3 && book.author.length >= 2;
  }

  show(type, displayMessage, msgType) {
    swal({
      title: msgType,
      text: displayMessage,
      icon: type,
      button: "OK",
    });
  }

  updateTable() {
    // console.log("Updating table");
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Clear the table body

    books.forEach((book) => {
      let uiString = `
        <tr>
          <td>${book.bookId}</td>
          <td>${book.name}</td>
          <td>${book.type}</td>
          <td>${book.author}</td>
          <td><button id="editBook">Edit</button></td>
          <td><button id="deleteBook" onclick="deleteBookHandler(${book.bookId})">Delete</button></td>
        </tr>
      `;

      let emptyBooks = `
        <tr>
          <td>No Books Available</td>
        </tr>
      `;
      tableBody.innerHTML += uiString;
    });
  }
}

function deleteBookHandler(id) {
  const sure = window.confirm("Are you sure, you want to delete the selected book")
  const display = new Display();
  (sure) && display.deleteBook(id);
}

const libraryFormSubmit = (e) => {
  e.preventDefault();
  // console.log("you have submitted the form");
  const name = document.getElementById("bookName").value;
  const author = document.getElementById("author").value;
  let type;

  const fiction = document.getElementById("fiction");
  const NonFiction = document.getElementById("NonFiction");
  const programming = document.getElementById("programming");

  if (fiction.checked) {
    type = fiction.value.toUpperCase();
  } else if (NonFiction.checked) {
    type = NonFiction.id.toUpperCase();
  } else if (programming.checked) {
    type = programming.value.toUpperCase();
  }

  const book = new Book(Date.now(), name, type, author);
  books.push(book);


  const display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "Your book has been successfully saved!", "Success");
    display.updateTable(); // Call the updateTable method after adding a new book
  } else {
    display.show("error", "Sorry, Your book couldn't be saved", "Error");
  }
};



const libraryForm = document.getElementById("myForm");
libraryForm.addEventListener("submit", libraryFormSubmit);