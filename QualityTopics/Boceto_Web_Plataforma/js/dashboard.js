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

    // Event listeners para navegación
    const navCourses = document.getElementById('nav-courses');
    if (navCourses) {
        navCourses.addEventListener('click', function(e) {
            e.preventDefault();
            hideAllSections();
            this.classList.add('active');
            showModulesSection();
        });
    }

    // Navegación de apuntes
    const navNotes = document.getElementById('nav-notes');
    if (navNotes) {
        navNotes.addEventListener('click', function(e) {
            e.preventDefault();
            hideAllSections();
            this.classList.add('active');
            showNotesSection();
        });
    }

    // Navegación de retos
    const navChallenges = document.getElementById('nav-challenges');
    if (navChallenges) {
        navChallenges.addEventListener('click', function(e) {
            e.preventDefault();
            hideAllSections();
            this.classList.add('active');
            showChallengesSection();
        });
    }

    // Navegación de comunidad
    const navCommunity = document.getElementById('nav-community');
    if (navCommunity) {
        navCommunity.addEventListener('click', function(e) {
            e.preventDefault();
            hideAllSections();
            this.classList.add('active');
            showCommunitySection();
        });
    }

    // Navegación de premium
    const navPremium = document.getElementById('nav-premium');
    if (navPremium) {
        navPremium.addEventListener('click', function(e) {
            e.preventDefault();
            hideAllSections();
            this.classList.add('active');
            showPremiumSection();
        });
    }

    // Event listener para el filtro de ranking
    const rankingFilter = document.getElementById('rankingFilter');
    if (rankingFilter) {
        rankingFilter.addEventListener('change', function() {
            loadRanking(this.value);
        });
        
        // Cargar ranking inicial
        loadRanking('global');
    }

    // Event listener para el botón de pago premium
    const upgradeBtn = document.querySelector('.plan-btn.upgrade');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function() {
            showPremiumPaymentModal();
        });
    }

    // Event listener para cerrar modal de chat al hacer clic fuera
    const chatModal = document.getElementById('chatModal');
    if (chatModal) {
        chatModal.addEventListener('click', function(e) {
            if (e.target === chatModal) {
                closeChatModal();
            }
        });
    }
    
    // Event listener para cerrar modal de notificaciones al hacer clic fuera
    const notificationsModal = document.getElementById('notificationsModal');
    if (notificationsModal) {
        notificationsModal.addEventListener('click', function(e) {
            if (e.target === notificationsModal) {
                closeNotificationsModal();
            }
        });
    }
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

// --- Apuntes ---
function showNotesSection() {
    // Ocultar secciones principales
    const welcomeSection = document.querySelector('.welcome-section');
    const statsGrid = document.querySelector('.stats-grid');
    const achievementsSection = document.querySelector('.achievements-grid').closest('.content-section');
    const modulesSection = document.querySelector('.modules-header').closest('.content-section');
    
    if (welcomeSection) welcomeSection.style.display = 'none';
    if (statsGrid) statsGrid.style.display = 'none';
    if (achievementsSection) achievementsSection.style.display = 'none';
    if (modulesSection) modulesSection.style.display = 'none';
    
    // Mostrar sección de apuntes
    const notesSection = document.getElementById('notesSection');
    if (notesSection) {
        notesSection.style.display = 'block';
        renderNotes();
    }
}

function getNotes() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const userKey = userData.email || 'default';
    const notes = JSON.parse(localStorage.getItem('notes_' + userKey)) || [];
    return notes;
}

function saveNotes(notes) {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const userKey = userData.email || 'default';
    localStorage.setItem('notes_' + userKey, JSON.stringify(notes));
}

function renderNotes() {
    const notesList = document.getElementById('notesList');
    const notes = getNotes();
    notesList.innerHTML = '';
    if (notes.length === 0) {
        notesList.innerHTML = '<p style="color:var(--azul-gris);text-align:center;">No tienes apuntes aún. ¡Agrega uno nuevo!</p>';
        return;
    }
    notes.forEach((note, idx) => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML = `
            <input class="note-title-input" value="${note.title || 'Sin título'}" placeholder="Título del apunte" onchange="updateNoteTitle(${idx}, this.value)">
            <textarea class="note-textarea" placeholder="Escribe tu apunte aquí..." onchange="updateNoteText(${idx}, this.value)">${note.text || ''}</textarea>
            <div class="note-actions">
                <button class="note-action-btn delete" onclick="deleteNote(${idx})">Eliminar</button>
                <button class="note-action-btn download" onclick="downloadNote(${idx})">Descargar</button>
            </div>
        `;
        notesList.appendChild(card);
    });
}

function addNote() {
    const notes = getNotes();
    notes.unshift({ title: '', text: '' });
    saveNotes(notes);
    renderNotes();
}

function updateNoteTitle(idx, value) {
    const notes = getNotes();
    notes[idx].title = value;
    saveNotes(notes);
}

function updateNoteText(idx, value) {
    const notes = getNotes();
    notes[idx].text = value;
    saveNotes(notes);
}

function deleteNote(idx) {
    if (!confirm('¿Eliminar este apunte?')) return;
    const notes = getNotes();
    notes.splice(idx, 1);
    saveNotes(notes);
    renderNotes();
}

function downloadNote(idx) {
    const notes = getNotes();
    const note = notes[idx];
    const blob = new Blob([
        (note.title ? note.title + '\n\n' : '') + (note.text || '')
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (note.title ? note.title.replace(/[^a-zA-Z0-9]/g, '_') : 'apunte') + '.txt';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Evento para mostrar apuntes al hacer clic en la barra lateral
document.getElementById('nav-notes').addEventListener('click', function(e) {
    e.preventDefault();
    // Quitar clase active de todos los nav-items
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    this.classList.add('active');
    showNotesSection();
});

// Evento para agregar nuevo apunte
document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('addNoteBtn');
    if (addBtn) {
        addBtn.addEventListener('click', addNote);
    }
});

// Mostrar la sección de inicio por defecto al cargar
function showDefaultSection() {
    // Mostrar la primera sección principal (bienvenida)
    document.querySelectorAll('.content-section').forEach((section, idx) => {
        section.style.display = idx === 0 ? 'block' : 'none';
    });
}
document.addEventListener('DOMContentLoaded', showDefaultSection);

// --- Cursos ---
function showCoursesSection() {
    // Ocultar todas las secciones principales
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    // Mostrar la sección de módulos/cursos
    const modulesSection = document.querySelector('.modules-header')?.closest('.content-section');
    if (modulesSection) {
        modulesSection.style.display = 'block';
    }
    // Renderizar módulos por si acaso
    if (typeof renderModules === 'function') {
        renderModules();
    }
}

document.getElementById('nav-courses').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    this.classList.add('active');
    showCoursesSection();
});

// --- Retos dinámicos por fecha ---
const retosPredefinidos = [
    {
        titulo: 'Resuelve un acertijo lógico.',
        descripcion: 'Reto: Resuelve un acertijo lógico.',
        upload: false
    },
    {
        titulo: 'Escribe un mini resumen de IA.',
        descripcion: 'Reto: Escribe un mini resumen de IA.',
        upload: false
    },
    {
        titulo: 'Sube un archivo con una idea de proyecto usando IA.',
        descripcion: 'Reto: Sube un archivo con una idea de proyecto usando IA.',
        upload: true
    },
    {
        titulo: 'Redacta 3 prompts útiles para tareas académicas.',
        descripcion: 'Reto: Redacta 3 prompts útiles para tareas académicas.',
        upload: false
    },
    {
        titulo: 'Crea un planificador de tareas semanales con IA.',
        descripcion: 'Reto: Crea un planificador de tareas semanales con IA.',
        upload: false
    }
];

function renderDynamicChallenges() {
    console.log("Renderizando retos...");
    const calendar = document.querySelector('.challenges-calendar');
    if (!calendar) {
        console.error('No se encontró el div .challenges-calendar');
        return;
    }
    calendar.innerHTML = '';
    // Obtener la fecha base (hoy)
    const today = new Date();
    // Calcular los índices de los retos para los días
    const retoIndexHoy = Math.floor(today.getTime() / (1000 * 60 * 60 * 24)) % retosPredefinidos.length;
    const retoIndexAyer = (retoIndexHoy - 1 + retosPredefinidos.length) % retosPredefinidos.length;
    const retoIndexAntier = (retoIndexHoy - 2 + retosPredefinidos.length) % retosPredefinidos.length;
    const retoIndexManana = (retoIndexHoy + 1) % retosPredefinidos.length;
    // Fechas legibles
    const fechaAntier = new Date(today); fechaAntier.setDate(today.getDate() - 2);
    const fechaAyer = new Date(today); fechaAyer.setDate(today.getDate() - 1);
    const fechaManana = new Date(today); fechaManana.setDate(today.getDate() + 1);
    // Día 1: Antier (cerrado)
    calendar.innerHTML += `
        <div class="challenge-day closed">
            <div class="challenge-date">${fechaAntier.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
            <div class="challenge-status"><span class="challenge-lock">🔒</span> Reto cerrado</div>
            <div class="challenge-desc">${retosPredefinidos[retoIndexAntier].descripcion}<br><span class="challenge-mini">(Ya no disponible)</span></div>
        </div>
    `;
    // Día 2: Ayer (cerrado)
    calendar.innerHTML += `
        <div class="challenge-day closed">
            <div class="challenge-date">${fechaAyer.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
            <div class="challenge-status"><span class="challenge-lock">🔒</span> Reto cerrado</div>
            <div class="challenge-desc">${retosPredefinidos[retoIndexAyer].descripcion}<br><span class="challenge-mini">(Ya no disponible)</span></div>
        </div>
    `;
    // Día 3: Hoy (abierto)
    const retoHoy = retosPredefinidos[retoIndexHoy];
    calendar.innerHTML += `
        <div class="challenge-day open">
            <div class="challenge-date">${today.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
            <div class="challenge-status"><span class="challenge-lock">🔓</span> Reto abierto</div>
            <div class="challenge-desc">
                <strong>Reto de hoy:</strong> <br>
                ${retoHoy.descripcion}<br>
                <span class="challenge-mini">(Solo visualización, no se almacena)</span>
                ${retoHoy.upload ? `<div class="challenge-upload"><label class="upload-label">Subir archivo:<input type="file" disabled style="opacity:0.5; cursor:not-allowed;"></label></div>` : ''}
                <button class="challenge-more-btn" onclick="openChallengeModal()">Ver más</button>
            </div>
        </div>
    `;
    // Día 4: Mañana (próximamente)
    const retoManana = retosPredefinidos[retoIndexManana];
    calendar.innerHTML += `
        <div class="challenge-day upcoming">
            <div class="challenge-date">${fechaManana.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
            <div class="challenge-status"><span class="challenge-lock">⏳</span> Próximamente</div>
            <div class="challenge-desc">
                <strong>Reto disponible en:</strong>
                <span id="challengeCountdown" class="challenge-countdown">07:00:00</span>
                <br><span class="challenge-mini">(El cronómetro se reinicia cada vez que inicias sesión o creas cuenta)</span>
                <br><strong>Próximo reto:</strong> ${retoManana.titulo}
            </div>
        </div>
    `;
}

// Modificar showChallengesSection para renderizar retos dinámicos
function showChallengesSection() {
    // Ocultar secciones principales
    const welcomeSection = document.querySelector('.welcome-section');
    const statsGrid = document.querySelector('.stats-grid');
    const achievementsSection = document.querySelector('.achievements-grid').closest('.content-section');
    const modulesSection = document.querySelector('.modules-header').closest('.content-section');
    
    if (welcomeSection) welcomeSection.style.display = 'none';
    if (statsGrid) statsGrid.style.display = 'none';
    if (achievementsSection) achievementsSection.style.display = 'none';
    if (modulesSection) modulesSection.style.display = 'none';
    
    // Mostrar sección de retos
    const challengesSection = document.getElementById('challengesSection');
    if (challengesSection) {
        challengesSection.style.display = 'block';
        renderDynamicChallenges();
        startChallengeCountdown();
    }
}

// Cronómetro ficticio de retos diarios (7 horas)
function getChallengeCountdownStart() {
    // Se guarda por usuario
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const userKey = userData.email || 'default';
    return localStorage.getItem('challengeCountdownStart_' + userKey);
}
function setChallengeCountdownStart() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const userKey = userData.email || 'default';
    localStorage.setItem('challengeCountdownStart_' + userKey, Date.now());
}
function startChallengeCountdown() {
    const countdownEl = document.getElementById('challengeCountdown');
    if (!countdownEl) return;
    // 7 horas en milisegundos
    const totalMs = 7 * 60 * 60 * 1000;
    let start = getChallengeCountdownStart();
    if (!start) {
        setChallengeCountdownStart();
        start = getChallengeCountdownStart();
    }
    function updateCountdown() {
        const now = Date.now();
        let diff = totalMs - (now - parseInt(start));
        if (diff < 0) diff = 0;
        const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
        const mins = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const secs = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
        countdownEl.textContent = `${hours}:${mins}:${secs}`;
    }
    updateCountdown();
    if (window.challengeCountdownInterval) clearInterval(window.challengeCountdownInterval);
    window.challengeCountdownInterval = setInterval(updateCountdown, 1000);
}
// Reiniciar cronómetro al iniciar sesión o crear cuenta
function resetChallengeCountdownOnLoginOrRegister() {
    setChallengeCountdownStart();
}
// Llama esta función desde el flujo de login y registro (ya que es visual, puedes llamarla en showDefaultSection)
document.addEventListener('DOMContentLoaded', resetChallengeCountdownOnLoginOrRegister);

document.getElementById('nav-challenges').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    this.classList.add('active');
    showChallengesSection();
});

// Modal visual para reto de hoy
window.openChallengeModal = function() {
    const modal = document.getElementById('challengeModal');
    if (modal) modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};
window.closeChallengeModal = function() {
    const modal = document.getElementById('challengeModal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('challengeModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeChallengeModal();
        });
    }
});

// Datos imaginarios para el ranking
const rankingData = {
    global: [
        { position: 1, name: "Carlos Rodríguez", email: "carlos.rodriguez@email.com", level: "Experto", points: 2840, modules: 8, achievements: ["🎓", "🚀", "⭐"], time: "156h", avatar: "CR" },
        { position: 2, name: "Ana García", email: "ana.garcia@email.com", level: "Avanzado", points: 2650, modules: 7, achievements: ["🎓", "🚀"], time: "142h", avatar: "AG" },
        { position: 3, name: "Luis Martínez", email: "luis.martinez@email.com", level: "Avanzado", points: 2480, modules: 7, achievements: ["🎓", "⭐"], time: "138h", avatar: "LM" },
        { position: 4, name: "María López", email: "maria.lopez@email.com", level: "Intermedio", points: 2150, modules: 6, achievements: ["🎓"], time: "125h", avatar: "ML" },
        { position: 5, name: "Diego Silva", email: "diego.silva@email.com", level: "Intermedio", points: 1980, modules: 5, achievements: ["🚀"], time: "112h", avatar: "DS" },
        { position: 6, name: "Sofia Torres", email: "sofia.torres@email.com", level: "Intermedio", points: 1820, modules: 5, achievements: ["🎯"], time: "98h", avatar: "ST" },
        { position: 7, name: "Javier Ruiz", email: "javier.ruiz@email.com", level: "Principiante", points: 1650, modules: 4, achievements: [], time: "87h", avatar: "JR" },
        { position: 8, name: "Carmen Vega", email: "carmen.vega@email.com", level: "Principiante", points: 1480, modules: 3, achievements: [], time: "76h", avatar: "CV" }
    ],
    friends: [
        { position: 1, name: "Ana García", email: "ana.garcia@email.com", level: "Avanzado", points: 2650, modules: 7, achievements: ["🎓", "🚀"], time: "142h", avatar: "AG", isFriend: true },
        { position: 2, name: "Luis Martínez", email: "luis.martinez@email.com", level: "Avanzado", points: 2480, modules: 7, achievements: ["🎓", "⭐"], time: "138h", avatar: "LM", isFriend: true },
        { position: 3, name: "María López", email: "maria.lopez@email.com", level: "Intermedio", points: 2150, modules: 6, achievements: ["🎓"], time: "125h", avatar: "ML", isFriend: true },
        { position: 4, name: "Diego Silva", email: "diego.silva@email.com", level: "Intermedio", points: 1980, modules: 5, achievements: ["🚀"], time: "112h", avatar: "DS", isFriend: true },
        { position: 5, name: "Sofia Torres", email: "sofia.torres@email.com", level: "Intermedio", points: 1820, modules: 5, achievements: ["🎯"], time: "98h", avatar: "ST", isFriend: true }
    ],
    university: [
        { position: 1, name: "Carlos Rodríguez", email: "carlos.rodriguez@email.com", level: "Experto", points: 2840, modules: 8, achievements: ["🎓", "🚀", "⭐"], time: "156h", avatar: "CR" },
        { position: 2, name: "Ana García", email: "ana.garcia@email.com", level: "Avanzado", points: 2650, modules: 7, achievements: ["🎓", "🚀"], time: "142h", avatar: "AG" },
        { position: 3, name: "Luis Martínez", email: "luis.martinez@email.com", level: "Avanzado", points: 2480, modules: 7, achievements: ["🎓", "⭐"], time: "138h", avatar: "LM" },
        { position: 4, name: "María López", email: "maria.lopez@email.com", level: "Intermedio", points: 2150, modules: 6, achievements: ["🎓"], time: "125h", avatar: "ML" },
        { position: 5, name: "Diego Silva", email: "diego.silva@email.com", level: "Intermedio", points: 1980, modules: 5, achievements: ["🚀"], time: "112h", avatar: "DS" }
    ],
    region: [
        { position: 1, name: "Ana García", email: "ana.garcia@email.com", level: "Avanzado", points: 2650, modules: 7, achievements: ["🎓", "🚀"], time: "142h", avatar: "AG" },
        { position: 2, name: "Luis Martínez", email: "luis.martinez@email.com", level: "Avanzado", points: 2480, modules: 7, achievements: ["🎓", "⭐"], time: "138h", avatar: "LM" },
        { position: 3, name: "María López", email: "maria.lopez@email.com", level: "Intermedio", points: 2150, modules: 6, achievements: ["🎓"], time: "125h", avatar: "ML" },
        { position: 4, name: "Diego Silva", email: "diego.silva@email.com", level: "Intermedio", points: 1980, modules: 5, achievements: ["🚀"], time: "112h", avatar: "DS" },
        { position: 5, name: "Sofia Torres", email: "sofia.torres@email.com", level: "Intermedio", points: 1820, modules: 5, achievements: ["🎯"], time: "98h", avatar: "ST" },
        { position: 6, name: "Javier Ruiz", email: "javier.ruiz@email.com", level: "Principiante", points: 1650, modules: 4, achievements: [], time: "87h", avatar: "JR" }
    ]
};

// Función para cargar el ranking
function loadRanking(filter = 'global') {
    const tableBody = document.getElementById('rankingTableBody');
    if (!tableBody) return;

    const data = rankingData[filter] || rankingData.global;
    
    tableBody.innerHTML = '';
    
    data.forEach(student => {
        const row = document.createElement('tr');
        
        // Clase especial para amigos
        if (student.isFriend) {
            row.classList.add('friend-row');
        }
        
        row.innerHTML = `
            <td class="ranking-position ${student.position <= 3 ? `top-${student.position}` : ''}">${student.position}</td>
            <td>
                <div class="ranking-student">
                    <div class="student-avatar">${student.avatar}</div>
                    <div class="student-info">
                        <div class="student-name">${student.name}</div>
                        <div class="student-email">${student.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <div class="ranking-level">
                    <span class="level-badge">${student.level}</span>
                </div>
            </td>
            <td class="ranking-points">${student.points.toLocaleString()}</td>
            <td class="ranking-modules">${student.modules}/10</td>
            <td>
                <div class="ranking-achievements">
                    ${student.achievements.map(achievement => 
                        `<span class="achievement-badge">${achievement}</span>`
                    ).join('')}
                </div>
            </td>
            <td class="ranking-time">${student.time}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Función para mostrar la sección de comunidad
function showCommunitySection() {
    // Ocultar secciones principales
    const welcomeSection = document.querySelector('.welcome-section');
    const statsGrid = document.querySelector('.stats-grid');
    const achievementsSection = document.querySelector('.achievements-grid').closest('.content-section');
    const modulesSection = document.querySelector('.modules-header').closest('.content-section');
    
    if (welcomeSection) welcomeSection.style.display = 'none';
    if (statsGrid) statsGrid.style.display = 'none';
    if (achievementsSection) achievementsSection.style.display = 'none';
    if (modulesSection) modulesSection.style.display = 'none';
    
    // Mostrar sección de comunidad
    const communitySection = document.getElementById('communitySection');
    if (communitySection) {
        communitySection.style.display = 'block';
        // Cargar el ranking cuando se muestre la sección
        loadRanking('global');
    }
}

// Función para mostrar la sección de premium
function showPremiumSection() {
    // Ocultar secciones principales
    const welcomeSection = document.querySelector('.welcome-section');
    const statsGrid = document.querySelector('.stats-grid');
    const achievementsSection = document.querySelector('.achievements-grid').closest('.content-section');
    const modulesSection = document.querySelector('.modules-header').closest('.content-section');
    
    if (welcomeSection) welcomeSection.style.display = 'none';
    if (statsGrid) statsGrid.style.display = 'none';
    if (achievementsSection) achievementsSection.style.display = 'none';
    if (modulesSection) modulesSection.style.display = 'none';
    
    // Mostrar sección de premium
    const premiumSection = document.getElementById('premiumSection');
    if (premiumSection) {
        premiumSection.style.display = 'block';
    }
}

// Event listener para el filtro de ranking
document.addEventListener('DOMContentLoaded', function() {
    const rankingFilter = document.getElementById('rankingFilter');
    if (rankingFilter) {
        rankingFilter.addEventListener('change', function() {
            loadRanking(this.value);
        });
        
        // Cargar ranking inicial
        loadRanking('global');
    }
});

// Función para ocultar todas las secciones
function hideAllSections() {
    // Remover clase active de todos los nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Ocultar todas las secciones
    const sections = [
        'notesSection',
        'challengesSection', 
        'communitySection',
        'premiumSection'
    ];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none';
        }
    });
    
    // Mostrar sección por defecto (inicio)
    showDefaultSection();
}

// Función para mostrar la sección por defecto
function showDefaultSection() {
    // Mostrar el contenido principal (stats, logros, módulos)
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        // Asegurar que las secciones principales estén visibles
        const welcomeSection = mainContent.querySelector('.welcome-section');
        const statsGrid = mainContent.querySelector('.stats-grid');
        const achievementsSection = mainContent.querySelector('.achievements-grid').closest('.content-section');
        const modulesSection = mainContent.querySelector('.modules-header').closest('.content-section');
        
        if (welcomeSection) welcomeSection.style.display = 'block';
        if (statsGrid) statsGrid.style.display = 'grid';
        if (achievementsSection) achievementsSection.style.display = 'block';
        if (modulesSection) modulesSection.style.display = 'block';
    }
    
    // Agregar clase active al nav item de inicio
    const navItems = document.querySelectorAll('.nav-item');
    navItems[0].classList.add('active');
}

// Función para mostrar modal de pago premium (solo visual)
function showPremiumPaymentModal() {
    // Crear modal de pago
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="payment-modal-content">
            <div class="payment-modal-header">
                <h3>💳 Pago Premium</h3>
                <button class="close-modal" onclick="closePaymentModal()">&times;</button>
            </div>
            <div class="payment-modal-body">
                <div class="payment-info">
                    <h4>Plan Premium - $200/mes</h4>
                    <p>Estás a punto de desbloquear todo el potencial de IAWAY Premium</p>
                </div>
                <div class="payment-form">
                    <div class="form-group">
                        <label>Número de Tarjeta</label>
                        <input type="text" placeholder="1234 5678 9012 3456" disabled>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Fecha de Vencimiento</label>
                            <input type="text" placeholder="MM/AA" disabled>
                        </div>
                        <div class="form-group">
                            <label>CVV</label>
                            <input type="text" placeholder="123" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Nombre en la Tarjeta</label>
                        <input type="text" placeholder="Nombre Apellido" disabled>
                    </div>
                </div>
                <div class="payment-note">
                    <p><em>💡 Esta es solo una demostración visual. No se procesarán pagos reales.</em></p>
                </div>
            </div>
            <div class="payment-modal-footer">
                <button class="cancel-btn" onclick="closePaymentModal()">Cancelar</button>
                <button class="pay-btn" onclick="processPayment()">Pagar $200/mes</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Mostrar modal con animación
    setTimeout(() => {
        modal.style.display = 'block';
    }, 10);
}

// Función para cerrar modal de pago
function closePaymentModal() {
    const modal = document.querySelector('.payment-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Función para procesar pago (solo visual)
function processPayment() {
    showNotification('¡Pago procesado exitosamente! Bienvenido a IAWAY Premium', 'success');
    closePaymentModal();
}

// Funciones para el chat
function openChatModal() {
    const modal = document.getElementById('chatModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Hacer scroll al final de los mensajes
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
}

function closeChatModal() {
    const modal = document.getElementById('chatModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Funciones para las notificaciones
function openNotificationsModal() {
    const modal = document.getElementById('notificationsModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeNotificationsModal() {
    const modal = document.getElementById('notificationsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function markAllNotificationsRead() {
    // Marcar todas las notificaciones como leídas (solo visual)
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    unreadNotifications.forEach(notification => {
        notification.classList.remove('unread');
        const status = notification.querySelector('.notification-status');
        if (status) {
            status.style.display = 'none';
        }
    });
    
    // Actualizar el contador de notificaciones
    const notificationsCount = document.querySelector('.notifications-count');
    if (notificationsCount) {
        notificationsCount.textContent = '0';
        notificationsCount.style.display = 'none';
    }
    
    // Mostrar notificación de confirmación
    showNotification('Todas las notificaciones han sido marcadas como leídas', 'success');
    
    // Cerrar el modal después de un breve delay
    setTimeout(() => {
        closeNotificationsModal();
    }, 1000);
} 