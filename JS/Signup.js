console.log("Signup.js loaded");
import { auth } from "./Firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
const toast = document.getElementById("toast");
const signupBtn = document.getElementById("signupBtn");
signupBtn.addEventListener("click",async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        await createUserWithEmailAndPassword(auth,email,password);
        showToast("Account Created Successfully");

        setTimeout(() => {
            window.location.href = "Login.html";
        }, 2000);
    }
    catch(error)
    {
        showToast(error.message);
    }
});
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}