import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const BasePage = ({children}) => {
    const navigate = useNavigate()
    const navigateTo = useCallback((path) => {
        navigate(path)
    }, [])
    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
                    <div className='col d-flex justify-content-start'>
                        <a className="navbar-brand" href="/">Kafe in</a>
                    </div>
                    <div className='col d-flex justify-content-end'>
                        <div className="dropdown pt-3 pl-3 d-flex align-items-end">
                            <Link className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
                                <strong>mdo</strong>
                            </Link>
                            <ul className="dropdown-menu text-small shadow dropdown-menu-end">
                                <li><Link className="dropdown-item">Profile</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item" onClick={() => {
                                    localStorage.removeItem('token')
                                }}>Sign out</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar App-header">
                        <div className="position-sticky">
                            <div className='col p-2'>
                                <ul className="nav nav-pills flex-column mb-auto">
                                    <li className='nav-item py-2'>
                                        <div type="button" className={`nav-link ${window.location.pathname.includes('dashboard') ? 'active' : ''}`} onClick={() => navigateTo('/dashboard')}>
                                            <i className={`bi bi-speedometer2 pe-2`}></i>
                                            Dashboard
                                        </div>
                                    </li>
                                    <li className='nav-item py-2'>
                                        <div type="button" className={`nav-link ${window.location.pathname.includes('user') ? 'active' : ''}`} onClick={() => navigateTo('/user')}>
                                            <i className={`bi bi-speedometer2 pe-2`}></i>
                                            User
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-2">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasePage