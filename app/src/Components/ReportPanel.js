import React, { useEffect, useState } from 'react'

import callToActionIcon from '../Images/call-to-action-01.svg'
import addIcon from '../Images/add-01.svg'
import viewsIcon from '../Images/views-01.svg'

const ReportPanel = (props) => {

    let [reportButtonTexts, setReportButtonTexts] = useState(<></>)

    useEffect(() => {
        props.isNewReport ?
            setReportButtonTexts(
                <>
                    <h4>Add Report</h4>
                    <p>Add information for this fort.</p>
                </>
            ) :
            setReportButtonTexts(
                <>
                    <h4>Update Report</h4>
                    <p>Update information for this fort.</p>
                </>
            )
    }, [props.isNewReport])

    return (
        <>
            <div className='main-panel'>
                <div className='main-action'>
                    <a href='#' onClick={() => { props.onClick(true) }}>
                        <div className='cta-text'>
                            {reportButtonTexts}
                        </div>
                        <div>
                            <img className='cta-icon' src={callToActionIcon} alt='' />
                        </div>
                    </a>
                </div>
                <div className='actions'>
                    <div className='action'>
                        <div className='action-wrapper'>
                            <div className='action-title'>
                                <h5>Endorsements</h5>
                            </div>
                            <p className='action-value'><span className='big'>N/A</span></p>
                        </div>
                        <div className='action-btn'>
                            <img className='cta-icon' src={addIcon} alt='' />
                        </div>
                    </div>
                    <div className='action'>
                        <div className='action-wrapper'>
                            <div className='action-title'>
                                <h5>Viewers</h5>
                            </div>
                            <p className='action-value'>{props.viewers}</p>
                        </div>
                        <a href='#' onClick={() => { props.onClickView(true) }}>
                            <div className='action-btn'>
                                <img className='cta-icon' src={viewsIcon} alt='' />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportPanel