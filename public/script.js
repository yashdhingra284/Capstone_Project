// Initialize Firebase (only if not already initialized)
if (!firebase.apps.length) {
const firebaseConfig = {
  apiKey: "AIzaSyCvLu-B-49jOgU5N0ID6tpWZrhScGO13PQ",
  authDomain: "ydts-2058b.firebaseapp.com",
  projectId: "ydts-2058b",
  storageBucket: "ydts-2058b.firebasestorage.app",
  messagingSenderId: "869058319921",
  appId: "1:869058319921:web:a652bacac495040b5c2710",
  measurementId: "G-GVY872SBVT"
};
  
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

// LOGIN FORM
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(`Welcome back, ${user.email}`);
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// REGISTER FORM
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("Registration successful!");
        // Redirect to login page
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

function handleAccountExistsError(error, provider) {
  if (error.code === "auth/account-exists-with-different-credential") {
    const pendingCred = error.credential;
    const email = error.customData.email;

    // Fetch the existing sign-in providers linked with the email
    return auth.fetchSignInMethodsForEmail(email).then((methods) => {
      if (methods.includes("password")) {
        alert("An account already exists with this email. Please sign in with your email and password first.");
      } else if (methods.includes("google.com")) {
        alert("This email is already linked with Google. Please use Google sign-in.");
      } else if (methods.includes("facebook.com")) {
        alert("This email is already linked with Facebook. Please use Facebook sign-in.");
      } else if (methods.includes("github.com")) {
        alert("This email is already linked with GitHub. Please use GitHub sign-in.");
      } else {
        alert("An account already exists with different credentials. Please use the correct provider.");
      }
    });
  } else {
    alert(`Authentication failed: ${error.message}`);
  }
}

// 🔽 START: Handle "account already exists with different credential" properly for all providers

function handleAccountExistsError(error, provider) {
  if (error.code === "auth/account-exists-with-different-credential") {
    const pendingCred = error.credential;
    const email = error.customData?.email;

    // Ask Firebase which sign-in methods are linked to this email
    return auth.fetchSignInMethodsForEmail(email).then((methods) => {
      if (methods.includes("password")) {
        alert("This email is already registered with Email/Password. Please log in using your email and password.");
      } else if (methods.includes("google.com")) {
        alert("This email is already linked with Google. Please log in using Google.");
      } else if (methods.includes("facebook.com")) {
        alert("This email is already linked with Facebook. Please log in using Facebook.");
      } else if (methods.includes("github.com")) {
        alert("This email is already linked with GitHub. Please log in using GitHub.");
      } else {
        alert("This email is already linked with another provider. Please use the correct login option.");
      }
    });
  } else {
    alert(`Authentication failed: ${error.message}`);
  }
}

// Google Login
const googleBtn = document.getElementById("googleLogin");
if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => {
        alert(`Welcome ${result.user.displayName}!`);
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
        handleAccountExistsError(error, "google");
      });
  });
  
}

// Facebook Login
const fbBtn = document.getElementById("facebookLogin");
if (fbBtn) {
  fbBtn.addEventListener("click", () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithRedirect(provider)
      .then(() => auth.getRedirectResult())
      .then((result) => {
        if (result.user) alert(`Welcome ${result.user.displayName}!`);
      })
      .catch((error) => {
        console.error("Facebook Login Error:", error);
        handleAccountExistsError(error, "facebook");
      });
  });
}

// GitHub Login
const githubBtn = document.getElementById("githubLogin");
if (githubBtn) {
  githubBtn.addEventListener("click", () => {
    const provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        alert(`Welcome ${user.displayName || user.email}!`);
      })
      .catch((error) => {
        console.error("GitHub Login Error:", error);
        handleAccountExistsError(error, "github");
      });
  });
}

// 🔼 END: Account exists error handler

// GOOGLE LOGIN
// const googleBtn = document.getElementById("googleLogin");
// if (googleBtn) {
//   googleBtn.addEventListener("click", () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider)
//       .then((result) => {
//         alert(`Welcome ${result.user.displayName}!`);
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   });
// }

// // FACEBOOK LOGIN
// // const fbBtn = document.getElementById("facebookLogin");
// // if (fbBtn) {

// //   fbBtn.addEventListener("click", () => {
// //     const provider = new firebase.auth.FacebookAuthProvider();
// //     auth.signInWithPopup(provider)
// //       .then((result) => {
// //         alert(`Welcome ${result.user.displayName}!`);
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //         alert(error.message);
// //       });
// //   });
// // }

// // Alternative Facebook login with redirect
// const fbBtn = document.getElementById("facebookLogin");
// if (fbBtn) {
//   fbBtn.addEventListener("click", () => {
//     const provider = new firebase.auth.FacebookAuthProvider();
    
//     auth.signInWithRedirect(provider)
//       .then(() => {
//         // This will redirect to Facebook and back
//         return auth.getRedirectResult();
//       })
//       .then((result) => {
//         if (result.user) {
//           alert(`Welcome ${result.user.displayName}!`);
//         }
//       })
//       .catch((error) => {
//         console.error('Facebook redirect error:', error);
//         alert(`Authentication failed: ${error.message}`);
//       });
//   });
// }

// // GITHUB LOGIN
// const githubBtn = document.getElementById("githubLogin");
// if (githubBtn) {
//   githubBtn.addEventListener("click", () => {
//     const provider = new firebase.auth.GithubAuthProvider();

//     auth.signInWithPopup(provider)
//       .then((result) => {
//         const user = result.user;
//         alert(`Welcome ${user.displayName || user.email}!`);
//         console.log("GitHub user:", user);
//       })
//       .catch((error) => {
//         console.error("GitHub Login Error:", error);
//         alert(`Authentication failed: ${error.message}`);
//       });
//   });
// }


// Check for redirect result on page load
auth.getRedirectResult()
  .then((result) => {
    if (result.user) {
      alert(`Welcome ${result.user.displayName}!`);
    }
  })
  .catch((error) => {
    console.error('Redirect result error:', error);
  });