import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hook'

import MainNavigation from './shared/components/Navigation/MainNavigation'
import Users from './user/pages/Users'
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner'
// import NewPlace from './places/pages/NewPlace'
// import UserPlaces from './places/pages/UserPlaces'
// import UpdatePlace from './places/pages/UpdatePlace'
// import Auth from './user/pages/Auth'

const NewPlace = lazy(() => import('./places/pages/NewPlace'))
const UserPlaces = lazy(() => import('./places/pages/UserPlaces'))
const UpdatePlace = lazy(() => import('./places/pages/UpdatePlace'))
const Auth = lazy(() => import('./user/pages/Auth'))

function App() {
    const { token, loggin, loggout, userId } = useAuth()

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
                    <Suspense
                        fallback={
                            <div className='center'>
                                <LoadingSpinner />
                            </div>
                        }
                    >
                        <Routes>{routes}</Routes>
                    </Suspense>
                </main>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
