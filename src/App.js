import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Users from './user/pages/Users'
import NewPlaces from './places/pages/NewPlaces'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Users />} />
                <Route path='/places/new' element={<NewPlaces />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
