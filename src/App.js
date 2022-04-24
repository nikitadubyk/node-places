import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import MainNavigation from './shared/components/Navigation/MainNavigation'
import Users from './user/pages/Users'
import NewPlaces from './places/pages/NewPlaces'

function App() {
    return (
        <BrowserRouter>
            <MainNavigation />
            <main>
                <Routes>
                    <Route path='/' element={<Users />} />
                    <Route path='/places/new' element={<NewPlaces />} />
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App
