import React, { useContext } from 'react'
import { ApisContext } from '../Context/ApisContext'
import axios from 'axios'
import { BASE_URL } from '../Soursre'


async function UseAuth(url, setloading, loading, loadingProp) {
    const { selectedCenter, headers } = useContext(ApisContext)
    if (selectedCenter) {
        try {
            setloading({ ...loading, loadingProp: true })
            const response = await axios.get(`${BASE_URL}${url}`, { headers: headers })
            return response
        } catch (error) {
            return error
        } finally {
            setloading({ ...loading, loadingProp: false })
        }
    }

}

export default UseAuth