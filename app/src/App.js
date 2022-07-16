import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import SideBar from './Components/SideBar'
import Notice from './Components/Notice'
import RecordBrowser from './Components/RecordBrowser'
import MainPanel from './Components/MainPanel'
import Report from './Components/Report'
import ReportPanel from './Components/ReportPanel'
import ReportSubPanels from './Components/ReportSubPanels'
import GuildMatchupDivider from './Components/GuildMatchupDivider'
import LazyLoadCTA from './Components/LazyLoadCTA'
import CommentsBrowser from './Components/CommentsBrowser'
import RecordForm from './Components/RecordForm'
import Popup from './Components/Popup'
import CommentForm from './Components/CommentForm'
import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import ViewerBrowser from './Components/ViewerBrowser'
import AnnouncementForm from './Components/AnnouncementForm'

import guildWarIcon from './Images/latest-guild-war-01.svg'
import guildWarIconAlt from './Images/latest-guild-war-02.svg'
import myReportsIcon from './Images/my-reports-01.svg'
import myReportsIconAlt from './Images/my-reports-02.svg'
import myCommentsIcon from './Images/my-comments-01.svg'
import myCommentsIconAlt from './Images/my-comments-02.svg'

function App() {

  const HOME_PAGE = '/'

  const PAGES = [
    { page_title: 'Latest Guild War', link: '/guild-war', icon: guildWarIcon, active_icon: guildWarIconAlt },
    { page_title: 'My Reports', link: '/my-reports', icon: myReportsIcon, active_icon: myReportsIconAlt },
    { page_title: 'My Comments', link: '/my-comments', icon: myCommentsIcon, active_icon: myCommentsIconAlt },
  ]

  const pathToId = () => {
    switch (window.location.pathname) {
      case '/':
        return 'home'
      case '/guild-war':
        return 'report'
      case '/my-reports':
      case '/my-comments':
        return 'my-items'
      default:
        return null
    }
  }

  const [hideNotice, setTriggerHideNotice] = useState(false)
  const [records, setRecords] = useState([])
  const [currentReport, setCurrentReport] = useState(null)
  const [currentRecord, setCurrentRecord] = useState(null)
  const [currentFort, setCurrentFort] = useState(null)
  const [fortReportCount, setFortReportCount] = useState({})
  const [showCreateRecordDialog, setShowCreateRecordDialog] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const [popupType, setPopupType] = useState(false)
  const [isNewReport, setIsNewReport] = useState(false)
  const [showAddReportDialog, setShowAddReportDialog] = useState(false)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState({})
  const [commentTags, setCommentTags] = useState([])
  const [activityTags, setActivityTags] = useState([])
  const [viewers, setViewers] = useState('')
  const [showViewerBrowser, setShowViewerBrowser] = useState(false)
  const [latestReportId, setLatestReportId] = useState({})
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const [totalCount, setTotalCount] = useState(0)
  const [latestGuildWarReportTags, setLatestGuildWarReportTags] = useState([])
  const [myReport, setMyReportTags] = useState([])
  const [myComment, setMyCommentTags] = useState([])

  const selectReport = (record_id) => {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3001/api/record/' + record_id, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${loggedInUser.token}` }
      })
        .then(res => res.json())
        .then(
          (result) => {
            setCurrentRecord(result)
            resolve()
          })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const createRecordDialog = () => {
    setShowCreateRecordDialog(true)
  }

  const createPopup = (message, success) => {
    setPopupMessage(message)
    setPopupType(success)
    setShowPopup(true)
  }

  const logout = () => {
    fetch('http://localhost:3001/logout', {
      credentials: 'include'
    })
      .then(
        (result) => {
          if (result.status === 204) setLoggedInUser({})
        })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (hideNotice) {
      document.body.classList.add('notice-hidden')
    }
  }, [hideNotice])

  useEffect(() => {

    fetch('http://localhost:3001/refresh', {
      credentials: 'include'
    })
      .then(async (result) => {
        if (result.status === 401 || result.status === 500) return
        setLoggedInUser(await result.json())
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    if (loggedInUser.token) {
      axios.get('http://localhost:3001/api/records', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${loggedInUser.token}` }
      })
        .then((result) => {
          setRecords(result.data)
        })
        .catch((err) => {
          console.log(err)
        })

      fetch('http://localhost:3001/api/get-latest-announcement', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${loggedInUser.token}` }
      })
        .then(async (result) => {
          if (result.status === 401 || result.status === 204) return
          setAnnouncement((await result.json()).text)
        })
        .catch((err) => {
          console.error(err)
        })
    }
    else setRecords({})
  }, [loggedInUser])

  useEffect(() => {
    if (window.location.pathname == '/guild-war') {
      if (records[records.length - 1]?._id) {
        setCurrentRecord(records[records.length - 1])
        let record = records[records.length - 1].forts
        let report_tags = []
        for (var i = 0; i < record.length; i++) {
          for (var j = 0; j < record[i].reports.length; j++) {
            report_tags.push(
              <Report key={uuidv4()} viewDetails={true} reportId={record[i].reports[j]} fortId={record[i]._id} bearer={loggedInUser.token} isOverview={true} />
            )
          }
        }
        setLatestGuildWarReportTags(report_tags)
      }
    }
    if (window.location.pathname == '/my-comments') {
      if (!loggedInUser.token) return
      axios.get('http://localhost:3001/api/my-comments/' + loggedInUser.username, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${loggedInUser.token}` }
      })
        .then((result) => {
          let report_meta = {}
          let comment_tags = []
          let reports = result.data.reports
          let records = result.data.records

          for (var i = 0; i < records.length; i++) {
            for (var j = 0; j < records[i].forts.length; j++) {
              for (var k = 0; k < records[i].forts[j].reports.length; k++) {
                if (!report_meta[records[i].forts[j].reports[k]]) {
                  report_meta[records[i].forts[j].reports[k]] = { enemyGuild: records[i].enemyGuild, date: records[i].date, _id: records[i]._id, fort: records[i].forts[j].name, fort_id: records[i].forts[j]._id }
                }
              }
            }
          }

          let comments = {}
          for (var i = 0; i < reports.length; i++) {
            for (var j = 0; j < reports[i].comments.length; j++) {
              if (reports[i].comments[j].author == loggedInUser._id) {
                if (!comments[reports[i]._id]) comments[reports[i]._id] = { comments: [] }
                comments[reports[i]._id].comments.push({ report_id: reports[i]._id, comment: reports[i].comments[j], fort: report_meta[reports[i]._id].fort, fort_id: report_meta[reports[i]._id].fort_id })
              }
            }
          }

          for (var i = 0; i < Object.keys(comments).length; i++) {
            let metadata = report_meta[comments[Object.keys(comments)[i]].comments[0].report_id]
            comment_tags.push(
              <GuildMatchupDivider key={uuidv4()} recordDate={metadata.date} myGuild='KnightCode' enemyGuild={metadata.enemyGuild} />,
              <CommentsBrowser key={uuidv4()} fortId={metadata.fort_id} fortName={metadata.fort} comments={comments[Object.keys(comments)[i]].comments} />
            )
          }

          setMyCommentTags(comment_tags)
        })
    }
    if (window.location.pathname == '/my-reports') {
      if (!loggedInUser.token) return
      axios.get('http://localhost:3001/api/my-reports/' + loggedInUser.username, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${loggedInUser.token}` }
      })
        .then((result) => {
          let report_meta = {}
          let report_tags = []
          let reports = result.data.reports
          let records = result.data.records

          for (var i = 0; i < records.length; i++) {
            for (var j = 0; j < records[i].forts.length; j++) {
              for (var k = 0; k < records[i].forts[j].reports.length; k++) {
                if (!report_meta[records[i].forts[j].reports[k]]) {
                  report_meta[records[i].forts[j].reports[k]] = { enemyGuild: records[i].enemyGuild, date: records[i].date }
                }
              }
            }
          }

          for (var i = 0; i < reports.length; i++) {
            report_tags.push(
              <GuildMatchupDivider enemyGuild={report_meta[reports[i]._id].enemyGuild} recordDate={report_meta[reports[i]._id].date} key={uuidv4()} myGuild='KnightCode' />,
              <Report key={uuidv4()} viewDetails={true} reportId={reports[i]._id} bearer={loggedInUser.token} />
            )
          }
          setMyReportTags(report_tags)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [records])

  useEffect(() => {

    setLatestReportId(null)

    if (!currentRecord) return

    if (window.location.pathname != '/guild-war') {
      let report_counts = {}
      let total_count = 0
      let forts = []
      for (var i = 0; i < currentRecord.forts.length; i++) {
        report_counts[i] = currentRecord.forts[i].reports.length || 0
        total_count += currentRecord.forts[i].reports.length
        forts.push(currentRecord.forts[i]._id)
        setTotalCount(total_count)
      }

      axios.get('http://localhost:3001/api/get-latest-report', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
        params: {
          forts
        }
      })
        .then((result) => {
          if (result.status == 200) {
            let report_id = result.data.report_id
            setLatestReportId({ report_id, fort_id: result.data.fort_id })
          }
        })
        .catch((err) => {
          console.log(err)
        })

      setFortReportCount(report_counts)
    }
  }, [currentRecord])

  return (
    <Router>
      <div className='App' id={pathToId()}>
        <div className='wrapper'>
          <div className='content-container'>
            {showPopup && <Popup message={popupMessage} success={popupType} onClose={setShowPopup} />}
            {showLoginForm && <LoginForm setLoggedInUser={setLoggedInUser} createPopup={createPopup} onClose={setShowLoginForm} />}
            {showRegisterForm && <RegisterForm createPopup={createPopup} onClose={setShowRegisterForm} />}
            <SideBar displayName={loggedInUser.display_name} role={loggedInUser.role} logout={logout} setShowLoginForm={setShowLoginForm} setShowRegisterForm={setShowRegisterForm} isLoggedIn={loggedInUser.username != null} currentPage={window.location.pathname} homePage={HOME_PAGE} pages={PAGES} />
            <main>
              {showAnnouncementForm && <AnnouncementForm createPopup={createPopup} bearer={loggedInUser.token} onClose={setShowAnnouncementForm} author={loggedInUser.username} />}
              {!hideNotice &&
                <Notice text={announcement} onClick={setShowAnnouncementForm} triggerHideNotice={setTriggerHideNotice} hideNotice={hideNotice} />
              }
              <Routes>
                <Route path='/' element=
                  {
                    <>
                      {showCreateRecordDialog && <RecordForm bearer={loggedInUser.token} onClose={setShowCreateRecordDialog} createPopup={createPopup} />}
                      <RecordBrowser records={records} onChange={selectReport} fortReportCount={fortReportCount} currentRecord={currentRecord} />
                      <MainPanel reportCount={totalCount} onClick={createRecordDialog} />
                      {latestReportId && <Report setLatestReportId={setLatestReportId} viewDetails={true} reportId={latestReportId.report_id} fortId={latestReportId.fort_id} setCurrentReport={setCurrentReport} bearer={loggedInUser.token} setIsNewReport={setIsNewReport} />}
                    </>
                  }
                />
                <Route path='/guild-war' element={
                  <>
                    <GuildMatchupDivider myGuild='KnightCode' enemyGuild={currentRecord?.enemyGuild} recordDate={currentRecord?.date} />
                    {latestGuildWarReportTags}
                  </>
                }
                />
                <Route path='/my-reports' element={
                  <>
                    {myReport}
                  </>
                } />
                <Route path='/my-comments' element={
                  <>
                    {myComment}
                  </>
                } />
                <Route path='/forts/:id' element=
                  {
                    <>
                      {showCommentForm && <CommentForm createPopup={createPopup} author={loggedInUser.username} bearer={loggedInUser.token} onClose={setShowCommentForm} currentFort={currentFort} />}
                      <Report setViewers={setViewers} setCurrentReport={setCurrentReport} currentReport={currentReport} author={loggedInUser.username} setCommentTags={setCommentTags} setActivityTags={setActivityTags} bearer={loggedInUser.token} setIsNewReport={setIsNewReport} setCurrentFort={setCurrentFort} showAddReportDialog={showAddReportDialog} currentFort={currentFort} onClose={setShowAddReportDialog} createPopup={createPopup} />
                      {showViewerBrowser && <ViewerBrowser viewers={viewers} onClose={setShowViewerBrowser} />}
                      <ReportPanel viewers={viewers} onClick={setShowAddReportDialog} onClickView={setShowViewerBrowser} isNewReport={isNewReport} />
                      <ReportSubPanels commentTags={commentTags} activityTags={activityTags} onClick={setShowCommentForm} />
                    </>
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router >
  );
}

export default App