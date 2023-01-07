import { purple } from '@mui/material/colors';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import React, { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import { LocationNode, Node } from './MapPage';

interface Props {
    tracerouteResults: LocationNode[]
}

class NodeMarker extends L.Marker {
    id: number;

    constructor(latlng: L.LatLngExpression, id: number) {
        super(latlng);
        this.id = id
    }
}

const COLORS = [
    "#001219", "#005F73", "#0A9396", "#94D2BD", 
    "#E9D8A6", "#EE9B00", "#CA6702", "#BB3E03", 
    "#AE2012", "#9B2226","#F72585", "#B5179E", 
    "#7209B7", "#480CA8"
]

export const getColor = (index: number) => {
    return COLORS[index % (COLORS.length - 1)]
}

const getStyle = (id: number) => {
    return  `
        background-color: ${getColor(id)};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: transparent;
        width: 15px;
        height: 15px;
    `
}
 
const createClusterIcon = (childCount: number, markers: L.Marker[]) => {
    if (childCount > 1) {
        return L.divIcon({
            html: `<div>${childCount}</div>`,
            iconSize: L.point(30, 30, true),
            className: 'dot'
        });
    }

    const nodeMarkers = markers.map((marker) => marker as NodeMarker)

    return L.divIcon({
        iconSize: L.point(15, 15, true),
        className: 'smallDot',
        html: `<span style="${getStyle(nodeMarkers[0].id)}"/>`,
    });
}

export default function MapNodesLayer({tracerouteResults}: Props) {
    const map = useMap();

    useEffect(() => {
        if (tracerouteResults.length > 0) {
            const cluster = L.markerClusterGroup({
                singleMarkerMode: true,
                spiderfyOnMaxZoom: true,
                zoomToBoundsOnClick: true,
                iconCreateFunction: (cluster: L.MarkerCluster) => {
                    return createClusterIcon(cluster.getChildCount(), cluster.getAllChildMarkers())
                }
            })
            
            tracerouteResults.forEach((traceroute, i) => {
                new NodeMarker([traceroute.location.latitude, traceroute.location.longitude], i).addTo(cluster)
            })

            map.addLayer(cluster)
            map.fitBounds(cluster.getBounds())
    
            return () => {
                map.removeLayer(cluster)
            }
        } 
    }, [map, tracerouteResults])

    return null
}