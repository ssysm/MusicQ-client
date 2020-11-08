import React, { useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

export default function HomePage() {
    const history = useHistory();

    return(
        <div>
            <h1>Welcome to MusicQ, Please select following options to get started</h1>
            <div>
                <button onClick={()=> { history.push('/create-room') }}>Create New Room</button>
                <button onClick={()=> { history.push('/join-room') }}>Join New Room</button>
            </div>
        </div>
    )
}