package presenter

import (
	"fmt"
	"net/http"

	"github.com/Epsilon-Telemetry-Server/logger"
)

func ApiPresenter(w http.ResponseWriter, r *http.Request) {
	logger.InitLogger()
	log := logger.GetLogger()
	log.Logf("a GET was received on the APIPresenter\n")
	fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}
