import React, { useMemo, useState } from "react"
import internal from "stream"
import Map from "./MapContainer"
import SearchBar from "./SearchBar"

interface Location {
    longitude: number
    latitude: number
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }

    const handleSearchClick = () => {
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
            console.log(resp)
        }).then((data) => {
            setNodes(data.Results)
        }).catch((err) => {
            console.log(err)
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
        <div>
            <SearchBar handleSearchChange={handleSearchChange} handleSearchClick={handleSearchClick}/>
            <Map tracerouteResults={tracerouteResults}/>
        </div>
    )
}
