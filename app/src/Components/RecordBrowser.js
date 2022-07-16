import React from 'react'
import moment from 'moment'

import dropDownIcon from '../Images/drop-down-01.svg'
import normalFortIcon from '../Images/normal-fort-01.svg'
import strongholdIcon from '../Images/stronghold-01.svg'

const RecordBrowser = (props) => {

    const initReportSelection = () => {

        let record_selections = []

        for (var i = 0; i < props.records.length; i++) {
            let record = props.records[i]
            record_selections.push(<option key={i} value={record._id}>{moment(record.date).format('DD MMM yyyy')} &bull; {record.enemyGuild}</option>)
        }

        return record_selections
    }

    return (
        <>
            <div className="report-browser">
                <div className="report-selector">
                    <h3>Guild War Report</h3>
                    <div className="select-wrapper">
                        <select defaultValue={false} onChange={(e) => { props.onChange(e.target.value) }}>
                            <option disabled value={false}>Select a report</option>
                            {initReportSelection()}
                        </select>
                        <img src={dropDownIcon} alt="" />
                    </div>
                </div>
                <div className="fort-selector">
                    <a href={props.currentRecord ? "/forts/" + props.currentRecord.forts[0]._id : '#'}>
                        <div className="fort">
                            <div className="fort-counter"><span>{props.fortReportCount[0] || 0}</span></div>
                            <img src={normalFortIcon} alt="" />
                            <h4>Top Fort</h4>
                        </div>
                    </a>
                    <a href={props.currentRecord ? "/forts/" + props.currentRecord.forts[1]._id : '#'}>
                        <div className="fort">
                            <div className="fort-counter"><span>{props.fortReportCount[1] || 0}</span></div>
                            <img src={normalFortIcon} alt="" />
                            <h4>Mid Fort</h4>
                        </div>
                    </a>
                    <a href={props.currentRecord ? "/forts/" + props.currentRecord.forts[2]._id : '#'}>
                        <div className="fort">
                            <div className="fort-counter"><span>{props.fortReportCount[2] || 0}</span></div>
                            <img src={normalFortIcon} alt="" />
                            <h4>Bot Fort</h4>
                        </div>
                    </a>
                    <a href={props.currentRecord ? "/forts/" + props.currentRecord.forts[3]._id : '#'}>
                        <div className="fort">
                            <div className="fort-counter"><span>{props.fortReportCount[3] || 0}</span></div>
                            <img src={strongholdIcon} alt="" />
                            <h4>Stronghold</h4>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default RecordBrowser