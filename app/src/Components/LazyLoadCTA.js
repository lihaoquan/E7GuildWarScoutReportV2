import React from 'react'

const LazyLoadCTA = (props) => {
    return (
        <>
            <div className="cta-btn-wrapper">
                <button className="cta-btn" onClick={props.onClick}>{props.displayText}</button>
            </div>
        </>
    )
}

export default LazyLoadCTA