const forgotPasswordLink = document.getElementById('forgotPassword');

forgotPasswordLink.addEventListener('click', async () => {
  const email = await askForInput('Enter your email linked to the account:');

  if (email) {
    try {
      const response = await fetch('https://localhost:7131/api/Password/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('A reset token has been sent to your email.');
        const token = await askForInput('Enter the token you received:');
        const newPassword = await askForInput('Enter your new password:', true);
        const confirmPassword = await askForInput('Confirm your new password:', true);

        if (newPassword === confirmPassword) {
          const resetResponse = await fetch(`https://localhost:7131/api/Password/reset-password/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ NewPassword: newPassword, ConfirmPassword: confirmPassword }),
          });

          if (resetResponse.ok) {
            alert('Password has been reset successfully!');
          } else {
            alert('Failed to reset password. Please check your token and try again.');
          }
        } else {
          alert('Passwords do not match!');
        }
      } else {
        alert('Failed to send reset token. Please check your email and try again.');
      }
    } catch (error) {
      console.error('Error during the forgot password process:', error);
      alert('An error occurred. Please try again later.');
    }
  } else {
    alert('Please enter a valid email.');
  }
});

// Helper function for modal input
function askForInput(message, isPassword = false) {
  return new Promise((resolve) => {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('modal');

    const label = document.createElement('p');
    label.textContent = message;
    inputContainer.appendChild(label);

    const input = document.createElement('input');
    input.type = isPassword ? 'password' : 'text';
    input.classList.add('modal-input');
    inputContainer.appendChild(input);

    const button = document.createElement('button');
    button.textContent = 'Submit';
    button.classList.add('modal-button');
    inputContainer.appendChild(button);

    document.body.appendChild(inputContainer);

    button.addEventListener('click', () => {
      const value = input.value.trim();
      document.body.removeChild(inputContainer);
      resolve(value);
    });
  });
}
