import React, { useEffect, useState } from 'react'

import callToActionIcon from '../Images/call-to-action-01.svg'
import defaultProfileIcon from '../Images/default-profile-01.svg'
import addIcon from '../Images/add-01.svg'

const moment = require('moment')

const CommentsBrowser = (props) => {

    let [comments, setComments] = useState([])

    useEffect(() => {
        let comment_tags = []
        for (var i = 0; i < props.comments.length; i++) {
            comment_tags.push(
                <div key={i} className='panel-item'>
                    <div className='panel-item-content'>
                        <p>{props.comments[i].comment.body}</p>
                        <p className='timestamp'>{moment(props.comments[i].comment.date).format('DD MMMM yyyy • HH:MM:SS')}</p>
                    </div>
                    <div className='panel-user'>
                        <img src={defaultProfileIcon} alt='' />
                    </div>
                </div>
            )
        }
        setComments(comment_tags)
    }, [props.comments])

    return (
        <>
            <div className='report'>
                <div className='report-header'>
                    <div className='report-title no-divider'>
                        <h4>{props.fortName}</h4>
                    </div>
                    <div className='report-action'>
                        <a href={'/forts/' + props.fortId}>
                            <p>View Details</p>
                            <img className='cta-icon' src={callToActionIcon} alt='' />
                        </a>
                    </div>
                </div>
                <div className='report-body sub-panels'>
                    <div className='panel'>
                        <div className='panel-content'>
                            {comments}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentsBrowser