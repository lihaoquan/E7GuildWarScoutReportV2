import React, { useState } from 'react'

import viewIcon from '../Images/view-01.svg'
import editIcon from '../Images/edit-01.svg'
import closeIcon from '../Images/close-01.svg'

const Notice = (props) => {

    let [showAnnouncement, setShowAnnouncement] = useState(false)

    return (
        <>
            {showAnnouncement &&
                <form className='full-page-small narrow dialog'>
                    <div className='form-title'>
                        <h3>Announcement</h3>
                        <img src={closeIcon} alt='' onClick={() => { setShowAnnouncement(false) }} />
                    </div>
                    <div className='form-body'>
                        <p>{props.text}</p>
                    </div>
                </form>
            }
            <div className="notice">
                <div className="notice-title">
                    <h5>Guild Announcements</h5>
                </div>
                <div className="notice-body">
                    <p>{props.text.substring(0, 125)}{
                        props.text.length > 125 ? '...' : ''
                    }</p>
                </div>
                <img src={viewIcon} onClick={() => { setShowAnnouncement(true) }} alt="" />
                <img src={editIcon} onClick={() => { props.onClick(true) }} alt="" />
                <img src={closeIcon} onClick={() => { props.triggerHideNotice(true) }} alt="" />
            </div>
        </>
    )
}

export default Notice