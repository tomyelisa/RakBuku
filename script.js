document.addEventListener("DOMContentLoaded", function() {
    const unfinishedList = document.getElementById("unfinishedList");
    const finishedList = document.getElementById("finishedList");
  
    let books = [];
  
    // Load books from localStorage
    if (localStorage.getItem("books")) {
      books = JSON.parse(localStorage.getItem("books"));
      renderBooks();
    }
  
    function renderBooks() {
      unfinishedList.innerHTML = "";
      finishedList.innerHTML = "";
  
      books.forEach(book => {
        const li = document.createElement("li");
        li.textContent = `${book.title} by ${book.author} (${book.year})`;
  
        const moveButton = document.createElement("button");
        moveButton.textContent = book.isComplete ? "Pindah ke Buku belum Selesai" : "Pindah ke Buku Sudah Selesai";
        moveButton.onclick = () => {
          book.isComplete = !book.isComplete;
          localStorage.setItem("books", JSON.stringify(books));
          renderBooks();
        };
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.onclick = () => {
          books = books.filter(b => b.id !== book.id);
          localStorage.setItem("books", JSON.stringify(books));
          renderBooks();
        };
  
        li.appendChild(moveButton);
        li.appendChild(deleteButton);
  
        if (book.isComplete) {
          finishedList.appendChild(li);
        } else {
          unfinishedList.appendChild(li);
        }
      });
    }
  
    document.getElementById("addBtn").addEventListener("click", function() {
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const year = document.getElementById("year").value;
      const isComplete = document.getElementById("isComplete").checked;
  
      if (title && author && year) {
        const book = {
          id: +new Date(),
          title,
          author,
          year: parseInt(year),
          isComplete
        };
  
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
  
        // Clear input fields
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("year").value = "";
        document.getElementById("isComplete").checked = false;
      } else {
        alert("Please fill in all fields.");
      }
    });
  });
  