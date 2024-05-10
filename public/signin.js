const signinForm = document.getElementById('signin-form');
const message = document.getElementById('message');

// Event listener for form submission
signinForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get form values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    // Send POST request to sign in
    const response = await axios.post('http://localhost:3000/api/v1/auth/signin', {
      username,
      password
    });

    // Extract JWT token from response
    const { token } = response.data;

    // Store token in localStorage
    localStorage.setItem('authToken', token);
    // Show success message and redirect
    message.textContent = 'Login successful! Redirecting...';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  } catch (error) {
    message.textContent = 'Error signing in. Please check your credentials.';
  }
});
