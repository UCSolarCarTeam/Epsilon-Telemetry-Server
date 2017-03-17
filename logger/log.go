package logger

import (
	"fmt"
	"runtime"
	"time"

	"github.com/fatih/color"
)

//Stores the colors once
type logger struct {
	c map[string]*color.Color
}

var instance *logger

//Creates the Singleton Logger
func InitLogger() {
	//TODO Needs to accept a path to output the log to.
	//TODO Maybe accept a logging level on what to display. That way, someone
	//can run this on DEBUG mode and have all the DEBUG messages print out.
	instance = &logger{}
	instance.c = make(map[string]*color.Color)
	instance.c["cyan"] = color.New(color.FgCyan)
	instance.c["yellow"] = color.New(color.FgHiYellow)
}

//Returns an instance to the logger
func GetLogger() *logger {
	return instance
}

//A wrapper function for fmt.Printf. This function will
//Look for the caller of the Logf function and automatically
//print in the following format:
//<timestamp><caller><Message>
func (l *logger) Logf(format string, args ...interface{}) {
	//TODO Maybe accept logging levels/importance of the message
	t := time.Now()
	timeStamp := t.Format("2006-01-02 15:04:05.000")
	caller := findCaller()
	l.c["cyan"].PrintfFunc()("%s ", timeStamp)
	l.c["yellow"].PrintfFunc()("%s: ", caller)
	fmt.Printf(format, args...)
}

//A function that that looks at the callstack for the caller 2 above it
func findCaller() string {
	functionPointer := make([]uintptr, 1)
	n := runtime.Callers(3, functionPointer)
	if n == 0 {
		return "unknown function"
	}

	function := runtime.FuncForPC(functionPointer[0] - 1)
	if function == nil {
		return "unknown function"
	}
	return function.Name()
}
