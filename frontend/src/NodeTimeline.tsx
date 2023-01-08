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
                <div className="columnFlex" style={{marginLeft: 'auto'}}>
                    <div className="addressText" style={{marginRight: '-10px'}}>
                        {result.address}
                    </div>
                    <div className="timelineNode">
                        <div style={{width: '55px'}}/>
                        <span className="timelineCircle" style={{backgroundColor: getColor(i)}}/>
                        <div className="timelineLine" style={{marginRight: '-10px'}}/>
                    </div>
                    <div className="timelineCity" style={{marginRight: '-10px'}}>
                        {result.location.city}
                    </div>
                </div>
            )
        } else if (i !== tracerouteResults.length - 1) {
            items.push(
                <div className="columnFlex">
                    <div className="addressText" style={{marginRight: '-10px'}}>
                        {result.address}
                    </div>
                    <div className="timelineNode">
                        <div className="timelineLine"/>
                        <span className="timelineCircle" style={{backgroundColor: getColor(i)}}/>
                        <div className="timelineLine" style={{marginRight: '-10px'}}/>
                    </div>
                    <div className="timelineCity" style={{marginRight: '-10px'}}>
                        {result.location.city}
                    </div>
                </div>
            )
        } else {
            items.push(
                <div className="columnFlex" style={{marginRight: 'auto'}}>
                    <div className="addressText">
                        {result.address}
                    </div>
                    <div className="timelineNode">
                        <div className="timelineLine"/>
                        <span className="timelineCircle" style={{backgroundColor: getColor(i)}}/>
                        <div style={{width: '55px'}}/>
                    </div>
                    <div className="timelineCity">
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
        <div style={{height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{display: 'flex', overflow: 'auto'}}>
                {createTimelineItems(tracerouteResults)}
            </div>
        </div>
    )
}
