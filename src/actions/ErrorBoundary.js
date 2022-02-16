import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Log the error to an error reporting service
    if (error) {
      console.error('ErrorBoundary', info.componentStack)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div style={{ display: 'flex' }}>
            <div className="">
              <img src="/src/img/error/404.png" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div>
                <h1 style={{ color: 'red' }}>404</h1>
                <h3>Oops Page Not Found</h3>
                <p>The page you are looking for does not exist or has been moved.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
