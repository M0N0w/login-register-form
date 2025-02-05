// Select elements for login
const loginButton = document.querySelector(".login .button input");
const emailField = document.querySelector(".login .input-field input[type='text']");
const passwordField = document.querySelector(".login .input-field input[type='password']");

loginButton.addEventListener("click", async () => {
  const email = emailField.value;
  const password = passwordField.value;

  if (email && password) {
    try {
      const response = await fetch('https://localhost:7131/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Assuming the API returns the token in this format
        // Store the token in localStorage or sessionStorage
        localStorage.setItem('token', token);
        alert('Login successful!');
        // Redirect to another page or update the UI as needed
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  } else {
    alert('Please fill in both fields.');
  }
});
