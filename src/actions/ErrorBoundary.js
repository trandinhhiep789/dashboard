import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Log the error to an error reporting service
        console.log("%cErrorBoundary detected error", "color:red");
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-8">
                        <div className="row">
                            <div className="col-sm-6 img-404">
                                <img src="/src/img/error/404.png" />
                            </div>
                            <div className="col-sm-6">
                                <h1 className="text-danger">404</h1>
                                <h3>Oops Page Not Found</h3>
                                <p>The page you are looking for does not exist or has been moved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

        return this.props.children;
    }
}