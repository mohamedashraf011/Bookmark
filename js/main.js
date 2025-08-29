var bookNameInput = document.getElementById("bookName");
var bookURLInput = document.getElementById("bookURL");
var bookSearchInput = document.getElementById("searchInput");

var bookList = [];

if(localStorage.getItem('bookList') !=null){

    bookList = JSON.parse(localStorage.getItem('bookList'));

    displayBook();
}

function addBook(){
    if(validateName() && validateURL()){

        var urlValue = bookURLInput.value;

        if(!/^https?:\/\//i.test(urlValue)){
            urlValue = "https://" + urlValue;
        }

        var books = {
            name: bookNameInput.value,
            url: urlValue
        };
    
        bookList.push(books);
    
        localStorage.setItem('bookList' , JSON.stringify(bookList));
        
        displayBook();
        clearBook();

        Swal.fire({
            icon: 'success',
            title: 'Book Added Successfully',
        });
    }

    else{
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            html: `
                <ul style="text-align:left; margin:0; padding-left:20px;">
                    <li>Book name must contain at least <b>3 characters</b>.</li>
                    <li>Book URL must be valid (e.g., <b>example.com</b> or <b>https://example.com</b>).</li>
                </ul>
            `,
        });
    }

}


function displayBook(){

    var box = "";

    for(var i = 0 ; i < bookList.length ; i++){

        box+= `
            <tr>
                <td>${i+1}</td>
                <td>${bookList[i].name}</td>
                <td><a onclick="visitBook(${i})" href="${bookList[i].url}" target="_blank"
                        class="btn btn-visit btn-sm">
                        <i class="fa-regular fa-eye"></i>
                        Visit
                        </a></td>
                <td><button onclick="deleteBook(${i})" class="btn btn-delete btn-sm">
                <i class="fa-regular fa-trash-can"></i>
                Delete
                </button></td>
            </tr>
        
        `
    }

    document.getElementById("tableBody").innerHTML = box;

}


function clearBook() {
    bookNameInput.value = "";
    bookURLInput.value = "";
    bookNameInput.classList.remove('is-valid', 'is-invalid');
    bookURLInput.classList.remove('is-valid', 'is-invalid');

}

function searchBook(){
    var box = "";
    var searchTerm = bookSearchInput.value.toLowerCase();
    for(var i = 0 ; i < bookList.length ; i++){
        if(bookList[i].name.toLowerCase().includes(searchTerm)){
            box+= `
            <tr>
                <td>${i+1}</td>
                <td>${bookList[i].name}</td>
                <td><a onclick="visitBook(${i})" href="${bookList[i].url}" target="_blank"
                        class="btn btn-visit btn-sm">
                        <i class="fa-regular fa-eye"></i>
                        Visit
                        </a></td>
                <td><button onclick="deleteBook(${i})" class="btn btn-delete btn-sm">
                <i class="fa-regular fa-trash-can"></i>
                Delete
                </button></td>
            </tr>
        
            `
        }
    }
    document.getElementById("tableBody").innerHTML = box;

}


function deleteBook(index){
    bookList.splice(index , 1);
    localStorage.setItem('bookList' , JSON.stringify(bookList));
    displayBook();

}

function visitBook(index){
    window.open(bookList[index].url);

}

function validateName(){

    var nameRegex = /^[A-Za-z0-9_]{3,}(?:\s+[A-Za-z0-9_]+)*$/;

    if (nameRegex.test(bookNameInput.value)) {

        bookNameInput.classList.add('is-valid');
        bookNameInput.classList.remove('is-invalid');
        
        return true;
    }
    else{
        console.log("Msh tmam");
        bookNameInput.classList.add('is-invalid');
        bookNameInput.classList.remove('is-valid');

        return false;
    }
}


function validateURL() {

    var urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]{1,256}\.[a-zA-Z]{2,63}(\/[a-zA-Z0-9@:%_\+.~#?&//=]*)?$/;

    if (urlRegex.test(bookURLInput.value)) {

        bookURLInput.classList.add('is-valid');
        bookURLInput.classList.remove('is-invalid');

        return true;
    }
    else{

        bookURLInput.classList.add('is-invalid');
        bookURLInput.classList.remove('is-valid');

        return false;
    }
}