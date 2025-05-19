package main

import (
	"embed"

	"Guardium-Desktop/internal/app"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Создаём экземпляр приложения
	appInstance := app.NewApp()

	// Запускаем Wails с опциями
	err := wails.Run(&options.App{
		Title:     "guardium",
		Width:     1024,
		Height:    768,
		Frameless: true,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        appInstance.Startup,
		Bind: []interface{}{
			appInstance, // биндим экземпляр, а не пакет
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
