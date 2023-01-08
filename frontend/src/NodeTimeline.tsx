import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { width } from '@mui/system';
import React from 'react';
import { getColor } from './MapNodesLayer';
import { LocationNode } from './MapPage';

interface Props {
    tracerouteResults: LocationNode[]
}

const createTimelineItems = (tracerouteResults: LocationNode[]) => {
    const items: JSX.Element[] = []

    tracerouteResults.forEach((result, i) => {
        if (i === 0) {
            items.push(
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: 'auto'}}>
                    <div style={{marginBottom: '20px', textAlign: 'center', marginRight: '-10px'}}>
                        {result.address}
                    </div>
                    <div style={{display: 'flex', width: '150px', justifyContent: 'space-around'}}>
                        <div style={{width: '55px'}}/>
                        <span style={{backgroundColor: getColor(i), borderRadius: '50%', width: '20px', height: '20px'}}/>
                        <div style={{width: '55px', borderBottom: '2px solid gray', marginBottom: '8px', marginRight: '-10px'}}/>
                    </div>
                    <div style={{marginTop: '20px', textAlign: 'center', marginRight: '-10px'}}>
                        {result.location.city}
                    </div>
                </div>
            )
        } else if (i !== tracerouteResults.length - 1) {
            items.push(
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{marginBottom: '20px', textAlign: 'center', marginRight: '-10px'}}>
                        {result.address}
                    </div>
                    <div style={{display: 'flex', width: '150px', justifyContent: 'space-around'}}>
                        <div style={{width: '55px', borderBottom: '2px solid gray', marginBottom: '8px'}}/>
                        <span style={{backgroundColor: getColor(i), borderRadius: '50%', width: '20px', height: '20px'}}/>
                        <div style={{width: '55px', borderBottom: '2px solid gray', marginBottom: '8px', marginRight: '-10px'}}/>
                    </div>
                    <div style={{marginTop: '20px', textAlign: 'center', marginRight: '-10px'}}>
                        {result.location.city}
                    </div>
                </div>
            )
        } else {
            items.push(
                <div style={{display: 'flex', flexDirection: 'column', marginRight: 'auto'}}>
                    <div style={{marginBottom: '20px', textAlign: 'center'}}>
                        {result.address}
                    </div>
                    <div style={{display: 'flex', width: '150px', justifyContent: 'space-around'}}>
                        <div style={{width: '50px', borderBottom: '2px solid gray', marginBottom: '8px'}}/>
                        <span style={{backgroundColor: getColor(i), borderRadius: '50%', width: '20px', height: '20px'}}/>
                        <div style={{width: '50px'}}/>
                    </div>
                    <div style={{marginTop: '20px', textAlign: 'center'}}>
                        {result.location.city}
                    </div>
                </div>
            )
        }
    })

    return items
}

export default function NodeTimeline({tracerouteResults}: Props) {

    return (
        <div style={{display: 'flex', marginTop: '30px', overflow: 'auto'}}>
            {createTimelineItems(tracerouteResults)}
        </div>
    )
}
