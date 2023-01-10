import React from 'react'
import { Button, CircularProgress, TextField } from '@mui/material'

interface Props {
    handleSearchChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    handleSearchClick: () => void
    error: boolean
    progress: boolean
}

export default function SearchBar({handleSearchChange, handleSearchClick, error, progress}: Props) {
    return (
        <div style={{display: 'flex', justifyContent: 'center', padding: '40px'}}>
            <div className="searchBar">
                <TextField error={error} onChange={(e) => {
                    handleSearchChange(e)
                }} style={{width: '300px', marginRight: '10px'}} helperText={error? "Invalid IP address or hostname": "Enter IP address or hostname"} label="IP address or hostname" variant="outlined"/>
                <Button onClick={handleSearchClick} style={{marginBottom: '25px'}} variant="contained">Test</Button>
                <div style={{marginLeft: '10px', marginBottom: '20px'}}>
                    {progress? <CircularProgress style={{width: '30px', height: '30px'}} />: <></>}
                </div>
            </div>
        </div>
    )
}
