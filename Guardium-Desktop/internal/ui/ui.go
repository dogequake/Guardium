package ui

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

// ShowMainWindow создает главное окно приложения
func ShowMainWindow(app fyne.App) {
	// Создаем новое окно с заголовком
	window := app.NewWindow("Guardium VPN")
	window.Resize(fyne.NewSize(400, 600))
	window.SetFixedSize(true)

	// Создаем заголовок
	title := widget.NewLabel("Guardium")
	title.TextStyle = fyne.TextStyle{Bold: true}

	// Кнопка закрытия окна
	closeBtn := widget.NewButtonWithIcon("", theme.CancelIcon(), func() {
		window.Close()
	})
	closeBtn.Importance = widget.LowImportance

	// Верхняя панель с заголовком и кнопкой закрытия
	header := container.NewBorder(nil, nil, nil, closeBtn, title)

	// Кнопка подключения к VPN
	connectBtn := widget.NewButtonWithIcon("Подключиться", theme.ConfirmIcon(), func() {
		println("[DEBUG] Запрос на подключение VPN")
		// TODO: добавить вызов логики подключения WireGuard
	})
	connectBtn.Importance = widget.HighImportance

	// Центр окна с кнопкой
	center := container.NewCenter(
		container.NewVBox(connectBtn),
	)

	// Фон и финальная компоновка
	background := canvas.NewRectangle(theme.BackgroundColor())
	content := container.NewMax(
		background,
		container.NewBorder(header, nil, nil, nil, center),
	)

	// Применяем темную тему
	app.Settings().SetTheme(theme.DarkTheme())

	// Устанавливаем содержимое окна
	window.SetContent(content)

	// Показываем окно и запускаем главный цикл приложения
	window.ShowAndRun()
}
