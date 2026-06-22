import { auth } from "./Firebase.js";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// If already logged in, go to dashboard
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "index.html";
    }
});

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        await signInWithEmailAndPassword(auth, email, password);

        showToast("Login Successful");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } catch (error) {
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