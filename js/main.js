import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEP8YJgtElsZ0fSU1FFAcaZyWlkQYCUHw",
    authDomain: "fir-jsi02.firebaseapp.com",
    projectId: "fir-jsi02",
    storageBucket: "--redacted--",
    messagingSenderId: "156989085225",
    appId: "--redacted--"
};

const app = initializeApp(firebaseConfig);

let register_form = document.querySelector('.register-form-js');
if ( register_form ) {
    register_form.addEventListener('submit', (e)=>{
        e.preventDefault();

        let username = register_form.querySelector('.username-js').value.trim();
        let email = register_form.querySelector('.email-js').value.trim();
        let password = register_form.querySelector('.pass-js').value.trim();
        let re_password = register_form.querySelector('.repass-js').value.trim();

        let lower_case_letter = /[a-z]/g;
        let upper_case_letter = /[A-Z]/g;
        let numbers = /[0-9]/g;

        if (username.length < 6) {
            alert('Username must be at least 6 characters');
            return;
        } else if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        } else if (!password.match(lower_case_letter)) {
            alert('Password must contain a lowercase letter');
            return;
        } else if (!password.match(upper_case_letter)) {
            alert('Password must contain a uppercase letter');
            return;
        } else if (!password.match(numbers)) {
            alert('Password must contain a number');
            return;
        } else if (password !== re_password) {
            alert('Password is not confirmed correctly');
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert('Register successfully. You will be redirect to login page');
            location.href = './login.html';
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
    })
}


let login_form = document.querySelector('.login-form-js');
if ( login_form ) {
    login_form.addEventListener('submit', (e)=>{
        e.preventDefault();

        let login = login_form.querySelector('.login-js').value.trim();
        let password = login_form.querySelector('.pass-js').value.trim();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, login, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert('Login successfully');
            location.href = './index.html';
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
    })
}