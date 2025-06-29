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
    simulateDataLoading();
    
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