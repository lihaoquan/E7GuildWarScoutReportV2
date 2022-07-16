import React, { useEffect, useState } from 'react'

import appLogo from '../Images/app-logo-01.svg'
import defaultProfileIcon from '../Images/default-profile-01.svg'
import loginHistoryIcon from '../Images/login-history-01.svg'
import settingsIcon from '../Images/settings-01.svg'
import logoutIcon from '../Images/logout-01.svg'

import SideBarLink from './SideBarLink'

let generateLinks = (pages, currentPage) => {
    let links = []

    let i = 0
    for (const page in pages) {
        links.push(<SideBarLink currentPage={currentPage} key={i} pageProps={pages[page]} />)
        i++
    }

    return links
}

const SideBar = (props) => {

    let menu_items = generateLinks(props.pages, props.currentPage)

    let [role, setRole] = useState('')

    useEffect(() => {
        switch (props.role) {
            case 1:
                setRole('Test (Guild Member)')
                break;
            case 2:
                break;
        }
    }, [props.role])

    return (
        <>
            <aside className="sidebar">
                <div className="title-section">
                    <a href={props.homePage}>
                        <div className="logo">
                            <img src={appLogo} alt="" />
                        </div>
                    </a>
                    <div>
                        <h1>Guild War Report</h1>
                    </div>
                </div>
                <div className="user-section">
                    {props.isLoggedIn ?
                        <>
                            <div className="user-frame">
                                <img src={defaultProfileIcon} alt="" />
                                <h4>{props.displayName}</h4>
                                <h5>{role}</h5>
                            </div>
                            <div className="user-quick-actions">
                                <a href="">
                                    <img src={loginHistoryIcon} alt="" />
                                </a>
                                <a href="">
                                    <img src={settingsIcon} alt="" />
                                </a>
                                <a href="#" onClick={() => { props.logout() }}>
                                    <img src={logoutIcon} alt="" />
                                </a>
                            </div>
                            <div className="menu-items">
                                {menu_items}
                            </div>
                        </>
                        :
                        <>
                            <div className="menu-items logged-out">
                                <div className="user-frame">
                                    <img src={defaultProfileIcon} alt="" />
                                    <h5>Guest</h5>
                                </div>
                                <h4>Login to Continue</h4>
                                <button onClick={() => { props.setShowLoginForm(true) }} className='cta-btn'>Login</button>
                                <button onClick={() => { props.setShowRegisterForm(true) }} className='cta-btn secondary-cta'>Register</button>
                            </div>
                        </>
                    }
                    <div className="copyright-info">
                        <p>Created by <a href="https://www.reddit.com/user/l-dev" rel="noreferrer" target="_blank">l-dev</a></p>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SideBar