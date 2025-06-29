// Función para intercambiar los paneles
function swapPanels() {
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const loginContainer = document.querySelector('.login-container');
    const registerContainer = document.querySelector('.register-container');
    const welcomeMessage = document.querySelector('.welcome-message');
    const loginWelcomeMessage = document.querySelector('.login-welcome-message');
    
    // Agregar la clase swapped a ambos paneles
    leftPanel.classList.add('swapped');
    rightPanel.classList.add('swapped');
    
    // Cambiar el contenido después de la animación
    setTimeout(() => {
        // Ocultar el formulario de login
        loginContainer.classList.add('hidden');
        
        // Mostrar el formulario de registro
        registerContainer.classList.remove('hidden');
        registerContainer.classList.add('visible');
        
        // Ocultar el mensaje de bienvenida original
        welcomeMessage.classList.add('hidden');
        
        // Mostrar el mensaje de bienvenida para login
        loginWelcomeMessage.classList.remove('hidden');
    }, 250); // La mitad del tiempo de la animación (0.5s / 2 = 0.25s)
}

// Función para revertir los paneles
function revertPanels() {
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const loginContainer = document.querySelector('.login-container');
    const registerContainer = document.querySelector('.register-container');
    const welcomeMessage = document.querySelector('.welcome-message');
    const loginWelcomeMessage = document.querySelector('.login-welcome-message');
    
    // Quitar la clase swapped de ambos paneles
    leftPanel.classList.remove('swapped');
    rightPanel.classList.remove('swapped');
    
    // Cambiar el contenido después de la animación
    setTimeout(() => {
        // Mostrar el formulario de login
        loginContainer.classList.remove('hidden');
        
        // Ocultar el formulario de registro
        registerContainer.classList.remove('visible');
        registerContainer.classList.add('hidden');
        
        // Mostrar el mensaje de bienvenida original
        welcomeMessage.classList.remove('hidden');
        
        // Ocultar el mensaje de bienvenida para login
        loginWelcomeMessage.classList.add('hidden');
    }, 250); // La mitad del tiempo de la animación (0.5s / 2 = 0.25s)
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el botón de registrarse
    const registerBtn = document.querySelector('.register-btn');
    
    // Obtener el botón de iniciar sesión
    const loginBtnWelcome = document.querySelector('.login-btn-welcome');
    
    // Agregar el evento click al botón de registro
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir comportamiento por defecto
            swapPanels();
        });
    }
    
    // Agregar el evento click al botón de iniciar sesión
    if (loginBtnWelcome) {
        loginBtnWelcome.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir comportamiento por defecto
            revertPanels();
        });
    }
});
