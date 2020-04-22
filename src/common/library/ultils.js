import React from "react";
import { toast } from 'react-toastify';
import "react-notifications-component/dist/theme.css";

const Content = ({ message }) => {
    return (
        <div className="notification-custom-content">
            <h1 className="notification-title">Thông Báo</h1>
            <p className="notification-message">{message}</p>
        </div>
    )
}

export const showToastAlert = (message = '🦄 Wow so easy', type = '') => {
    switch (type.toString()) {
        case 'info':
            toast.info(<Content message={message} />, { autoClose: 3000 });
            break;
        case 'success':
            toast.success(<Content message={message} />, { autoClose: 3000 });
            break;
        case 'warning':
            toast.warn(<Content message={message} />, { autoClose: 3000 });
            break;
        case 'error':
            toast.error(<Content message={message} />, { autoClose: 3000 });
            break;
        default:
            toast.info(<Content message={message} />, { autoClose: 3000 });
            break;
    }
}