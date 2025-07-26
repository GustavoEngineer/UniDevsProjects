export function renderHome(container) {
  container.innerHTML = `
    <section class="hero bg-primario rounded-2xl shadow-soft p-4 mx-auto max-w-screen-lg decoracion-mex text-center" style="margin-top: 2rem;">
      <h1 style="font-size: 2.5rem;">Conecta con lo hecho a mano en México</h1>
      <p style="font-size: 1.25rem; margin: 1rem 0 2rem 0;">Descubre productos únicos y apoya a los artesanos mexicanos.</p>
      <button class="rounded-2xl shadow-soft" style="font-size: 1.1rem; padding: 0.9rem 2.2rem;">Explorar productos</button>
    </section>
    <section class="destacados mx-auto max-w-screen-lg" style="margin-top: 3rem;">
      <h2 class="text-center" style="margin-bottom: 2rem;">Productos destacados</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem;">
        <div class="producto-card shadow-soft rounded-2xl p-2 bg-blanco borde-artesanal">
          <div style="height: 160px; background: var(--color-gris-claro); border-radius: 1rem; margin-bottom: 1rem;"></div>
          <h3>Jarra de barro</h3>
          <p style="color: var(--color-primario); font-weight: bold;">$350 MXN</p>
        </div>
        <div class="producto-card shadow-soft rounded-2xl p-2 bg-blanco borde-artesanal">
          <div style="height: 160px; background: var(--color-gris-claro); border-radius: 1rem; margin-bottom: 1rem;"></div>
          <h3>Hamaca yucateca</h3>
          <p style="color: var(--color-primario); font-weight: bold;">$1,200 MXN</p>
        </div>
        <div class="producto-card shadow-soft rounded-2xl p-2 bg-blanco borde-artesanal">
          <div style="height: 160px; background: var(--color-gris-claro); border-radius: 1rem; margin-bottom: 1rem;"></div>
          <h3>Sombrero de palma</h3>
          <p style="color: var(--color-primario); font-weight: bold;">$480 MXN</p>
        </div>
      </div>
    </section>
    <section class="artesanos mx-auto max-w-screen-lg" style="margin-top: 3rem;">
      <h2 class="text-center" style="margin-bottom: 2rem;">Conoce a nuestros artesanos</h2>
      <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
        <div class="artesano-card shadow-soft rounded-2xl p-2 bg-blanco borde-artesanal" style="min-width: 200px; max-width: 240px;">
          <div style="height: 80px; width: 80px; background: var(--color-verde-jade); border-radius: 50%; margin: 0 auto 1rem auto;"></div>
          <h3>María Uc</h3>
          <p style="color: var(--color-azul-profundo); font-size: 0.95rem;">Mérida, Yucatán</p>
        </div>
        <div class="artesano-card shadow-soft rounded-2xl p-2 bg-blanco borde-artesanal" style="min-width: 200px; max-width: 240px;">
          <div style="height: 80px; width: 80px; background: var(--color-verde-jade); border-radius: 50%; margin: 0 auto 1rem auto;"></div>
          <h3>Juan Canul</h3>
          <p style="color: var(--color-azul-profundo); font-size: 0.95rem;">Valladolid, Yucatán</p>
        </div>
        <div class="artesano-card shadow-soft rounded-2xl p-2 bg-blanco borde-artesanal" style="min-width: 200px; max-width: 240px;">
          <div style="height: 80px; width: 80px; background: var(--color-verde-jade); border-radius: 50%; margin: 0 auto 1rem auto;"></div>
          <h3>Lucía Pech</h3>
          <p style="color: var(--color-azul-profundo); font-size: 0.95rem;">Izamal, Yucatán</p>
        </div>
      </div>
    </section>
  `;
} 