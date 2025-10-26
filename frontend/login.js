// const API_URL = 'http://localhost:3000/api';

// document.addEventListener('DOMContentLoaded', () => {

//     // --- LOGIC FOR THE REGISTRATION PAGE ---
//     const registerForm = document.getElementById('registerForm');
//     if (registerForm) {
//         registerForm.addEventListener('submit', async (event) => {
            
//             event.preventDefault(); 

//             const errorMessage = document.getElementById('error-message');
//             const formData = new FormData(registerForm);
//             const userData = Object.fromEntries(formData.entries());

//             try {
//                 const response = await fetch(`${API_URL}/auth/register`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(userData),
//                 });

//                 const result = await response.json();

//                 if (response.ok) {
                  
//                     alert('Registration successful! Please log in.');
//                     window.location.href = './login.html';
//                 } else {
                   
//                     errorMessage.textContent = result.message;
//                 }
//             } catch (error) {
           
//                 errorMessage.textContent = 'Cannot connect to server. Please try again later.';
//             }
//         });
//     }


//     // --- LOGIC FOR THE LOGIN PAGE ---
//     const loginForm = document.getElementById('loginForm');
//     if (loginForm) {
//         loginForm.addEventListener('submit', async (event) => {
            
//             event.preventDefault(); 

//             const message = document.getElementById('message');
//             const formData = new FormData(loginForm);
//             console.log(formData);
            
//             const loginData = Object.fromEntries(formData.entries());
//             console.log(loginData);
            

//             try {
//                 const response = await fetch(`${API_URL}/auth/login`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(loginData),
//                 });

//                 const result = await response.json();

//                 if (response.ok) {
                   
//                     localStorage.setItem('token', result.token);
//                     localStorage.setItem('user', JSON.stringify(result.user));
                    
//                     message.textContent = 'Login successful! Redirecting...';
//                     message.style.color = 'green';

//                     setTimeout(() => {
//                         window.location.href = './tester.html'; 
//                     }, 1000);

//                 } else {
                  
//                     message.textContent = result.message;
//                     message.style.color = 'red';
//                 }
//             } catch (error) {
               
//                 message.textContent = 'Cannot connect to server. Please try again later.';
//                 message.style.color = 'red';
//             }
//         });
//     }
//     // --- LOGIC FOR THE Logout PAGE ---
//     const logoutButton = document.getElementById('logoutButton');
//     if (logoutButton) {
//         logoutButton.addEventListener('click', () => {
            
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');

           
//             fetch(`${API_URL}/auth/logout`, { method: 'POST' })
//                 .catch(err => console.error('Logout failed on server', err));

//             alert('You have been logged out.');
//             window.location.href = './login.html';
//         });
//     }
// });


// main.js

const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIC FOR THE REGISTRATION PAGE ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 
            const formData = new FormData(registerForm);
            const userData = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(`${API_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                });
                const result = await response.json();

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful!',
                        text: 'You will now be redirected to the login page.',
                        timer: 3000, 
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = './login.html';
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.message || 'Something went wrong!',
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Connection Error',
                    text: 'Cannot connect to the server. Please try again later.',
                });
            }
        });
    }


    // --- LOGIC FOR THE LOGIN PAGE ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 
            const formData = new FormData(loginForm);
            const loginData = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginData),
                });
                const result = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('user', JSON.stringify(result.user));

                    Swal.fire({
                        icon: 'success',
                        title: 'Logged In Successfully!',
                        text: 'Redirecting you to the tester page...',
                        timer: 1500,
                        showConfirmButton: false,
                        allowOutsideClick: false
                    }).then(() => {
                        window.location.href = './tester.html'; 
                    });
                } else {
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: result.message,
                    });
                }
            } catch (error) {
                
                Swal.fire({
                    icon: 'error',
                    title: 'Connection Error',
                    text: 'Cannot connect to the server. Please try again later.',
                });
            }
        });
    }


    // --- LOGIC FOR THE LOGOUT BUTTON ---
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            Swal.fire({
                title: 'Are you sure you want to log out?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, log me out!'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');

                    fetch(`${API_URL}/auth/logout`, { method: 'POST' })
                        .catch(err => console.error('Logout failed on server', err));
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Logged Out!',
                        text: 'You have been successfully logged out.',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.href = './login.html';
                    });
                }
            });
        });
    }
});