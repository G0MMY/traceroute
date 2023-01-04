import * as L from 'leaflet';
import 'leaflet.markercluster';
import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { LocationNode, Node } from './MapPage';

interface Props {
    tracerouteResults: LocationNode[]
}

export default function MapNodesLayer({tracerouteResults}: Props) {
    const map = useMap();

    useEffect(() => {
        if (tracerouteResults.length > 0) {
            const markers: L.Marker[] = []

            tracerouteResults.forEach((traceroute) => {
                const marker = L.marker([traceroute.location.latitude, traceroute.location.longitude], {
                    icon: L.divIcon({
                        html: '<span class="dot" />'
                    })
                })

                map.addLayer(marker)
                markers.push(marker)
            })
    
            return () => {
                console.log(markers)
                markers.forEach((marker) => {
                    map.removeLayer(marker)
                })
            }
        }
    }, [map, tracerouteResults])

    return null
}