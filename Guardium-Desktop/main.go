package main

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

func main() {
	myApp := app.New()
	window := myApp.NewWindow("SecureVPN")
	window.Resize(fyne.NewSize(400, 600))
	window.SetFixedSize(true) // Фиксируем размер

	// 1. Создаем кастомный заголовок
	title := widget.NewLabel("SecureVPN")
	title.TextStyle = fyne.TextStyle{Bold: true}

	closeBtn := widget.NewButtonWithIcon("", theme.CancelIcon(), func() {
		window.Close()
	})
	closeBtn.Importance = widget.LowImportance

	// 2. Используем layout.Spacer вместо NewSpacer
	header := container.NewBorder(
		nil, nil, nil, closeBtn,
		title,
	)

	// 3. Основной контент
	connectButton := widget.NewButtonWithIcon("Подключиться", theme.ConfirmIcon(), func() {
		println("[DEBUG] VPN подключение...")
	})
	connectButton.Importance = widget.HighImportance
	connectButton.Resize(fyne.NewSize(200, 50))

	// 4. Центральный блок
	centerContent := container.NewCenter(
		container.NewVBox(
			connectButton,
		),
	)

	// 5. Фон и финальная компоновка
	bg := canvas.NewRectangle(theme.BackgroundColor())
	content := container.NewMax(
		bg,
		container.NewBorder(
			header, nil, nil, nil,
			centerContent,
		),
	)

	// 6. Настройки темы
	myApp.Settings().SetTheme(theme.DarkTheme())
	window.SetContent(content)
	window.ShowAndRun()
}
