// panel.js

// Получаем все панели и кнопки
const panels = document.querySelectorAll('.panel');
const buttons = document.querySelectorAll('.bottom-nav button');

let currentPanelId = 'panel1'; // начальный id панели (укажи свою стартовую)

// Инициализация: показываем только стартовую панель
panels.forEach(panel => {
  panel.style.display = panel.id === currentPanelId ? 'block' : 'none';
});

// Функция переключения с анимацией
function switchPanel(nextPanelId) {
  if (nextPanelId === currentPanelId) return; // если та же панель - игнор
  
  const currentPanel = document.getElementById(currentPanelId);
  const nextPanel = document.getElementById(nextPanelId);
  
  if (!currentPanel || !nextPanel) return;
  
  // fade-out текущей панели
  currentPanel.classList.add('fade-out');
  
  currentPanel.addEventListener('animationend', function handler() {
    currentPanel.classList.remove('fade-out');
    currentPanel.style.display = 'none';
    
    // показываем новую панель
    nextPanel.style.display = 'block';
    nextPanel.classList.add('fade-in');
    
    nextPanel.addEventListener('animationend', function handler2() {
      nextPanel.classList.remove('fade-in');
      nextPanel.removeEventListener('animationend', handler2);
    });
    
    currentPanelId = nextPanelId; // обновляем текущую панель
    currentPanel.removeEventListener('animationend', handler);
  });
}

// Вешаем обработчики на кнопки
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const targetPanel = button.dataset.target; // id панели, которую нужно показать
    switchPanel(targetPanel);
  });
});
