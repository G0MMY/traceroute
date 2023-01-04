import React from 'react'
import { Button, TextField } from '@mui/material'

interface Props {
    handleSearchChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    handleSearchClick: () => void
}

export default function SearchBar({handleSearchChange, handleSearchClick}: Props) {
    return (
        <div style={{display: 'flex', justifyContent: 'center', padding: '40px'}}>
            <div className="searchBar">
                <TextField onChange={(e) => {
                    handleSearchChange(e)
                }} style={{width: '300px', marginRight: '10px'}} label="Enter domain here" variant="outlined"/>
                <Button onClick={handleSearchClick} style={{marginTop: '9px'}} variant="contained">Search</Button>
            </div>
        </div>
    )
}
