import React from 'react'

import closeIcon from '../Images/close-01.svg'

const ImageBrowser = (props) => {
    return (
        <form className='full-page-small dialog image-dialog'>
            <div className='form-title'>
                <h3>Image Viewer</h3>
                <img src={closeIcon} alt='' onClick={() => { props.onClose(false) }} />
            </div>
            <div className='form-body'>
                <img src={props.source} />
            </div>
        </form>
    )
}

export default ImageBrowser