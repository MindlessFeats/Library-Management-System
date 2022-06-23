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

Display.prototype.validate = function (book) {
  if (book.name.length < 3 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.show = function (type, displayMessage, msgType) {
  swal({
    title: msgType,
    text: displayMessage,
    icon: type,
    button: "OK",
  });
};

const libraryFormSubmit = e => {
  e.preventDefault();
  console.log("you have submitted the form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;

  let fiction = document.getElementById("fiction");
  let NonFiction = document.getElementById("NonFiction");
  let programming = document.getElementById("programming");

  if (fiction.checked) {
    type = fiction.value.toUpperCase();
  } else if (NonFiction.checked) {
    type = NonFiction.value.toUpperCase();
  } else if (programming.checked) {
    type = programming.value.toUpperCase();
  }

  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show(
      "success",
      "Your book has been successfully saved!",
      "Success"
    );
  } else {
    // Display error
    display.show("error", "Sorry, Your book couldn't be saved", "Error");
  }
};

const libraryForm = document.getElementById("myForm");
libraryForm.addEventListener("submit", libraryFormSubmit);
