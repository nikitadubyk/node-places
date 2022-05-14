import { useState, useCallback, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './shared/context/auth-context'

import MainNavigation from './shared/components/Navigation/MainNavigation'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './user/pages/Auth'

let logoutTimer

function App() {
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

    let routes

    if (token) {
        routes = (
            <>
                <Route path='/' element={<Users />} />
                <Route path='/:userId/places' element={<UserPlaces />} />
                <Route path='/places/new' element={<NewPlace />} />
                <Route path='/places/:id' element={<UpdatePlace />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </>
        )
    } else {
        routes = (
            <>
                <Route path='/' element={<Users />} />
                <Route path='/:userId/places' element={<UserPlaces />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='*' element={<Navigate to='/auth' replace />} />
            </>
        )
    }

    return (
        <AuthContext.Provider
            value={{ isLoggedIn: !!token, token, loggin, loggout, userId }}
        >
            <BrowserRouter>
                <MainNavigation />
                <main>
                    <Routes>{routes}</Routes>
                </main>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
