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

// Función para validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar contraseña
function validatePassword(password) {
    // Mínimo 6 caracteres
    return password.length >= 6;
}

// Función para validar nombre
function validateName(name) {
    // Mínimo 2 caracteres, solo letras y espacios
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
    return nameRegex.test(name);
}

// Función para mostrar mensaje de error
function showError(input, message) {
    // Remover mensaje de error anterior
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Crear nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 12px;
        margin-top: 5px;
        font-weight: 400;
    `;
    
    // Agregar borde rojo al input
    input.style.borderColor = '#dc3545';
    
    // Insertar mensaje después del input
    input.parentNode.appendChild(errorDiv);
}

// Función para limpiar error
function clearError(input) {
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    input.style.borderColor = '';
}

// Función para manejar el envío del formulario de login
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Limpiar errores anteriores
    clearError(document.getElementById('email'));
    clearError(document.getElementById('password'));
    
    let isValid = true;
    
    // Validar email
    if (!email) {
        showError(document.getElementById('email'), 'El correo es requerido');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(document.getElementById('email'), 'Ingresa un correo válido');
        isValid = false;
    }
    
    // Validar contraseña
    if (!password) {
        showError(document.getElementById('password'), 'La contraseña es requerida');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(document.getElementById('password'), 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    }
    
    // Si todo es válido, redirigir al dashboard
    if (isValid) {
        // Guardar datos del usuario (simulación)
        const userData = {
            email: email,
            name: email.split('@')[0], // Usar parte del email como nombre
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Mostrar mensaje de éxito
        showSuccessMessage('¡Inicio de sesión exitoso! Redirigiendo...');
        
        // Redirigir después de 1.5 segundos
        setTimeout(() => {
            window.location.href = 'Dashboard.html';
        }, 1500);
    }
}

// Función para manejar el envío del formulario de registro
function handleRegisterSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    
    // Limpiar errores anteriores
    clearError(document.getElementById('register-name'));
    clearError(document.getElementById('register-email'));
    clearError(document.getElementById('register-password'));
    
    let isValid = true;
    
    // Validar nombre
    if (!name) {
        showError(document.getElementById('register-name'), 'El nombre es requerido');
        isValid = false;
    } else if (!validateName(name)) {
        showError(document.getElementById('register-name'), 'El nombre debe tener al menos 2 caracteres y solo letras');
        isValid = false;
    }
    
    // Validar email
    if (!email) {
        showError(document.getElementById('register-email'), 'El correo es requerido');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(document.getElementById('register-email'), 'Ingresa un correo válido');
        isValid = false;
    }
    
    // Validar contraseña
    if (!password) {
        showError(document.getElementById('register-password'), 'La contraseña es requerida');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(document.getElementById('register-password'), 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    }
    
    // Si todo es válido, redirigir al dashboard
    if (isValid) {
        // Guardar datos del usuario (simulación)
        const userData = {
            name: name,
            email: email,
            registerTime: new Date().toISOString()
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Mostrar mensaje de éxito
        showSuccessMessage('¡Registro exitoso! Redirigiendo...');
        
        // Redirigir después de 1.5 segundos
        setTimeout(() => {
            window.location.href = 'Dashboard.html';
        }, 1500);
    }
}

// Función para mostrar mensaje de éxito
function showSuccessMessage(message) {
    // Crear elemento de mensaje de éxito
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successDiv);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el botón de registrarse
    const registerBtn = document.querySelector('.register-btn');
    
    // Obtener el botón de iniciar sesión
    const loginBtnWelcome = document.querySelector('.login-btn-welcome');
    
    // Obtener los formularios
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    
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
    
    // Agregar eventos de envío a los formularios
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
    
    // Agregar validación en tiempo real
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const value = this.value.trim();
            
            if (this.type === 'email' && value && !validateEmail(value)) {
                showError(this, 'Ingresa un correo válido');
            } else if (this.type === 'password' && value && !validatePassword(value)) {
                showError(this, 'La contraseña debe tener al menos 6 caracteres');
            } else if (this.type === 'text' && this.id === 'register-name' && value && !validateName(value)) {
                showError(this, 'El nombre debe tener al menos 2 caracteres y solo letras');
            } else {
                clearError(this);
            }
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
});
