import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './shared/context/auth-context'

import MainNavigation from './shared/components/Navigation/MainNavigation'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './user/pages/Auth'

function App() {
    const [token, setToken] = useState(false)
    const [userId, setUserId] = useState(null)

    const loggin = useCallback((uid, token) => {
        setToken(token)
        setUserId(uid)
    }, [])

    const loggout = useCallback(() => {
        setToken(null)
        setUserId(null)
    }, [])

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
