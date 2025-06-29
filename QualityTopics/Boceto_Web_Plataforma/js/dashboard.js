// Función para cerrar sesión
function logout() {
    // Simular cierre de sesión
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Redirigir al login
        window.location.href = 'index.html';
    }
}

// Función para manejar la navegación del sidebar
function handleNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Agregar clase active al item clickeado
            this.classList.add('active');
            
            // Aquí puedes agregar lógica para cambiar el contenido
            const navText = this.querySelector('.nav-text').textContent;
            console.log('Navegando a:', navText);
        });
    });
}

// Función para manejar los botones de cursos
function handleCourseButtons() {
    const courseButtons = document.querySelectorAll('.course-btn');
    
    courseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('h4').textContent;
            
            alert(`¡Comenzando el curso: ${courseTitle}!`);
            // Aquí puedes agregar lógica para iniciar el curso
        });
    });
}

// Función para animar las estadísticas
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const isFraction = finalValue.includes('/');
        const isNumber = !isNaN(finalValue.replace(/[^\d]/g, ''));
        
        if (isNumber && !isPercentage && !isFraction) {
            // Animar números
            const target = parseInt(finalValue.replace(/[^\d]/g, ''));
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current).toLocaleString();
            }, 30);
        }
    });
}

// Función para manejar el responsive del sidebar
function handleResponsiveSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // En pantallas pequeñas, ocultar sidebar por defecto
    if (window.innerWidth <= 768) {
        sidebar.style.transform = 'translateX(-100%)';
        mainContent.style.marginLeft = '0';
    }
    
    // Agregar botón de toggle para móviles
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '☰';
    toggleBtn.className = 'sidebar-toggle';
    toggleBtn.style.cssText = `
        position: fixed;
        top: 80px;
        left: 10px;
        z-index: 1001;
        background: var(--azul-claro);
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        display: none;
    `;
    
    document.body.appendChild(toggleBtn);
    
    toggleBtn.addEventListener('click', () => {
        if (sidebar.style.transform === 'translateX(-100%)' || !sidebar.style.transform) {
            sidebar.style.transform = 'translateX(0)';
        } else {
            sidebar.style.transform = 'translateX(-100%)';
        }
    });
    
    // Mostrar botón en móviles
    if (window.innerWidth <= 768) {
        toggleBtn.style.display = 'block';
    }
    
    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            toggleBtn.style.display = 'block';
        } else {
            toggleBtn.style.display = 'none';
            sidebar.style.transform = 'translateX(0)';
            mainContent.style.marginLeft = '250px';
        }
    });
}

// Función para actualizar el nombre del usuario
function updateUserInfo() {
    // Obtener datos del usuario desde localStorage (si existen)
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const userName = userData.name || 'Usuario';
    const userEmail = userData.email || 'usuario@ejemplo.com';
    
    // Actualizar la información del usuario en el header
    const userNameElement = document.querySelector('.user-name');
    const userRoleElement = document.querySelector('.user-role');
    
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
    
    if (userRoleElement) {
        userRoleElement.textContent = userEmail;
    }
    
    // Mostrar mensaje de bienvenida personalizado en el dashboard
    const welcomeSection = document.querySelector('.welcome-section h2');
    if (welcomeSection && userData.name) {
        // Si es un usuario que se registró (tiene registerTime), mostrar mensaje de bienvenida
        if (userData.registerTime) {
            welcomeSection.textContent = `¡Bienvenido ${userName} a IAWAY!`;
        } else {
            // Si es un usuario que hizo login, mostrar mensaje de bienvenida de vuelta
            welcomeSection.textContent = `¡Bienvenido de nuevo ${userName} a IAWAY!`;
        }
    }
}

// Función para agregar efectos de hover a las cards
function addHoverEffects() {
    const cards = document.querySelectorAll('.stat-card, .course-card, .activity-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Función para simular carga de datos
function simulateDataLoading() {
    // Simular carga de datos del usuario
    setTimeout(() => {
        updateUserInfo();
        animateStats();
        
        // Mostrar notificación de bienvenida personalizada
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        const userName = userData.name || 'Usuario';
        
        if (userData.registerTime) {
            // Usuario nuevo (se registró)
            showNotification(`¡Bienvenido ${userName} a IAWAY!`, 'success');
        } else if (userData.loginTime) {
            // Usuario existente (hizo login)
            showNotification(`¡Bienvenido de nuevo ${userName} a IAWAY!`, 'success');
        }
    }, 500);
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard cargado correctamente');
    
    // Inicializar todas las funcionalidades
    handleNavigation();
    handleCourseButtons();
    handleResponsiveSidebar();
    addHoverEffects();
    addProfileClickEvent();
    simulateDataLoading();
    
    // Agregar evento para cerrar modal al hacer clic fuera
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.addEventListener('click', handleModalClick);
    }
    
    // Inicializar módulos
    if (typeof renderModules === 'function') {
        renderModules();
        
        // Agregar eventos de filtrado
        const filterSelect = document.getElementById('moduleFilter');
        const searchInput = document.getElementById('moduleSearch');
        
        if (filterSelect) {
            filterSelect.addEventListener('change', filterModules);
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', filterModules);
        }
        
        // Agregar evento para cerrar modal de módulo al hacer clic fuera
        const moduleModal = document.getElementById('moduleModal');
        if (moduleModal) {
            moduleModal.addEventListener('click', handleModuleModalClick);
        }
    }
    
    // Agregar efecto de carga inicial
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Función para abrir el modal de perfil
function openProfileModal() {
    const modal = document.getElementById('profileModal');
    modal.style.display = 'block';
    
    // Cargar datos del usuario en el modal
    loadProfileData();
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal de perfil
function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    modal.style.display = 'none';
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
}

// Función para cargar datos del perfil en el modal
function loadProfileData() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    
    // Mapear valores para mostrar en español
    const educationMap = {
        'secundaria': 'Secundaria',
        'preparatoria': 'Preparatoria',
        'universidad': 'Universidad'
    };
    
    const careerMap = {
        'arquitectura': 'Arquitectura',
        'ingenieria-civil': 'Ingeniería Civil',
        'ingenieria-industrial': 'Ingeniería Industrial',
        'ingenieria-sistemas': 'Ingeniería en Sistemas',
        'medicina': 'Medicina',
        'derecho': 'Derecho',
        'administracion': 'Administración',
        'contabilidad': 'Contabilidad',
        'psicologia': 'Psicología',
        'comunicacion': 'Comunicación',
        'otra': 'Otra'
    };
    
    const studyTimeMap = {
        '15-minutos': '15 minutos diarios',
        '20-minutos': '20 minutos diarios',
        '30-minutos': '30 minutos diarios',
        '1-hora': '+1 hora diaria'
    };
    
    // Actualizar elementos del modal
    document.getElementById('profileName').textContent = userData.name || 'No especificado';
    document.getElementById('profileEmail').textContent = userData.email || 'No especificado';
    document.getElementById('profileEducation').textContent = educationMap[userData.educationLevel] || 'No especificado';
    document.getElementById('profileObjectives').textContent = userData.objectives || 'No especificado';
    document.getElementById('profileStudyTime').textContent = studyTimeMap[userData.studyTime] || 'No especificado';
    
    // Manejar la carrera (solo mostrar si es universidad)
    const careerItem = document.getElementById('profileCareerItem');
    const careerSpan = document.getElementById('profileCareer');
    
    if (userData.educationLevel === 'universidad' && userData.career) {
        careerItem.style.display = 'block';
        careerSpan.textContent = careerMap[userData.career] || userData.career;
    } else {
        careerItem.style.display = 'none';
    }
    
    // Mostrar fecha de registro
    const memberSince = userData.registerTime || userData.loginTime;
    if (memberSince) {
        const date = new Date(memberSince);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        document.getElementById('profileMemberSince').textContent = date.toLocaleDateString('es-ES', options);
    } else {
        document.getElementById('profileMemberSince').textContent = 'No disponible';
    }
}

// Función para editar perfil
function editProfile() {
    // Por ahora, redirigir al formulario de perfil
    // En una implementación más avanzada, podrías abrir un modal de edición
    if (confirm('¿Deseas editar tu perfil? Serás redirigido al formulario de perfil.')) {
        window.location.href = 'profile-form.html';
    }
}

// Función para agregar evento de clic a la foto de perfil
function addProfileClickEvent() {
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) {
        userAvatar.style.cursor = 'pointer';
        userAvatar.addEventListener('click', openProfileModal);
        
        // Agregar tooltip
        userAvatar.title = 'Ver mi perfil';
    }
}

// Función para cerrar modal al hacer clic fuera
function handleModalClick(e) {
    const modal = document.getElementById('profileModal');
    if (e.target === modal) {
        closeProfileModal();
    }
}

// Funciones para manejar módulos (se cargan desde modules.js)
function handleModuleModalClick(e) {
    const modal = document.getElementById('moduleModal');
    if (e.target === modal) {
        closeModuleModal();
    }
} 