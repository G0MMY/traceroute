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
        if (i !== tracerouteResults.length - 1) {
            items.push(
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot style={{backgroundColor: getColor(i)}} />
                        <TimelineConnector sx={{height: '150px'}} />
                    </TimelineSeparator>
                    <TimelineContent><div>{result.address}</div></TimelineContent>
                </TimelineItem>
            )
        } else {
            items.push(
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot style={{backgroundColor: getColor(i)}} />
                    </TimelineSeparator>
                    <TimelineContent><div>{result.address}</div></TimelineContent>
                </TimelineItem>
            )
        }
    })

    return items
}

export default function NodeTimeline({tracerouteResults}: Props) {

    return (
        <Timeline>
            {createTimelineItems(tracerouteResults)}
        </Timeline>
    )
}
