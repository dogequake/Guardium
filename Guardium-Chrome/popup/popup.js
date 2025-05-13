// Когда DOM полностью загружен
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы интерфейса
    const hostInput = document.getElementById('host');
    const portInput = document.getElementById('port');
    const connectBtn = document.getElementById('connect');
    const disconnectBtn = document.getElementById('disconnect');
    const statusDiv = document.getElementById('status');
  
    // Загружаем сохранённые настройки при открытии popup
    chrome.storage.local.get('proxy', function(data) {
      if (data.proxy) {
        // Если настройки есть - заполняем поля
        hostInput.value = data.proxy.host;
        portInput.value = data.proxy.port;
        // Обновляем статус (подключено)
        updateStatus(true, data.proxy);
      }
    });
  
    // Обработчик клика на кнопку "Подключить"
    connectBtn.addEventListener('click', function() {
      // Получаем значения из полей ввода
      const host = hostInput.value.trim();
      const port = portInput.value.trim();
  
      // Проверяем, что поля заполнены
      if (!host || !port) {
        statusDiv.textContent = "Заполните все поля";
        statusDiv.className = "error";
        return; // Прерываем выполнение если не заполнено
      }
  
      // Отправляем сообщение в background.js для установки прокси
      chrome.runtime.sendMessage({
        action: "setProxy", // Тип действия
        proxy: { host, port } // Данные прокси
      });
    });
  
    // Обработчик клика на кнопку "Отключить"
    disconnectBtn.addEventListener('click', function() {
      // Отправляем сообщение в background.js для отключения
      chrome.runtime.sendMessage({ action: "disableProxy" });
      // Обновляем статус (отключено)
      updateStatus(false);
    });
  
    /**
     * Обновляет статус подключения в интерфейсе
     * @param {boolean} isConnected - Подключен ли прокси
     * @param {Object|null} proxy - Объект с настройками или null
     */
    function updateStatus(isConnected, proxy = null) {
      if (isConnected) {
        // Если подключено - показываем данные прокси
        statusDiv.textContent = `Подключено: ${proxy.host}:${proxy.port}`;
        statusDiv.className = "connected";
        // Блокируем/разблокируем кнопки
        connectBtn.disabled = true;
        disconnectBtn.disabled = false;
      } else {
        // Если отключено - сообщение
        statusDiv.textContent = "Прокси не подключен";
        statusDiv.className = "disconnected";
        // Блокируем/разблокируем кнопки
        connectBtn.disabled = false;
        disconnectBtn.disabled = true;
      }
    }
  
    // При загрузке проверяем текущий статус прокси
    chrome.runtime.sendMessage(
      { action: "getProxyStatus" }, // Запрос статуса
      function(response) { // Обработчик ответа
        if (response.proxy) {
          // Если прокси подключен - обновляем статус
          updateStatus(true, response.proxy);
        } else {
          // Если нет - показываем отключенное состояние
          updateStatus(false);
        }
      }
    );
  });