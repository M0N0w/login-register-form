const signupForm = document.querySelector('.form.signup form');


if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get input values
    const fullName = signupForm.querySelector('input[placeholder="Enter your name"]').value;
    const email = signupForm.querySelector('input[placeholder="Enter your email"]').value;
    const password = signupForm.querySelector('input[placeholder="Enter a password"]').value;

    // Check for empty values and handle them
    if (!fullName || !email || !password) {
      alert('All fields are required!');
      return;
    }

    // Prepare the data matching your backend DTO
    const signupData = { FullName: fullName, Email: email, Password: password };

    try {
      const response = await fetch('https://localhost:7131/api/Auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const responseJson = await response.json();

      if (response.ok) {
        // Show success message
        alert('Signup successful!');

        // Switch to login form (hide signup and show login)
        container.classList.remove('active'); // Switch to login form view
      } else {
        // Show error message based on server response
        alert('Signup failed: ' + responseJson.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again later.');
    }
  });
}
