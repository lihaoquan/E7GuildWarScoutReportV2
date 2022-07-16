import React from 'react'

import callToActionIcon from '../Images/call-to-action-01.svg'

const MainPanel = (props) => {
    return (
        <>
            <div className="main-panel">
                <div className="main-action">
                    <a href="#" onClick={() => { props.onClick() }}>
                        <div className="cta-text">
                            <h4>Create New Record</h4>
                            <p>Create a new guild war record. This action can only be performed by the guild leader
                                and
                                vice
                                leaders.</p>
                        </div>
                        <div>
                            <img className="cta-icon" src={callToActionIcon} alt="" />
                        </div>
                    </a>
                </div>
                <div className="stats">
                    <div className="stat">
                        <div className="stat-wrapper">
                            <div className="stat-title">
                                <h5>Check-ins</h5>
                            </div>
                            <p className="stat-value">NIL</p>
                        </div>
                    </div>
                    <div className="stat">
                        <div className="stat-wrapper">
                            <div className="stat-title">
                                <h5>Reports</h5>
                            </div>
                            <p className="stat-value">{props.reportCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPanel