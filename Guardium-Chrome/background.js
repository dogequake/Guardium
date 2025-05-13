/**
 * Устанавливает прокси-настройки в браузере
 * @param {Object} proxyServer - Объект с host и port прокси
*/
async function setProxy(proxyServer) {
    // Конфигурация прокси в формате Chrome API
    const config = {
      mode: "fixed_servers", // Режим фиксированного сервера
      rules: {
        singleProxy: { // Настройки одного прокси-сервера
          scheme: "http", // Протокол (http/socks4/socks5)
          host: proxyServer.host, // Адрес сервера (например, 123.45.67.89)
          port: parseInt(proxyServer.port) // Порт (3128)
        },
        // Сайты, которые будут обходить прокси
        bypassList: ["localhost", "127.0.0.1"]
      }
    };
  
    try {
      // Применяем настройки прокси
      await chrome.proxy.settings.set({ value: config, scope: 'regular' });
      
      // Сохраняем настройки в локальное хранилище
      await chrome.storage.local.set({ proxy: proxyServer });
      
      // Показываем уведомление об успехе
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Proxy подключен',
        message: `Трафик идет через ${proxyServer.host}:${proxyServer.port}`
      });
    } catch (error) {
      console.error("Ошибка при установке прокси:", error);
    }
  }
  
  /**
   * Отключает прокси и возвращает прямые соединения
   */
  async function disableProxy() {
    try {
      // Сбрасываем настройки прокси
      await chrome.proxy.settings.clear({ scope: 'regular' });
      
      // Удаляем сохранённые настройки
      await chrome.storage.local.remove('proxy');
      
      // Уведомление об отключении
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Proxy отключен',
        message: 'Трафик идет напрямую'
      });
    } catch (error) {
      console.error("Ошибка при отключении прокси:", error);
    }
  }
  
  // Обработчик сообщений между частями расширения
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Если запрос на установку прокси
    if (request.action === "setProxy") {
      setProxy(request.proxy); // Вызываем функцию установки
      
    // Если запрос на отключение прокси
    } else if (request.action === "disableProxy") {
      disableProxy(); // Вызываем функцию отключения
      
    // Если запрос на получение текущего статуса
    } else if (request.action === "getProxyStatus") {
      // Получаем сохранённые настройки из хранилища
      chrome.storage.local.get('proxy', (data) => {
        // Отправляем ответ с текущими настройками или null
        sendResponse({ proxy: data.proxy || null });
      });
      return true; // Необходимо для асинхронного ответа
    }
  });