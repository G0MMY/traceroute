import React from "react"
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import MapNodesLayer from "./MapNodesLayer"
import { LocationNode, Node } from "./MapPage"

interface Props {
    tracerouteResults: LocationNode[]
}

export default function Map({tracerouteResults}: Props) {
    return (
        <MapContainer className="map" center={[47, 101]} zoom={2}>
            <TileLayer
                url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
            />
            <MapNodesLayer tracerouteResults={tracerouteResults}/>
        </MapContainer>
    )
}
