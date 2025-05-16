package app

import (
	"fyne.io/fyne/v2/app"
	"github.com/dogequake/guardium-desktop/internal/ui"
)

// Start инициализирует и запускает десктопное приложение
func Start() {
	// Создаем новое приложение Fyne
	myApp := app.New()

	// Показываем главное окно из пакета ui
	ui.ShowMainWindow(myApp)
}
