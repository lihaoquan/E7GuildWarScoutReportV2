import React from 'react'

const SideBarLink = (props) => {

    const isActiveLink = props.currentPage == props.pageProps.link

    return (
        <a href={props.pageProps.link} className={isActiveLink ? 'menu-item active' : 'menu-item'}>
            <img src={isActiveLink ? props.pageProps.active_icon : props.pageProps.icon} alt="" />
            <h4>{props.pageProps.page_title}</h4>
        </a>
    )
}

export default SideBarLink