import React from 'react'

import defaultProfileIcon from '../Images/default-profile-01.svg'
import addIcon from '../Images/add-01.svg'

const ReportSubPanels = (props) => {
    return (
        <>
            <div className='sub-panels'>
                <div className='panel'>
                    <div className='panel-title'>
                        <h4>Activity Log</h4>
                    </div>
                    <div className='panel-content'>
                        {props.activityTags}
                    </div>
                </div>
                <div className='panel'>
                    <div className='panel-title'>
                        <h4>Comments</h4>
                    </div>
                    <div className='panel-content'>
                        {props.commentTags}
                    </div>
                    <div className='panel-action'>
                        <a href='#' onClick={() => { props.onClick(true) }}>
                            <p>Add Comments</p>
                            <img className='cta-icon' src={addIcon} alt='' />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportSubPanels