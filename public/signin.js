// Obține elementele formularului și mesajului
const signinForm = document.getElementById('signin-form');
const message = document.getElementById('message');

// Adaugă un eveniment pentru trimiterea formularului
signinForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Obține valorile introduse în formular
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    // Trimite cererea POST pentru a te autentifica
    const response = await axios.post('http://localhost:3000/api/v1/auth/signin', {
      username,
      password
    });

    // Obține token-ul JWT
    const { token } = response.data;

    // Stochează token-ul în LocalStorage sau Cookie pentru cereri ulterioare
    localStorage.setItem('authToken', token);

    // Afișează mesaj de succes și redirecționează către pagina principală
    message.textContent = 'Login successful! Redirecting...';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  } catch (error) {
    message.textContent = 'Error signing in. Please check your credentials.';
  }
});
