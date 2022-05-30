// .name-addstudent__add
let addStudent = document.querySelector(".name-addstudent__add");
let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");

// logout
let logout = document.querySelector(".logout");

// model-btn__edit hidden

// table
let tb = document.querySelector(".tb");

// form fields

// inpt field
let Firstname = document.querySelector(".first_name");
let Lastname = document.querySelector(".last_name");
let email = document.querySelector(".email");
let address = document.querySelector(".address");
let Phonenumber = document.querySelector(".phone_number");
let Rollnumber = document.querySelector(".roll_number");
// btn
let postdata = document.querySelector(".model-btn__add");

let cancelForm = document.querySelector(".model-btn__cancel");
let modelbtnedit = document.querySelector(".model-btn__edit");

// modal field
const btnCloseModal = document.querySelector(".model-lbl-cross__cross");

let url = "http://localhost:3000/student";

function showModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

// checking edit

function editData() {
  showModal();
  modelbtnedit.classList.remove("hidden");
  postdata.classList.add("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

addStudent.addEventListener("click", () => {
  showModal();
  modelbtnedit.classList.add("hidden");
});
btnCloseModal.addEventListener("click", closeModal);

document.querySelector(".name-addstudent__username").innerHTML = JSON.parse(
  localStorage.getItem("activeUser")
).uname;

// api work
let output = "";
const renderPost = (post) => {
  post.forEach((element) => {
    output += `
                 <tr data-id=${element.id}>
                    <td class="td_firstname">${element.First_Name}</td>
                    <td class="td_lastname">${element.Last_Name}</td>
                    <td class="td_email">${element.Email}</td>
                    <td class="td_address">${element.Address}</td> 
                    <td class="td_phonenumber">${element.Phone_Number}</td> 
                    <td class="td_rollnumber">${element.Roll_number}</td> 
                    <td><button id="edit_data" onclick="editData()">edit</button>
                    <button id="delete_data">delete</button>
                    </td> 
                </tr> `;
  });

  tb.innerHTML = output;
};

window.onload = loadTasks;
function loadTasks(e) {
  e.preventDefault();
  fetch("http://localhost:3000/student")
    .then((response) => response.json())
    .then((data) => {
      renderPost(data);
    });
}

function postData(e) {
  e.preventDefault();

  fetch("http://localhost:3000/student", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      First_Name: Firstname.value,
      Last_Name: Lastname.value,
      Email: email.value,
      Address: address.value,
      Phone_Number: Phonenumber.value,
      Roll_number: Rollnumber.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const arr = [];
      arr.push(data);
      renderPost(arr);
    });
  document.querySelector("form").reset();
  closeModal();
}

postdata.addEventListener("click", postData);
cancelForm.addEventListener("click", function () {
  closeModal();
  document.querySelector("form").reset();
});

tb.addEventListener("click", (e) => {
  e.preventDefault();

  let editbtnIsPressed = e.target.id == "edit_data";
  let deletebtnIsPressed = e.target.id == "delete_data";

  let id = e.target.parentElement.parentElement.dataset.id;
  // delete row
  if (deletebtnIsPressed) {
    fetch(`${url}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => location.reload());
  }
  // edit row data
  if (editbtnIsPressed) {
    let parent = e.target.parentElement.parentElement;

    let fnameContent = parent.querySelector(".td_firstname").textContent;
    let lnameContent = parent.querySelector(".td_lastname").textContent;
    let emailContent = parent.querySelector(".td_email").textContent;
    let addressContent = parent.querySelector(".td_address").textContent;
    let pnumberContent = parent.querySelector(".td_phonenumber").textContent;
    let rnumberContent = parent.querySelector(".td_rollnumber").textContent;

    Firstname.value = fnameContent;
    Lastname.value = lnameContent;
    email.value = emailContent;
    address.value = addressContent;
    Phonenumber.value = pnumberContent;
    Rollnumber.value = rnumberContent;

    modelbtnedit.addEventListener("click", (e) => {
      e.preventDefault();

      fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          First_Name: Firstname.value,
          Last_Name: Lastname.valuel,
          Email: email.value,
          Address: address.value,
          Phone_Number: Phonenumber.value,
          Roll_number: Rollnumber.value,
        }),
      })
        .then((res) => res.json())
        .then(() => location.reload());
    });
  }
});
logout.addEventListener("click", () => {
  localStorage.removeItem("activeUser");

  window.location.href = "index.html";
});
