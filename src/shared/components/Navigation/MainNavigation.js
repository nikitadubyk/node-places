import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import SideDraw from './SideDraw'

import './MainNavigation.css'
import Backdrop from '../UIElements/Backdrop'

const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)

    const openDrawerHandler = () => setDrawerIsOpen(true)
    const closeDrawerHandler = () => setDrawerIsOpen(false)

    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

            <SideDraw show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className='main-navigation__drawer-nav'>
                    <NavLinks />
                </nav>
            </SideDraw>

            <MainHeader>
                <button
                    className='main-navigation__menu-btn'
                    onClick={openDrawerHandler}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h1 className='main-navigation__title'>
                    <Link to='/'>Your Places</Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    )
}

export default MainNavigation
