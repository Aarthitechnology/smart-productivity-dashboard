console.log("Signup.js loaded");

import { auth } from "./Firebase.js";

import {
    createUserWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {

        // Create Account
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        showToast("Account Created Successfully");

        // Firebase automatically logs in the user after signup
        // Sign out so that Login page appears
        await signOut(auth);

        setTimeout(() => {
            window.location.href = "Login.html";
        }, 2000);

    }
    catch (error) {
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