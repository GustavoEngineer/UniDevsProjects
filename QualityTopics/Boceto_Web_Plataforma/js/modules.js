// Datos de los módulos de IA
const modulesData = [
    {
        id: 1,
        icon: "🤖",
        title: "¿Qué es la Inteligencia Artificial?",
        number: "Módulo 1",
        description: "Comprender qué es la IA, sus orígenes y su presencia en la vida diaria.",
        objective: "Comprender qué es la IA, sus orígenes y su presencia en la vida diaria.",
        content: "Historia, tipos de IA, mitos y realidades.",
        activity: "Identificar y explicar 3 aplicaciones reales de IA.",
        duration: "2 horas",
        difficulty: "Básico",
        status: "not-started", // not-started, in-progress, completed
        progress: 0,
        timeSpent: 0,
        score: 0,
        lastActivity: null,
        history: []
    },
    {
        id: 2,
        icon: "🧠",
        title: "Pensamiento Computacional",
        number: "Módulo 2",
        description: "Desarrollar habilidades básicas para pensar como un sistema automatizado.",
        objective: "Desarrollar habilidades básicas para pensar como un sistema automatizado.",
        content: "Descomposición de problemas, algoritmos, lógica.",
        activity: "Resolver un reto de lógica paso a paso.",
        duration: "3 horas",
        difficulty: "Básico",
        status: "not-started",
        progress: 0,
        timeSpent: 0,
        score: 0,
        lastActivity: null,
        history: []
    },
    {
        id: 3,
        icon: "🛠️",
        title: "Herramientas IA del día a día",
        number: "Módulo 3",
        description: "Conocer plataformas accesibles como ChatGPT, Gemini, Copilot y Notion AI.",
        objective: "Conocer plataformas accesibles como ChatGPT, Gemini, Copilot y Notion AI.",
        content: "Introducción a asistentes, editores inteligentes y automatización básica.",
        activity: "Usar una herramienta para redactar una carta o resumen.",
        duration: "4 horas",
        difficulty: "Intermedio",
        status: "not-started",
        progress: 0,
        timeSpent: 0,
        score: 0,
        lastActivity: null,
        history: []
    },
    {
        id: 4,
        icon: "💬",
        title: "Prompt Engineering (Cómo hablar con la IA)",
        number: "Módulo 4",
        description: "Aprender a dar instrucciones claras y efectivas a los modelos de IA.",
        objective: "Aprender a dar instrucciones claras y efectivas a los modelos de IA.",
        content: "¿Qué es un prompt?, estructura, ejemplos buenos vs. malos.",
        activity: "Redactar 3 prompts útiles para tareas académicas.",
        duration: "3 horas",
        difficulty: "Intermedio",
        status: "not-started",
        progress: 0,
        timeSpent: 0,
        score: 0,
        lastActivity: null,
        history: []
    },
    {
        id: 5,
        icon: "⚖️",
        title: "Ética y uso responsable de la IA",
        number: "Módulo 5",
        description: "Reflexionar sobre los límites del uso de IA en lo académico y profesional.",
        objective: "Reflexionar sobre los límites del uso de IA en lo académico y profesional.",
        content: "Plagio, sesgos, privacidad, uso responsable.",
        activity: "Análisis de un caso real + checklist de uso ético.",
        duration: "2.5 horas",
        difficulty: "Intermedio",
        status: "not-started",
        progress: 0,
        timeSpent: 0,
        score: 0,
        lastActivity: null,
        history: []
    },
    {
        id: 6,
        icon: "📅",
        title: "Automatización de tareas académicas",
        number: "Módulo 6",
        description: "Aplicar la IA para mejorar la organización y eficiencia escolar.",
        objective: "Aplicar la IA para mejorar la organización y eficiencia escolar.",
        content: "Calendarios inteligentes, apps de organización con IA.",
        activity: "Crear un planificador de tareas semanales con IA.",
        duration: "3.5 horas",
        difficulty: "Intermedio",
        status: "not-started",
        progress: 0,
        timeSpent: 0,
        score: 0,
        lastActivity: null,
        history: []
    },
    {
        id: 7,
        icon: "✍️",
        title: "Redacción asistida con IA",
        number: "Módulo 7",
        description: "Utilizar herramientas para estructurar, corregir y enriquecer textos.",
        objective: "Utilizar herramientas para estructurar, corregir y enriquecer textos.",
        content: "Ideas principales, cohesión, estilo académico.",
        activity: "Escribir un párrafo académico con ayuda de IA.",
        duration: "4 horas",
        difficulty: "Intermedio",
        status: "not-started",
        progress: 0,
        timeSpent: 0,
        score: 0,
        lastActivity: null,
        history: []
    },
    {
        id: 8,
        icon: "📖",
        title: "Resumen y análisis de textos con IA",
        number: "Módulo 8",
        description: "Ahorrar tiempo y mejorar la comprensión de textos largos.",
        objective: "Ahorrar tiempo y mejorar la comprensión de textos largos.",
        content: "Lectura activa + resumen + análisis de puntos clave.",
        activity: "Cargar un texto y generar un resumen comentado.",
        duration: "3 horas",
        difficulty: "Intermedio",
        status: "not-started",
        progress: 0,
        timeSpent: 0,
        score: 0,
        lastActivity: null,
        history: []
    },
    {
        id: 9,
        icon: "🎨",
        title: "Creatividad + IA",
        number: "Módulo 9",
        description: "Explorar cómo la IA puede inspirar ideas creativas en diseño, escritura y arte.",
        objective: "Explorar cómo la IA puede inspirar ideas creativas en diseño, escritura y arte.",
        content: "Brainstorming, imágenes generadas, ideas visuales.",
        activity: "Crear una imagen o idea de proyecto con IA.",
        duration: "4.5 horas",
        difficulty: "Avanzado",
        status: "not-started",
        progress: 0,
        timeSpent: 0,
        score: 0,
        lastActivity: null,
        history: []
    },
    {
        id: 10,
        icon: "🚀",
        title: "Proyectos escolares potenciados con IA",
        number: "Módulo 10",
        description: "Integrar IA en presentaciones, investigaciones y productos finales.",
        objective: "Integrar IA en presentaciones, investigaciones y productos finales.",
        content: "Herramientas como Canva, Slides, editores de video IA.",
        activity: "Crear una presentación con apoyo de IA y defenderla.",
        duration: "5 horas",
        difficulty: "Avanzado",
        status: "not-started",
        progress: 0,
        timeSpent: 0,
        score: 0,
        lastActivity: null,
        history: []
    }
];

// Función para cargar datos de módulos desde localStorage
function loadModulesData() {
    const savedData = localStorage.getItem('modulesData');
    if (savedData) {
        return JSON.parse(savedData);
    }
    
    // Simular algunos datos de progreso para demostración
    const demoData = [...modulesData];
    
    // Simular progreso en algunos módulos
    demoData[0].status = "completed";
    demoData[0].progress = 100;
    demoData[0].timeSpent = 2.1;
    demoData[0].score = 95;
    demoData[0].lastActivity = new Date(Date.now() - 86400000).toISOString(); // 1 día atrás
    demoData[0].history = [
        { action: "Módulo completado", date: new Date(Date.now() - 86400000).toISOString(), score: 95 },
        { action: "Actividad práctica finalizada", date: new Date(Date.now() - 90000000).toISOString(), score: 90 },
        { action: "Módulo iniciado", date: new Date(Date.now() - 108000000).toISOString(), score: 0 }
    ];
    
    demoData[1].status = "in-progress";
    demoData[1].progress = 65;
    demoData[1].timeSpent = 1.8;
    demoData[1].score = 78;
    demoData[1].lastActivity = new Date(Date.now() - 3600000).toISOString(); // 1 hora atrás
    demoData[1].history = [
        { action: "Actividad práctica iniciada", date: new Date(Date.now() - 3600000).toISOString(), score: 78 },
        { action: "Contenido teórico completado", date: new Date(Date.now() - 7200000).toISOString(), score: 75 },
        { action: "Módulo iniciado", date: new Date(Date.now() - 86400000).toISOString(), score: 0 }
    ];
    
    demoData[2].status = "in-progress";
    demoData[2].progress = 25;
    demoData[2].timeSpent = 1.0;
    demoData[2].score = 45;
    demoData[2].lastActivity = new Date(Date.now() - 7200000).toISOString(); // 2 horas atrás
    demoData[2].history = [
        { action: "Primera herramienta explorada", date: new Date(Date.now() - 7200000).toISOString(), score: 45 },
        { action: "Módulo iniciado", date: new Date(Date.now() - 14400000).toISOString(), score: 0 }
    ];
    
    localStorage.setItem('modulesData', JSON.stringify(demoData));
    return demoData;
}

// Función para renderizar los módulos
function renderModules(modules = null) {
    const modulesGrid = document.getElementById('modulesGrid');
    const dataToRender = modules || loadModulesData();
    
    modulesGrid.innerHTML = '';
    
    dataToRender.forEach(module => {
        const moduleCard = createModuleCard(module);
        modulesGrid.appendChild(moduleCard);
    });
}

// Función para crear una tarjeta de módulo
function createModuleCard(module) {
    const card = document.createElement('div');
    card.className = `module-card ${module.status}`;
    card.dataset.moduleId = module.id;
    
    const statusText = {
        'not-started': 'No iniciado',
        'in-progress': 'En progreso',
        'completed': 'Completado'
    };
    
    const statusColor = {
        'not-started': '#6c757d',
        'in-progress': '#ffc107',
        'completed': '#28a745'
    };
    
    card.innerHTML = `
        <div class="module-header">
            <span class="module-icon">${module.icon}</span>
            <div class="module-info">
                <h4>${module.title}</h4>
                <span class="module-number">${module.number}</span>
            </div>
        </div>
        
        <div class="module-description">
            ${module.description}
        </div>
        
        <div class="module-progress">
            <div class="progress-header">
                <span class="progress-label">Progreso</span>
                <span class="progress-percentage">${module.progress}%</span>
            </div>
            <div class="progress-bar-module">
                <div class="progress-fill-module" style="width: ${module.progress}%"></div>
            </div>
        </div>
        
        <div class="module-meta">
            <span>⏱️ ${module.duration}</span>
            <span>📊 ${module.difficulty}</span>
            <span style="color: ${statusColor[module.status]}">● ${statusText[module.status]}</span>
        </div>
        
        <div class="module-actions">
            <button class="view-more-btn" onclick="openModuleModal(${module.id})">Ver más</button>
            ${module.status === 'not-started' ? 
                `<button class="start-module-btn-card" onclick="startModule(${module.id})">Comenzar</button>` :
                module.status === 'in-progress' ? 
                `<button class="start-module-btn-card" onclick="continueModule(${module.id})">Continuar</button>` :
                `<button class="start-module-btn-card" onclick="reviewModule(${module.id})">Repasar</button>`
            }
        </div>
    `;
    
    return card;
}

// Función para filtrar módulos
function filterModules() {
    const filterValue = document.getElementById('moduleFilter').value;
    const searchValue = document.getElementById('moduleSearch').value.toLowerCase();
    const modules = loadModulesData();
    
    let filteredModules = modules;
    
    // Aplicar filtro por estado
    if (filterValue !== 'all') {
        filteredModules = modules.filter(module => module.status === filterValue);
    }
    
    // Aplicar búsqueda por texto
    if (searchValue) {
        filteredModules = filteredModules.filter(module => 
            module.title.toLowerCase().includes(searchValue) ||
            module.description.toLowerCase().includes(searchValue) ||
            module.content.toLowerCase().includes(searchValue)
        );
    }
    
    renderModules(filteredModules);
}

// Función para abrir el modal de módulo
function openModuleModal(moduleId) {
    const modules = loadModulesData();
    const module = modules.find(m => m.id === moduleId);
    
    if (!module) return;
    
    // Llenar el modal con los datos del módulo
    document.getElementById('moduleModalIcon').textContent = module.icon;
    document.getElementById('moduleModalTitle').textContent = module.title;
    document.getElementById('moduleModalNumber').textContent = module.number;
    document.getElementById('moduleModalObjective').textContent = module.objective;
    document.getElementById('moduleModalContent').textContent = module.content;
    document.getElementById('moduleModalActivity').textContent = module.activity;
    
    // Actualizar progreso
    document.getElementById('moduleProgressFill').style.width = `${module.progress}%`;
    document.getElementById('moduleProgressPercentage').textContent = `${module.progress}%`;
    document.getElementById('moduleTimeSpent').textContent = `${module.timeSpent} horas`;
    document.getElementById('moduleScore').textContent = `${module.score}/100`;
    
    // Mostrar historial
    renderModuleHistory(module.history);
    
    // Configurar botones según el estado
    const startBtn = document.getElementById('startModuleBtn');
    const continueBtn = document.getElementById('continueModuleBtn');
    
    if (module.status === 'not-started') {
        startBtn.style.display = 'inline-block';
        continueBtn.style.display = 'none';
        startBtn.onclick = () => startModule(moduleId);
    } else if (module.status === 'in-progress') {
        startBtn.style.display = 'none';
        continueBtn.style.display = 'inline-block';
        continueBtn.onclick = () => continueModule(moduleId);
    } else {
        startBtn.style.display = 'none';
        continueBtn.style.display = 'inline-block';
        continueBtn.textContent = 'Repasar';
        continueBtn.onclick = () => reviewModule(moduleId);
    }
    
    // Mostrar el modal
    const modal = document.getElementById('moduleModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal de módulo
function closeModuleModal() {
    const modal = document.getElementById('moduleModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Función para renderizar el historial del módulo
function renderModuleHistory(history) {
    const timeline = document.getElementById('moduleActivityTimeline');
    timeline.innerHTML = '';
    
    if (history.length === 0) {
        timeline.innerHTML = '<p style="text-align: center; color: var(--azul-gris);">No hay actividad registrada</p>';
        return;
    }
    
    history.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const date = new Date(item.date);
        const formattedDate = date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        timelineItem.innerHTML = `
            <div class="timeline-icon">📝</div>
            <div class="timeline-content">
                <h4>${item.action}</h4>
                <p>${formattedDate} - Puntuación: ${item.score}/100</p>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Función para iniciar un módulo
function startModule(moduleId) {
    const modules = loadModulesData();
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    
    if (moduleIndex === -1) return;
    
    // Actualizar estado del módulo
    modules[moduleIndex].status = 'in-progress';
    modules[moduleIndex].progress = 10;
    modules[moduleIndex].lastActivity = new Date().toISOString();
    modules[moduleIndex].history.unshift({
        action: 'Módulo iniciado',
        date: new Date().toISOString(),
        score: 0
    });
    
    // Guardar cambios
    localStorage.setItem('modulesData', JSON.stringify(modules));
    
    // Mostrar notificación
    showNotification(`¡Módulo "${modules[moduleIndex].title}" iniciado!`, 'success');
    
    // Cerrar modal y actualizar vista
    closeModuleModal();
    renderModules();
    updateAchievements(); // Actualizar logros
    
    // Aquí podrías redirigir a la página del módulo
    console.log(`Iniciando módulo: ${modules[moduleIndex].title}`);
}

// Función para continuar un módulo
function continueModule(moduleId) {
    const modules = loadModulesData();
    const module = modules.find(m => m.id === moduleId);
    
    if (!module) return;
    
    showNotification(`Continuando con "${module.title}"`, 'info');
    closeModuleModal();
    updateAchievements(); // Actualizar logros
    
    // Aquí podrías redirigir a la página del módulo
    console.log(`Continuando módulo: ${module.title}`);
}

// Función para repasar un módulo
function reviewModule(moduleId) {
    const modules = loadModulesData();
    const module = modules.find(m => m.id === moduleId);
    
    if (!module) return;
    
    showNotification(`Repasando "${module.title}"`, 'info');
    closeModuleModal();
    
    // Aquí podrías redirigir a la página del módulo
    console.log(`Repasando módulo: ${module.title}`);
}

// Función para cerrar modal al hacer clic fuera
function handleModuleModalClick(e) {
    const modal = document.getElementById('moduleModal');
    if (e.target === modal) {
        closeModuleModal();
    }
}

// Inicializar módulos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar módulos
    renderModules();
    
    // Actualizar logros
    updateAchievements();
    
    // Agregar eventos de filtrado
    const filterSelect = document.getElementById('moduleFilter');
    const searchInput = document.getElementById('moduleSearch');
    
    if (filterSelect) {
        filterSelect.addEventListener('change', filterModules);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterModules);
    }
    
    // Agregar evento para cerrar modal al hacer clic fuera
    const modal = document.getElementById('moduleModal');
    if (modal) {
        modal.addEventListener('click', handleModuleModalClick);
    }
});

// Función para actualizar logros basándose en el progreso de módulos
function updateAchievements() {
    const modules = loadModulesData();
    
    // Calcular estadísticas
    const completedModules = modules.filter(m => m.status === 'completed').length;
    const inProgressModules = modules.filter(m => m.status === 'in-progress').length;
    const totalModules = modules.length;
    const overallProgress = Math.round((completedModules / totalModules) * 100);
    
    // Actualizar logros específicos
    updateSpecificAchievements(modules, completedModules, inProgressModules, overallProgress);
}

// Función para actualizar logros específicos
function updateSpecificAchievements(modules, completedModules, inProgressModules, overallProgress) {
    const achievements = document.querySelectorAll('.achievement-card');
    
    achievements.forEach(achievement => {
        const title = achievement.querySelector('h4').textContent;
        
        // Logro: Primer Módulo Completado
        if (title.includes('Primer Módulo Completado')) {
            if (completedModules >= 1) {
                achievement.className = 'achievement-card completed';
                const meta = achievement.querySelector('.achievement-meta');
                meta.innerHTML = `
                    <span>✅ Completado</span>
                    <span>95/100 puntos</span>
                `;
            }
        }
        
        // Logro: En Camino al Éxito
        else if (title.includes('En Camino al Éxito')) {
            if (inProgressModules > 0) {
                achievement.className = 'achievement-card in-progress';
                const meta = achievement.querySelector('.achievement-meta');
                meta.innerHTML = `
                    <span>🔄 En progreso</span>
                    <span>${inProgressModules} módulos activos</span>
                `;
            }
        }
        
        // Logro: Experto en IA
        else if (title.includes('Experto en IA')) {
            if (completedModules === totalModules) {
                achievement.className = 'achievement-card completed';
                const meta = achievement.querySelector('.achievement-meta');
                meta.innerHTML = `
                    <span>✅ Completado</span>
                    <span>${completedModules}/${totalModules} módulos</span>
                `;
            } else {
                achievement.className = 'achievement-card locked';
                const meta = achievement.querySelector('.achievement-meta');
                meta.innerHTML = `
                    <span>🔒 Bloqueado</span>
                    <span>${completedModules}/${totalModules} módulos</span>
                `;
            }
        }
        
        // Logro: Prompt Master
        else if (title.includes('Prompt Master')) {
            const promptModule = modules.find(m => m.title.includes('Prompt Engineering'));
            if (promptModule && promptModule.status === 'completed') {
                achievement.className = 'achievement-card completed';
                const meta = achievement.querySelector('.achievement-meta');
                meta.innerHTML = `
                    <span>✅ Completado</span>
                    <span>${promptModule.score}/100 puntos</span>
                `;
            }
        }
        
        // Logro: Ético Digital
        else if (title.includes('Ético Digital')) {
            const ethicsModule = modules.find(m => m.title.includes('Ética y uso responsable'));
            if (ethicsModule && ethicsModule.status === 'completed') {
                achievement.className = 'achievement-card completed';
                const meta = achievement.querySelector('.achievement-meta');
                meta.innerHTML = `
                    <span>✅ Completado</span>
                    <span>${ethicsModule.score}/100 puntos</span>
                `;
            }
        }
        
        // Logro: Creativo IA
        else if (title.includes('Creativo IA')) {
            const creativityModule = modules.find(m => m.title.includes('Creatividad + IA'));
            if (creativityModule && creativityModule.status === 'completed') {
                achievement.className = 'achievement-card completed';
                const meta = achievement.querySelector('.achievement-meta');
                meta.innerHTML = `
                    <span>✅ Completado</span>
                    <span>${creativityModule.score}/100 puntos</span>
                `;
            }
        }
    });
} 