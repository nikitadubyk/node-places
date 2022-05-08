import { useState, useCallback } from 'react'

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setIsLoading(true)
            try {
                const res = await fetch(url, {
                    method,
                    body,
                    headers,
                })

                const resData = await res.json()

                if (!res.ok) {
                    throw new Error(resData.message)
                }

                setIsLoading(false)
                return resData
            } catch (error) {
                setIsLoading(false)
                console.log(error)
                setError(error.message)
                throw error
            }
        },
        []
    )

    const clearError = () => setError(null)

    return { isLoading, error, sendRequest, clearError }
}
