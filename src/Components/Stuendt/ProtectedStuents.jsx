import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedStuents(props) {
    const cashedStudents = JSON.parse(sessionStorage.getItem("studentsDetails"))
    // const { studentDetails } = useContext(ApisContext)
    if (!cashedStudents) {
        return <Navigate to={"/"} />
    }
    else {
        return props.children;
    }
}