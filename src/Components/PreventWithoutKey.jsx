import React, { useContext } from 'react'
import { ApisContext } from '../Context/ApisContext'
import UseTutorKey from './UseTutorKey'
import Cookies from 'universal-cookie'

export default function PreventWithoutKey({ children }) {
    const { fetchCenterKey } = useContext(ApisContext)

    const userDetails = new Cookies().get("userDetails")


    // console.log(fetchCenterKey.data)

    // if ((userDetails?.tAData === null && userDetails?.role === "3") || (userDetails?.role === "4" && fetchTutorKeyForTa.data?.totalTutors > 0))
    // else if (userDetails?.role === "4" && fetchTutorKeyForTa.data?.totalTutors <= 0)
    if (userDetails?.role === "1" || (userDetails?.role === "2" && fetchCenterKey.data?.centers?.length > 0)) {
        return children
    } else if (userDetails?.role === "2" && fetchCenterKey.data?.centers?.length <= 0) {
        return <UseTutorKey />
    }
}

