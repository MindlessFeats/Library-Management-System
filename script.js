console.log("JavaScript is working Here!");

function Book(name, type, author) {
  this.name = name;
  this.author = author;
  this.type = type;
}

function Display() {}

Display.prototype.add = function (book) {
  console.log("Adding to UI");
  let tableBody = document.getElementById("tableBody");
  let uiString = `
    <tr>
        <td>${book.name}</td>
        <td>${book.type}</td>
        <td>${book.author}</td>
    </tr>
  `;
  tableBody.innerHTML += uiString;
};

Display.prototype.clear = function () {
  const libraryForm = document.getElementById("myForm");
  libraryForm.reset();
};

const libraryFormSubmit = e => {
  e.preventDefault();
  console.log("you have submitted the form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;

  let fiction = document.getElementById("fiction");
  let nFiction = document.getElementById("nFiction");
  let programming = document.getElementById("programming");

  if (fiction.checked) {
    type = fiction.value;
  } else if (nFiction.checked) {
    type = nFiction.value;
  } else if (programming.checked) {
    type = programming.value;
  }

  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();
  display.add(book);
  display.clear();
};

const libraryForm = document.getElementById("myForm");
libraryForm.addEventListener("submit", libraryFormSubmit);
