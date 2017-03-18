package main

import (
	"net/http"

	"github.com/Epsilon-Telemetry-Server/logger"
	"github.com/Epsilon-Telemetry-Server/presenter"
)

func main() {
	http.HandleFunc("/api", presenter.ApiPresenter)

	logger.InitLogger()
	log := logger.GetLogger()
	log.Logf("The server is served on port %s\n", ":8080")

	//must be at the bottom
	http.ListenAndServe(":8080", nil)
}
