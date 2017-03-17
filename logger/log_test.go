package logger

import (
	"strings"
	"testing"
)

func TestFindCaller(t *testing.T) {
	testCaller := "github.com/Epsilon-Telemetry-Server/logger.TestFindCaller"
	caller := findCaller(2)
	if strings.Compare(caller, testCaller) != 0 {
		t.Errorf("findCaller should have returned\nThis:\t\t%s\nInstead: \t%s", testCaller, caller)
	}
}
