package server

import (
	"encoding/json"
	"net/http"

	"github.com/G0MMY/traceroute/traceroute"
)

func LaunchTraceroute(w http.ResponseWriter, r *http.Request) {
	var body traceroute.Options

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&body); err != nil {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err.Error())
		return
	}

	defer r.Body.Close()

	traceroute, err := traceroute.RunTraceroute(body)
	if err != nil {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(traceroute)
}
