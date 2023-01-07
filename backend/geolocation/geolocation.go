package geolocation

import (
	"os"
	"strings"

	"github.com/go-apilayer/ipstack"
)

type Location struct {
	City      string  `json:"city"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

func LocalizeAddress(address string) (*Location, error) {
	splitted := strings.Split(address, ".")
	if splitted[0] == "10" || splitted[0] == "192" {
		return nil, nil
	}

	key, err := getClientKey()
	if err != nil {
		return nil, err
	}

	client, err := ipstack.NewClient(key, false)
	if err != nil {
		return nil, err
	}

	stack, err := client.Lookup(address)
	if err != nil {
		return nil, err
	}

	return &Location{Latitude: stack.Latitude, Longitude: stack.Longitude, City: stack.City}, nil
}

func getClientKey() (string, error) {
	data, err := os.ReadFile("./secrets/ipStackClient")
	if err != nil {
		return "", err
	}

	return string(data), nil
}
