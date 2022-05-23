// signup fields
let firstName = document.querySelector(".firstname");
let lastname = document.querySelector(".lastname");
let phonenumber = document.querySelector(".phonenumber");
let username = document.querySelector(".username");
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let cpassword = document.querySelector(".confirmpassword");
let signup = document.querySelector(".btn__create-account");
let activationcode = document.querySelector(".activationcode");
let hidden = document.querySelector(".hidden");
let yes = document.getElementById("yes");
let no = document.getElementById("no");
let already__login = document.querySelector(".btn-login--already");

// login fields
let loginnumber = document.querySelector(".loginnumber");
let loginpassword = document.querySelector(".loginpassword");
let btn__login = document.querySelector(".btn__login");
let create__account = document.querySelector(".btn__create-account");
let forgetpass = document.querySelector(".forgetpass");

forgetpass?.addEventListener("click", () => {
  window.location.href = "signup.html";
});

create__account.addEventListener("click", () => {
  window.location.href = "signup.html";
});
already__login?.addEventListener("click", () => {
  window.location.href = "index.html";
});

let users = JSON.parse(localStorage.getItem("users")) || [];
// let users = [];

// click functions

// signup page function

function saveData(e) {
  let fFname = firstName.value;
  let lLname = lastname.value;
  let userpnumber = phonenumber.value;
  let uname = username.value;
  let useremail = email.value;
  let userpassword = password.value;
  let usercpassword = cpassword.value;
  let useractivationcode = activationcode.value;

  if (
    (isNaN(userpnumber) && password.length < 6) ||
    !uname ||
    !email ||
    !password ||
    !cpassword
  ) {
    alert("Please Fill All Required Fields");
    return false;
  } else {
    users.push({
      lLname: lLname,
      fFname: fFname,
      pnumber: userpnumber,
      uname: uname,
      email: useremail,
      password: userpassword,
      cpassword: usercpassword,
      activationcode: useractivationcode,
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("successfully sign up");
    // toast

    // var toastElList = [].slice.call(document.querySelectorAll(".toast"));
    // var toastList = toastElList.map(function (toastEl) {
    //   return new bootstrap.Toast(toastEl);
    // });

    // toastList.forEach((toast) => toast.show());
    document.querySelector("form").reset();
  }
  e.preventDefault();
}
function closefield() {
  if (no.checked) {
    // modal.classList.add("hidden");
    activationcode.style.display = "none";
  } else {
    activationcode.style.display = "block";
  }
}
function openfield(e) {
  // e.preventDefault();
  if (yes.checked) {
    // modal.classList.add("hidden");
    activationcode.style.display = "block";
  } else {
    activationcode.style.display = "none";
  }
}

// login page functions

function getData(e) {
  e.preventDefault();
  let users = JSON.parse(localStorage.getItem("users"));

  let activeUser = users.find((u) => u.pnumber === loginnumber.value);

  // console.log(activeUser.todos[0]);

  if (activeUser) {
    if (activeUser.password === loginpassword.value) {
      // alert("login"); //2
      localStorage.setItem("activeUser", JSON.stringify(activeUser)); //3
      setTimeout(function () {
        window.location.href = "dashboard.html";
      });
      document.querySelector("form").reset();
    } else {
      alert("Wrong email or password");
    }
  } else {
    alert("User deos not exist.");
  }
}

// click event
signup?.addEventListener("click", saveData);
no?.addEventListener("click", openfield);
yes?.addEventListener("click", openfield);
btn__login?.addEventListener("click", getData);
