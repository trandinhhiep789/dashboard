import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
export default function Logo() {
    return (
        <span className="topbar-brand">
            <Link to="/">
                <img src="/src/img/TMSLogo.png" alt="logo" height="60" />
            </Link>
        </span>
    );
}