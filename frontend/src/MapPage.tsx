import React, { useMemo, useState } from "react"
import internal from "stream"
import Map from "./MapContainer"
import NodeTimeline from "./NodeTimeline"
import SearchBar from "./SearchBar"

export interface Location {
    longitude: number
    latitude: number
    city: string
}

export interface Node {
    address: string
    domains: string[] | null
    delay: number
    location: Location | null
}

export interface LocationNode {
    address: string
    domains: string[] | null
    delay: number
    location: Location
}

export default function MapPage() {
    const [search, setSearch] = useState("");
    const [nodes, setNodes] = useState<Node[]>([]);
    const [error, setError] = useState(false);
    const [progress, setProgress] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }

    const handleSearchClick = () => {
        setProgress(true)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                ttl: 1,
                address: search,
                maxHops: 30
            })
        };

        fetch('/traceroute', requestOptions).then((resp) => {
            if (resp.ok) {
                return resp.json()
            }
            setError(true)
        }).then((data) => {
            setProgress(false)
            if (data !== undefined) {
                setError(false)
                setNodes(data.results)
            }
        })
    }

    const tracerouteResults = useMemo(() => {
        const results: LocationNode[] = []

        nodes.forEach((node) => {
            if (node.location !== null) {
                results.push(node as LocationNode)
            }
        })

        return results
    }, [nodes])

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <SearchBar handleSearchChange={handleSearchChange} handleSearchClick={handleSearchClick} error={error} progress={progress}/>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%', margin: '10px'}}>
                <Map tracerouteResults={tracerouteResults}/>
                <NodeTimeline tracerouteResults={tracerouteResults} />
            </div>
        </div>
    )
}
