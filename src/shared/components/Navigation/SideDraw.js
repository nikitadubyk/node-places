import React from 'react'
import * as ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import './SideDraw.css'

const SideDraw = ({ children, show, onClick }) => {
    const content = (
        <CSSTransition
            in={show}
            timeout={500}
            classNames='slide-in-left'
            mountOnEnter
            unmountOnExit
        >
            <aside className='side-drawer' onClick={onClick}>
                {children}
            </aside>
        </CSSTransition>
    )

    return ReactDOM.createPortal(
        content,
        document.getElementById('drawer-hook')
    )
}

export default SideDraw
