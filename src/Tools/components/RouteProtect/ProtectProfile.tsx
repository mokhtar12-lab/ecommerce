import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../hooks/reduxHooks"
import React from "react"


export default function ProtectProfile({children}: {children: React.ReactNode}) {
    const {accessToken} = useAppSelector(state=>state.auth)
    
    if(!accessToken) {
        return <Navigate to={"/"} />
    }

    return (
        <div>{children}</div>
    )
}
