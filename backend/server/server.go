package server

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Server struct {
	router *mux.Router
}

func CreateServer() *Server {
	router := mux.NewRouter()

	router.HandleFunc("/traceroute", LaunchTraceroute).Methods(http.MethodPost)

	return &Server{router: router}
}

func (s *Server) Run(port string) {
	log.Println("running on :" + port)
	http.ListenAndServe(":"+port, s.router)
}
