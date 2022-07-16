import React, { useState } from 'react'
import axios from 'axios'

import closeIcon from '../Images/close-01.svg'

const AnnouncementForm = (props) => {

    const handleSubmit = (e) => {

        e.preventDefault()

        axios.post('http://localhost:3001/api/add-announcement', formData,
            {
                withCredentials: true,
                headers: { Authorization: `Bearer ${props.bearer}` }
            })
            .then(function (response) {
                props.createPopup('Successfully added announcement.', true)
                props.onClose(false)
            }).catch(function (error) {
                props.createPopup('Failed to add announcement.', false)
                props.onClose(false)
            })
    }

    const [formData, setFormData] = useState({
        text: '',
        author: props.author
    })

    return (
        <>
            <form className='full-page-small dialog' onSubmit={handleSubmit}>
                <div className='form-title'>
                    <h3>New Announcement</h3>
                    <img src={closeIcon} alt='' onClick={() => { props.onClose(false) }} />
                </div>
                <div className='form-group'>
                    <label>Announcement</label>
                    <textarea onChange={(e) => { setFormData({ ...formData, text: e.target.value }) }} value={formData.text} placeholder='Add an announcement...'></textarea>
                </div>
                <input type='submit' value='Add Announcement' />
            </form>
        </>
    )
}

export default AnnouncementForm