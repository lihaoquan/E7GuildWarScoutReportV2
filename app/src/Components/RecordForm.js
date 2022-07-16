import React, { useState } from 'react'
import axios from 'axios'

import closeIcon from '../Images/close-01.svg'

const RecordForm = (props) => {

    const handleSubmit = (e) => {

        e.preventDefault()

        axios.post('http://localhost:3001/api/create-record', formData,
            {
                withCredentials: true,
                headers: { Authorization: `Bearer ${props.bearer}` }
            })
            .then(function (response) {
                props.createPopup(`Successfully created record for ${response.data.enemyGuild}.`, true)
                props.onClose(false)
            }).catch(function (error) {
                props.createPopup(`Failed to create record for ${formData.guild_name}.`, false)
                props.onClose(false)
            })
    }

    const [formData, setFormData] = useState({
        guild_name: '',
        war_date: ''
    })

    return (
        <>
            <form className='full-page-small dialog' onSubmit={handleSubmit}>
                <div className='form-title'>
                    <h3>New Guild War Record</h3>
                    <img src={closeIcon} alt='' onClick={() => { props.onClose(false) }} />
                </div>
                <div className='form-group'>
                    <label>Enemy Guild Name</label>
                    <input onChange={(e) => { setFormData({ ...formData, guild_name: e.target.value }) }} value={formData.guildName} type='text' name='guild_name' placeholder='Enemy guild name for record identification' />
                    <label>War Date</label>
                    <input onChange={(e) => { setFormData({ ...formData, war_date: e.target.value }) }} value={formData.war_date} type='date' name='war_date' />
                </div>
                <input type='submit' name='new_record' value='Create Record' />
            </form>
        </>
    )
}

export default RecordForm