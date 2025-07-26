export function renderFooter(container) {
  container.innerHTML = `
    <footer class="footer bg-crema shadow-soft rounded-2xl p-4 mx-auto max-w-screen-lg borde-artesanal" style="margin-top: 3rem;">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 2rem;">
        <div>
          <h3 style="font-family: 'DM Serif Display', serif; color: var(--color-primario);">RaizOn</h3>
          <p style="font-size: 1rem; color: var(--color-azul-profundo);">Conecta con lo hecho a mano en México</p>
        </div>
        <div>
          <h4>Enlaces rápidos</h4>
          <ul style="list-style: none; padding: 0;">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Catálogo</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul style="list-style: none; padding: 0;">
            <li><a href="#">Aviso de privacidad</a></li>
            <li><a href="#">Términos</a></li>
          </ul>
        </div>
        <div>
          <h4>Síguenos</h4>
          <div style="display: flex; gap: 1rem; font-size: 1.5rem;">
            <a href="#" title="Instagram">📸</a>
            <a href="#" title="Facebook">📘</a>
            <a href="#" title="Twitter">🐦</a>
          </div>
        </div>
      </div>
      <div style="text-align: center; margin-top: 2rem; color: var(--color-azul-profundo); font-size: 0.9rem;">
        © 2024 RaizOn. Todos los derechos reservados.
      </div>
    </footer>
  `;
} 