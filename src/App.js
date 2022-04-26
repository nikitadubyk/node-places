import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import MainNavigation from './shared/components/Navigation/MainNavigation'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'

function App() {
    return (
        <BrowserRouter>
            <MainNavigation />
            <main>
                <Routes>
                    <Route path='/' element={<Users />} />
                    <Route path='/places/new' element={<NewPlace />} />
                    <Route path='/:userId/places' element={<UserPlaces />} />
                    <Route path='/places/:id' element={<UpdatePlace />} />
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App
