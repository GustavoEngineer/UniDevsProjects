// Carga inicial de componentes visuales
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderHome } from './pages/home.js';

document.addEventListener('DOMContentLoaded', () => {
  renderHeader(document.getElementById('main-header'));
  renderFooter(document.getElementById('main-footer'));
  renderHome(document.getElementById('main-content'));
}); 