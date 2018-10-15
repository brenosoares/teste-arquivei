import React, { Component } from 'react'

// Style
import './style.sass'

// Images and Assets
import logo from '../../assets/logo_branco.png'

// Styles
import './style.sass'

export default class TopBar extends Component {
    render() {
        return (
            <header className="header">
                <div className="header-content-logo">
                    <img src={logo} alt="logo arquivei"/>
                </div>
            </header>
        )
    }
}
