// Obține elementele formularului și mesajului
const signupForm = document.getElementById('signup-form');
const message = document.getElementById('message');

// Adaugă un eveniment pentru trimiterea formularului
signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Obține valorile introduse în formular
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    // Trimite cererea POST pentru a crea un nou cont
    const response = await axios.post('http://localhost:3000/api/v1/auth/signup', {
      username,
      password
    });

    // Afișează mesaj de succes și redirecționează către sign-in
    message.textContent = 'Account created successfully! Redirecting to sign-in page...';
    setTimeout(() => {
      window.location.href = 'signin.html';
    }, 2000);
  } catch (error) {
    message.textContent = 'Error creating account. Please try again.';
  }
});
