// Selecting elements for the forgot password flow
const forgotPasswordLink = document.getElementById('forgotPassword');

// Event listener for when the user clicks "Forgot password?"
forgotPasswordLink.addEventListener('click', async () => {
  // Step 1: Ask for the email address
  const email = prompt('Enter your email linked to the account:');

  if (email) {
    try {
      // Step 2: Send request to the backend to get the reset token
      const response = await fetch('https://localhost:7131/api/Password/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        const data = await response.json();
        const resetToken = data.resetToken;

        // Step 2a: Show the token to the user
        alert('Here is your reset token: ' + resetToken);

        // Step 3: Ask for the token
        const token = prompt('Enter the token you received:');
        
        if (token === resetToken) {
          // Step 4: Ask for the new password and confirm password
          const newPassword = prompt('Enter your new password:');
          const confirmPassword = prompt('Confirm your new password:');
          
          // Step 5: Validate passwords and send to the backend
          if (newPassword && confirmPassword) {
            if (newPassword === confirmPassword) {
              // Send the reset request to the backend
              const resetResponse = await fetch(`https://localhost:7131/api/Password/reset-password/${resetToken}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  NewPassword: newPassword,
                  ConfirmPassword: confirmPassword
                })
              });

              if (resetResponse.ok) {
                alert('Password has been reset successfully!');
              } else {
                const errorData = await resetResponse.json();
                alert('Error resetting password: ' + errorData);
              }
            } else {
              alert('Passwords do not match!');
            }
          } else {
            alert('Please fill in both password fields.');
          }
        } else {
          alert('Invalid token. Please try again.');
        }
      } else {
        const errorData = await response.json();
        alert('Error: ' + errorData);
      }
    } catch (error) {
      console.error('Error during the forgot password process:', error);
      alert('An error occurred. Please try again later.');
    }
  } else {
    alert('Please enter a valid email.');
  }
});
