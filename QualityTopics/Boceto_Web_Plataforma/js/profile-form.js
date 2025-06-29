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

// Función para actualizar la barra de progreso
function updateProgress() {
    const form = document.getElementById('profileForm');
    const inputs = form.querySelectorAll('select, textarea');
    const progressFill = document.getElementById('progressFill');
    
    let filledCount = 0;
    inputs.forEach(input => {
        if (input.value.trim() !== '') {
            filledCount++;
        }
    });
    
    const progress = (filledCount / inputs.length) * 100;
    progressFill.style.width = progress + '%';
}

// Función para manejar el cambio en el nivel de educación
function handleEducationLevelChange() {
    const educationLevel = document.getElementById('education-level');
    const careerSelect = document.getElementById('careerSelect');
    
    if (educationLevel.value === 'universidad') {
        careerSelect.classList.add('show');
        // Hacer el campo de carrera requerido
        document.getElementById('career').required = true;
    } else {
        careerSelect.classList.remove('show');
        // Quitar el requerimiento del campo de carrera
        document.getElementById('career').required = false;
        document.getElementById('career').value = '';
    }
    
    updateProgress();
}

// Función para validar el formulario
function validateForm() {
    const educationLevel = document.getElementById('education-level');
    const objectives = document.getElementById('objectives');
    const studyTime = document.getElementById('study-time');
    const career = document.getElementById('career');
    
    let isValid = true;
    
    // Limpiar errores anteriores
    clearError(educationLevel);
    clearError(objectives);
    clearError(studyTime);
    clearError(career);
    
    // Validar nivel de educación
    if (!educationLevel.value) {
        showError(educationLevel, 'Por favor selecciona tu nivel de estudios');
        isValid = false;
    }
    
    // Validar carrera (solo si es universidad)
    if (educationLevel.value === 'universidad' && !career.value) {
        showError(career, 'Por favor selecciona tu carrera');
        isValid = false;
    }
    
    // Validar objetivos
    if (!objectives.value.trim()) {
        showError(objectives, 'Por favor describe tus objetivos de aprendizaje');
        isValid = false;
    } else if (objectives.value.trim().length < 20) {
        showError(objectives, 'Por favor describe tus objetivos con más detalle (mínimo 20 caracteres)');
        isValid = false;
    }
    
    // Validar tiempo de estudio
    if (!studyTime.value) {
        showError(studyTime, 'Por favor selecciona tu tiempo disponible');
        isValid = false;
    }
    
    return isValid;
}

// Función para manejar el envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Obtener los datos del formulario
    const formData = {
        educationLevel: document.getElementById('education-level').value,
        career: document.getElementById('education-level').value === 'universidad' ? document.getElementById('career').value : null,
        objectives: document.getElementById('objectives').value.trim(),
        studyTime: document.getElementById('study-time').value,
        profileCompleted: true,
        profileCompletedAt: new Date().toISOString()
    };
    
    // Obtener datos existentes del usuario
    const existingUserData = JSON.parse(localStorage.getItem('userData')) || {};
    
    // Combinar datos existentes con los nuevos datos del perfil
    const updatedUserData = {
        ...existingUserData,
        ...formData
    };
    
    // Guardar en localStorage
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    
    // Determinar si es creación o actualización
    const isUpdate = existingUserData.profileCompleted;
    
    // Mostrar mensaje apropiado
    if (isUpdate) {
        showSuccessMessage('¡Perfil actualizado exitosamente!');
    } else {
        showSuccessMessage('¡Perfil completado exitosamente!');
    }
    
    // Deshabilitar el botón para evitar múltiples envíos
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = isUpdate ? 'Actualizando...' : 'Redirigiendo...';
    
    // Redirigir al dashboard después de 2 segundos
    setTimeout(() => {
        window.location.href = 'Dashboard.html';
    }, 2000);
}

// Función para inicializar el formulario
function initializeForm() {
    // Obtener elementos del formulario
    const form = document.getElementById('profileForm');
    const educationLevel = document.getElementById('education-level');
    const inputs = form.querySelectorAll('select, textarea');
    
    // Agregar evento de cambio para el nivel de educación
    educationLevel.addEventListener('change', handleEducationLevelChange);
    
    // Agregar eventos para actualizar la barra de progreso
    inputs.forEach(input => {
        input.addEventListener('input', updateProgress);
        input.addEventListener('change', updateProgress);
        
        // Limpiar errores cuando el usuario empiece a escribir
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
    
    // Agregar evento de envío del formulario
    form.addEventListener('submit', handleFormSubmit);
    
    // Cargar datos existentes si el usuario ya completó su perfil
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    if (userData.profileCompleted) {
        // Cambiar el título y botón para indicar que es edición
        const headerTitle = document.querySelector('.profile-form-header h1');
        const submitBtn = document.getElementById('submitBtn');
        
        if (headerTitle) {
            headerTitle.textContent = 'Editar Mi Perfil';
        }
        
        if (submitBtn) {
            submitBtn.textContent = 'Actualizar Perfil';
        }
        
        // Cargar datos existentes en el formulario
        if (userData.educationLevel) {
            educationLevel.value = userData.educationLevel;
            handleEducationLevelChange(); // Esto mostrará/ocultará el campo de carrera
        }
        
        if (userData.career && userData.educationLevel === 'universidad') {
            document.getElementById('career').value = userData.career;
        }
        
        if (userData.objectives) {
            document.getElementById('objectives').value = userData.objectives;
        }
        
        if (userData.studyTime) {
            document.getElementById('study-time').value = userData.studyTime;
        }
        
        // Actualizar la barra de progreso
        updateProgress();
    }
    
    // Inicializar la barra de progreso
    updateProgress();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Formulario de perfil cargado');
    initializeForm();
}); 