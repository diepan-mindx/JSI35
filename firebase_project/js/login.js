import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
// them app khai bao tu firebase config
import { app } from "../js/firebase_config.js";

// bat su kien submit cho form login -----------------------------------
document
  .getElementById("login_form")
  .addEventListener("submit", async function (e) {
    // chan luong xu ly mac dinh
    e.preventDefault();
    // lay du lieu tu input
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    // khai bao xac thuc
    const auth = getAuth(app);
    try {
      // login
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // lay thong tin nguoi dung
          const user = userCredential.user;
          // luu vao local storage
          localStorage.setItem("user", JSON.stringify(user));
          // trang chu
          location.href = "../index.html";
        }
      );
    } catch (err) {
      if ((err.code = "auth/user-not-found")) {
        // chua login (error) -> dang ki
        await createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // lay thong tin nguoi dung
            const user = userCredential.user;
            // luu vao local storage
            localStorage.setItem("user", JSON.stringify(user));
            // trang chu
            location.href = "../index.html";
          }
        );
      } else {
        // cac loi khac
        alert(err.message);
      }
    }
  });

// bat su kien cho gg login (provider) ----------------------------------
