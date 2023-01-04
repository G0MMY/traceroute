package geolocation

import (
	"strings"

	"github.com/go-apilayer/ipstack"
)

type Location struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

func LocalizeAddress(address string) (*Location, error) {
	splitted := strings.Split(address, ".")
	if splitted[0] == "10" || splitted[0] == "192" {
		return nil, nil
	}

	client, err := ipstack.NewClient("ce122b7b526ac43a2783ce615e7c1e0a", false)
	if err != nil {
		return nil, err
	}

	stack, err := client.Lookup(address)
	if err != nil {
		return nil, err
	}

	return &Location{Latitude: stack.Latitude, Longitude: stack.Longitude}, nil
}
