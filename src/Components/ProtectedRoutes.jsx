import React, { memo } from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function ProtectedRoutes(props) {

    let cookie = new Cookies()
    let token = cookie.get("userToken")

    if (token) {
        return <Navigate to={"/"} />
    }
    else {
        return props.children;
    }
}

export default memo(ProtectedRoutes)