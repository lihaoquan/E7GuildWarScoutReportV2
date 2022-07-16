import React from 'react'

import closeIconAlt from '../Images/close-02.svg'

const Popup = (props) => {
    return (
        <>
            <div className={props.success ? 'popup success-popup' : 'popup failure-popup'}>
                <h4>{props.message}</h4>
                <img src={closeIconAlt} onClick={() => { props.onClose(false) }} alt='' />
            </div>
        </>
    )
}

export default Popup