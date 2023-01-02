package main

import (
	"fmt"

	"github.com/G0MMY/traceroute/traceroute"
)

func main() {
	fmt.Println(traceroute.RunTraceroute("google.com", 33434, 1))
}
