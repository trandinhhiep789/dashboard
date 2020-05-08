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

export const createListTree = (resultRoot, rootID, rootKey, childrenKey, childrenName) => {
    let result = []
    const resultFilter = resultRoot.filter(e => {
        return e[rootKey] == rootID 
    })
    if (resultFilter.length > 0) {
        resultFilter.map((e, i) => {
            let element = {
                [rootKey]: rootID,
                [childrenKey]: e[childrenKey],
                [childrenName]: e[childrenName],
                key: e[childrenKey],
                value: e[childrenKey],
                title: `${e[childrenKey]} - ${e[childrenName]}`,
                children: []
            }
            element.children = createListTree(resultRoot, e[childrenKey], rootKey, childrenKey, childrenName)
            result.push(element)
        })
    }
    return result;
}