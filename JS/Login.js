import { auth } from "./Firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { auth } from "./Firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "index.html";
    }
});
const toast = document.getElementById("toast");
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click",async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try{
        await signInWithEmailAndPassword(auth,email,password);
        showToast("Login Successful");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);   
    }
    catch(error)
    {
        showToast(error.message);
    }
}) ;
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}