export function renderHeader(container) {
  container.innerHTML = `
    <nav class="header-nav shadow-soft bg-blanco rounded-2xl p-2 mx-auto max-w-screen-lg borde-artesanal" style="display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; margin-top: 1.5rem;">
      <div class="header-logo" style="font-family: 'DM Serif Display', serif; font-size: 2rem; color: var(--color-primario); letter-spacing: 2px;">RaizOn</div>
      <ul class="nav-menu" style="display: flex; gap: 2rem; list-style: none;">
        <li><a href="#" class="nav-link">Inicio</a></li>
        <li><a href="#" class="nav-link">Catálogo</a></li>
        <li><a href="#" class="nav-link">Artesanos</a></li>
        <li><a href="#" class="nav-link">Iniciar sesión</a></li>
        <li><a href="#" class="nav-link">Registrarse</a></li>
      </ul>
      <div class="header-icons" style="display: flex; gap: 1.2rem; align-items: center;">
        <span title="Carrito" style="font-size: 1.5rem; cursor: pointer;">🛒</span>
        <span title="Favoritos" style="font-size: 1.5rem; cursor: pointer;">❤️</span>
        <span title="Perfil" style="font-size: 1.5rem; cursor: pointer;">👤</span>
      </div>
    </nav>
  `;
} 