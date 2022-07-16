import React from 'react'

import closeIcon from '../Images/close-01.svg'

const ViewerBrowser = (props) => {
    return (
        <form className='full-page-small narrow dialog'>
            <div className='form-title'>
                <h3>Report Viewers</h3>
                <img src={closeIcon} alt='' onClick={() => { props.onClose(false) }} />
            </div>
            <div className='form-body'>
                <p>{props.viewers}</p>
            </div>
        </form>
    )
}

export default ViewerBrowser