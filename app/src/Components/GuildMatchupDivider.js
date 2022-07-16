import React from 'react'

import guildWarIcon from '../Images/guild-war.svg'

const moment = require('moment')

const GuildMatchupDivider = (props) => {
    return (
        <>
            <div className="report-divider">
                <p>{moment(props.recordDate).format('DD MMMM yyyy • HH:MM:SS')}</p>
                <div className="guild-names">
                    <h4>{props.myGuild}</h4>
                    <img src={guildWarIcon} alt="" />
                    <h4>{props.enemyGuild}</h4>
                </div>
            </div>
        </>
    )
}

export default GuildMatchupDivider