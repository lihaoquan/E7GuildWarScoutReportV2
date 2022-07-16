import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Unit from './Unit'
import ReportForm from './ReportForm'

import callToActionIcon from '../Images/call-to-action-01.svg'
import defaultProfileIcon from '../Images/default-profile-01.svg'
import axios from 'axios'
import ImageBrowser from './ImageBrowser'

const moment = require('moment')

const Report = (props) => {

    const params = useParams()

    const [reportData, setReportData] = useState(null)
    const [roundOneUnits, setRoundOneTags] = useState([])
    const [roundTwoUnits, setRoundTwoTags] = useState([])
    const [reportTitle, setReportTitle] = useState({})
    const [fortUrl, setFortUrl] = useState('')
    const [showImage, setShowImage] = useState(false)
    const [currentImage, setCurrentImage] = useState('')

    const getReportId = (fort_id) => {

        let id
        if (fort_id) {
            id = fort_id
        } else {
            id = params.id
            props.setCurrentFort(id)
        }

        return new Promise((resolve, reject) => {
            fetch('http://localhost:3001/api/forts/' + id,
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${props.bearer}` }
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        resolve(result)
                    })
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    const getReportDetails = (report_id) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3001/api/report-details/' + report_id,
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${props.bearer}` }
                })
                .then(
                    (result) => {
                        resolve(result)
                    })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    const loadFields = () => {
        let round_one = []
        let round_two = []

        if (!reportData.report_details) return

        for (var j = 0; j < reportData.report_details.unit_data.rounds[0].units.length; j++) {
            let unit = reportData.report_details.unit_data.rounds[0].units[j]
            round_one.push(<Unit image={reportData.units[unit.unit].image} key={j} unit={reportData.units[unit.unit].unit_name} speed={unit.speed} health={unit.health} artifact={reportData.artifacts[unit.artifact].artifact_name} itemSet={unit.item_set} />)
        }

        for (var k = 0; k < reportData.report_details.unit_data.rounds[1].units.length; k++) {
            let unit = reportData.report_details.unit_data.rounds[1].units[k]
            round_two.push(<Unit image={reportData.units[unit.unit].image} key={k} unit={reportData.units[unit.unit].unit_name} speed={unit.speed} health={unit.health} artifact={reportData.artifacts[unit.artifact].artifact_name} itemSet={unit.item_set} />)
        }

        setRoundOneTags(round_one)
        setRoundTwoTags(round_two)
    }

    const loadViewers = (viewers) => {

        let viewer_list = ''

        for (var i = 0; i < viewers.length; i++) {
            viewer_list += reportData.users[viewers[i]].username
            if (i != viewers.length - 1) viewer_list += ', '
        }

        props.setViewers(viewer_list)
    }

    const loadComments = (comments) => {

        let comment_tags = []

        for (var i = comments.length - 1; i > -1; i--) {

            let username = reportData.users[comments[i].author].username
            let display_name = reportData.users[comments[i].author].display_name
            let comment_date = moment(comments[i].date).format('DD MMMM yyyy • HH:MM:SS')
            let comment_body = comments[i].body

            let images = []

            if (comments[i].files.length > 0) {
                for (var j = 0; j < comments[i].files.length; j++) {
                    let source = reportData.images[comments[i].files[j]]
                    images.push(<img key={j} onClick={() => { setCurrentImage(source); setShowImage(true) }} src={source} />)
                }
            }

            comment_tags.push(
                <div key={i} className='panel-item'>
                    <div className='panel-item-content'>
                        <div className='comment-images'>
                            {images}
                        </div>
                        <p>{comment_body}</p>
                        <p className='timestamp'>{display_name + ' • ' + comment_date}</p>
                    </div>
                    <div className='panel-user'>
                        <img src={defaultProfileIcon} alt={display_name} />
                    </div>
                </div>
            )
        }

        props.setCommentTags(comment_tags)
    }

    const loadActivities = (data) => {

        let activitiy_tags = []

        for (var i = data.activities.length - 1; i > -1; i--) {
            let text = data.activities[i].activity.join(' ')
            text = text.substring(0, text.length - 1)
            let user = reportData.users[data.activities[i].user].display_name
            let date = moment(data.activities[i].date).format('DD MMMM yyyy • HH:MM:SS')

            activitiy_tags.push(
                <div key={i} className='panel-item'>
                    <div className='panel-item-content'>
                        <p>{text}</p>
                        <p className='timestamp'>{user + ' • ' + date}</p>
                    </div>
                    <div className='panel-user'>
                        <img src={defaultProfileIcon} alt={user} />
                    </div>
                </div>
            )
        }

        props.setActivityTags(activitiy_tags)
    }

    const getFortDetailsByReportId = (report_id) => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3001/api/get-fort-by-report-id/' + report_id,
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${props.bearer}` }
                })
                .then((result) => {
                    resolve(result.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    useEffect(async () => {
        if (!props.bearer) return

        if (props.reportId) {
            let data = await (await getReportDetails(props.reportId)).json()
            if (data.status != 204) {
                if (props.fortId) {
                    let details = await getReportId(props.fortId)

                    for (var i = 0; i < details.forts.length; i++) {
                        if (details.forts[i]._id == props.fortId) {
                            setFortUrl('/forts/' + props.fortId)
                            setReportTitle({ updated: moment(data.report_activities.updatedAt).format('DD MMMM yyyy • HH:MM:SS'), fort_name: details.forts[i].name, author: (data.users[data.report_details.author].display_name), is_latest: !props.isOverview })
                        }
                    }
                } else {
                    let fort_data = await getFortDetailsByReportId(props.reportId)
                    let fort
                    for (var i = 0; i < fort_data.forts.length; i++) {
                        for (var j = 0; j < fort_data.forts[i].reports.length; j++) {
                            if (fort_data.forts[i].reports[j] == props.reportId) {
                                fort = fort_data.forts[i]
                                break
                            }
                        }
                    }
                    setFortUrl('/forts/' + fort._id)
                    setReportTitle({ updated: moment(data.report_activities.updatedAt).format('DD MMMM yyyy • HH:MM:SS'), fort_name: fort.name, author: (data.users[data.report_details.author].display_name) })
                }
            }
            setReportData(data)
        } else {
            let details = await getReportId()
            for (var i = 0; i < details.forts.length; i++) {
                if (details.forts[i]._id == params.id) {
                    if (details.forts[i].reports.length == 0) {
                        props.setIsNewReport(true)
                        let data = await (await getReportDetails(-1)).json()
                        setReportData(data)
                        if (data.report_activities && data.report_details) setReportTitle({ updated: moment(data.report_activities.updatedAt).format('DD MMMM yyyy • HH:MM:SS'), fort_name: details.forts[i].name, author: (data.users[data.report_details.author].display_name) })
                        setReportTitle({ updated: moment(new Date()).format('DD MMMM yyyy • HH:MM:SS'), fort_name: details.forts[i].name, author: 'N/A' })
                    } else {
                        let data = await (await getReportDetails(details.forts[i].reports[details.forts[i].reports.length - 1])).json()
                        props.setCurrentReport(details.forts[i].reports[details.forts[i].reports.length - 1])
                        setReportData(data)
                        setReportTitle({ updated: moment(data.report_activities.updatedAt).format('DD MMMM yyyy • HH:MM:SS'), fort_name: details.forts[i].name, author: (data.users[data.report_details.author].display_name) })
                    }
                    break
                }
            }
        }
    }, [props.bearer])

    useEffect(() => {
        if (reportData) {
            loadFields()
            if (reportData.report_details && !props.reportId) {
                loadViewers(reportData.report_details.viewers)
                loadComments(reportData.report_details.comments)
                loadActivities(reportData.report_activities)
            }
        }
    }, [reportData])

    return (
        <>
            {showImage && <ImageBrowser source={currentImage} onClose={setShowImage} />}
            {props.showAddReportDialog && <ReportForm currentReport={props.currentReport} author={props.author} bearer={props.bearer} unitData={reportData} currentFort={props.currentFort} onClose={props.onClose} createPopup={props.createPopup} />}
            <div className="report">
                <div className="report-header">
                    <div className="report-title">
                        {reportTitle.is_latest ?
                            <>
                                <h4>Latest Report</h4>
                                <p>Reported on <span className='fort-name'>{reportTitle.fort_name}</span> by <span className='author'>{reportTitle.author}</span> <i>Updated at {reportTitle.updated}</i></p>
                            </>
                            :
                            <>
                                <h4>{reportTitle.fort_name}</h4>
                                <p>Reported by <span className='author'>{reportTitle.author}</span> <i>Updated at {reportTitle.updated}</i></p>
                            </>
                        }
                    </div>
                    {props.viewDetails &&
                        <div className="report-action">
                            <a href={fortUrl}>
                                <p>View Details</p>
                                <img className="cta-icon" src={callToActionIcon} alt="" />
                            </a>
                        </div>
                    }
                </div>
                <div className="report-body">
                    <div className="round-1 round">
                        <h5>Round 1</h5>
                        <div className="units">
                            {roundOneUnits}
                        </div>
                    </div>
                    <div className="round-2 round">
                        <h5>Round 2</h5>
                        <div className="units">
                            {roundTwoUnits}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report