package traceroute

import (
	"errors"
	"fmt"
	"log"
	"net"
	"syscall"
	"time"

	"github.com/G0MMY/traceroute/geolocation"
)

type Traceroute struct {
	Results []Node
	Total   int
}

type Node struct {
	Address  string
	Domains  []string
	Delay    time.Duration
	Location *geolocation.Location
}

type Options struct {
	Address string `json:"address"`
	Ttl     int    `json:"ttl"`
}

const PORT = 33434

func getLocalAddress() ([4]byte, error) {
	interfaces, err := net.InterfaceAddrs()
	if err != nil {
		return [4]byte{}, err
	}

	for _, i := range interfaces {
		if ipnet, ok := i.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if len(ipnet.IP.To4()) == net.IPv4len {
				var addr [4]byte
				copy(addr[:], ipnet.IP.To4())
				return addr, nil
			}
		}
	}

	return [4]byte{}, errors.New("unable to get a local address")
}

func createInet4Address(address string, port int) (*syscall.SockaddrInet4, [4]byte, error) {
	addrs, err := net.LookupHost(address)
	if err != nil {
		return nil, [4]byte{}, err
	}

	if len(addrs) < 1 {
		return nil, [4]byte{}, err
	}

	resolvedIp, err := net.ResolveIPAddr("ip", addrs[0])
	if err != nil {
		return nil, [4]byte{}, err
	}

	var addr [4]byte
	copy(addr[:], resolvedIp.IP.To4())

	return &syscall.SockaddrInet4{Port: port, Addr: addr}, addr, nil
}

func createLocalInetAddress(port int) (*syscall.SockaddrInet4, error) {
	addr, err := getLocalAddress()
	if err != nil {
		return nil, err
	}

	return &syscall.SockaddrInet4{Port: port, Addr: addr}, nil
}

func RunTraceroute(options Options) (*Traceroute, error) {
	var results []Node

	sendSocket, err := syscall.Socket(syscall.AF_INET, syscall.SOCK_DGRAM, 0)
	if err != nil {
		return nil, err
	}

	receiveSocket, err := syscall.Socket(syscall.AF_INET, syscall.SOCK_RAW, syscall.IPPROTO_ICMP)
	if err != nil {
		return nil, err
	}

	timeval := syscall.NsecToTimeval(1000 * 1000 * 10000)
	syscall.SetsockoptTimeval(receiveSocket, syscall.SOL_SOCKET, syscall.SO_RCVTIMEO, &timeval)

	defer syscall.Close(receiveSocket)
	defer syscall.Close(sendSocket)

	localInet4, err := createLocalInetAddress(PORT)
	if err != nil {
		return nil, err
	}

	syscall.Bind(receiveSocket, localInet4)

	for {
		var node Node

		syscall.SetsockoptInt(sendSocket, 0x0, syscall.IP_TTL, options.Ttl)

		inet4Addr, receiverAddress, err := createInet4Address(options.Address, PORT)
		if err != nil {
			return nil, err
		}

		startTime := time.Now()
		syscall.Sendto(sendSocket, []byte{}, 0, inet4Addr)

		var packet = make([]byte, 52)
		_, from, err := syscall.Recvfrom(receiveSocket, packet, 0)
		if err != nil {
			return nil, err
		}
		node.Delay = time.Now().Sub(startTime)

		receivedAddress := from.(*syscall.SockaddrInet4).Addr
		formattedAddr := fmt.Sprintf("%v.%v.%v.%v", receivedAddress[0], receivedAddress[1], receivedAddress[2], receivedAddress[3])

		node.Address = formattedAddr

		// location, err := geolocation.LocalizeAddress(formattedAddr)
		// if err != nil {
		// 	log.Println(err)
		// } else {
		// 	node.Location = location
		// }

		domains, err := net.LookupAddr(formattedAddr)
		if err != nil {
			log.Println(err)
		} else {
			node.Domains = domains
		}

		results = append(results, node)
		options.Ttl++

		if receivedAddress == receiverAddress {
			break
		}
	}

	return &Traceroute{Results: results, Total: len(results)}, nil
}
