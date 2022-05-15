import { useState, useEffect, useCallback } from 'react'

let logoutTimer

export const useAuth = () => {
    const [token, setToken] = useState(false)
    const [tokenExpirationDate, setTokenExpirationDate] = useState()
    const [userId, setUserId] = useState(null)

    const loggin = useCallback((uid, token, expiration) => {
        setToken(token)
        setUserId(uid)
        const tokenExpirationDate =
            expiration || new Date(new Date().getTime() + 1000 * 60 * 60)
        setTokenExpirationDate(tokenExpirationDate)
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                token,
                expiration: tokenExpirationDate.toISOString(),
            })
        )
    }, [])

    const loggout = useCallback(() => {
        setToken(null)
        setTokenExpirationDate(null)
        setUserId(null)
        localStorage.removeItem('userData')
    }, [])

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingDate =
                tokenExpirationDate.getTime() - new Date().getTime()
            logoutTimer = setTimeout(loggout, remainingDate)
        } else {
            clearTimeout(logoutTimer)
        }
    }, [token, loggin, tokenExpirationDate])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'))
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            loggin(
                storedData.userId,
                storedData.token,
                new Date(storedData.expiration)
            )
        }
    }, [loggin])

    return { loggin, loggout, token, tokenExpirationDate, userId }
}
