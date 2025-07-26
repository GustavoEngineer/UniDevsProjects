document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('loginError');

  if (username === 'admin' && password === 'admin123') {
    window.location.href = 'homePage.html';
  } else {
    errorDiv.textContent = 'Usuario o contraseña incorrectos';
    errorDiv.style.color = 'red';
  }
}); 