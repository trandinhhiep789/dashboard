import React from 'react'
import { Link } from "react-router-dom";

function LogoSidebar() {
    return (
        <div className="sidebar-brand">
            <Link to="/">
                <img src="/src/img/TMSLogo.png" alt="sidebar-logo" />
            </Link>
        </div>
    )
}

export default LogoSidebar
