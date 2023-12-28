import React, { createContext, useEffect, useState } from 'react'

import axios from 'axios';

export const myContext = createContext({});
export default function Context(props) {

    const [userObject, setUserObject] = useState();

    useEffect(() => {
        console.log('here')
        axios.get("https://clumsy-glasses-clam.cyclic.app/getuser", {'Access-Control-Allow-Origin': 'http://localhost:3000'},   { withCredentials: true }).then((res) => {
            console.log('context data ',res.data);
            if (res.data) {
                setUserObject(res.data);
            }
        })
    }, [])
    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}