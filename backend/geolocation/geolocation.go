package geolocation

import (
	"fmt"

	"github.com/go-apilayer/ipstack"
)

func LocalizeAddresses(addresses []string) {
	var locations []*ipstack.Stack
	client, err := ipstack.NewClient("ce122b7b526ac43a2783ce615e7c1e0a", false)
	if err != nil {
		fmt.Println(err)
	}

	for _, address := range addresses {
		stack, err := client.Lookup(address)
		if err != nil {
			fmt.Println(err)
			return
		}

		locations = append(locations, stack)
	}

	for _, a := range locations {
		fmt.Println(*a)
	}
}
