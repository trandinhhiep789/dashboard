import React from 'react';
import ReactDOM from "react-dom";
export default class NotificationBox extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return (
            <div className={"alert "+ this.props.AlertType} role="alert">
                    {this.props.MessageContent}
                    </div>
        );
    }
}
/*
export default function NotificationBox(MessageContent,AlertType)
{
    //const MessageValue = <strong>{MessageContent}</strong>;
    console.log("MessageContent", MessageContent);
    return (
        <div className="alert alert-danger" role="alert">
                 Đổi mật khẩu OK
                </div>
    );
}*/