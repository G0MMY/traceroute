package main

import (
	"github.com/G0MMY/traceroute/server"
)

func main() {
	server := server.CreateServer()

	server.Run("8080")
}
