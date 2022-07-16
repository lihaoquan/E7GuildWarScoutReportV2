import React, { useEffect } from 'react'

const ReportForm_Unit = (props) => {

    let unit_selection = [],
        artifact_selection = []

    for (var i = 0; i < props.unit_list.length; i++) {
        unit_selection.push(<option key={i} value={props.unit_list[i]._id}>{props.unit_list[i].unit_name}</option>)
    }

    for (var i = 0; i < props.artifact_list.length; i++) {
        artifact_selection.push(<option key={i} value={props.artifact_list[i]._id}>{props.artifact_list[i].artifact_name}</option>)
    }

    return (
        <>
            <div className='form-group unit-form'>
                <label>Unit</label>
                <select value={props.units['unit_' + props.i + '_id']} onChange={(e) => { props.setUnits({ ...props.units, ['unit_' + props.i + '_id']: e.target.value }) }}>
                    {unit_selection}
                </select>
                <label>Speed</label>
                <input onChange={(e) => { props.setUnits({ ...props.units, ['unit_' + props.i + '_speed']: e.target.value }) }} value={props.units['unit_' + props.i + '_speed']} type='text' placeholder='Unit Speed' />
                <label>Health</label>
                <input onChange={(e) => { props.setUnits({ ...props.units, ['unit_' + props.i + '_health']: e.target.value }) }} value={props.units['unit_' + props.i + '_health']} type='text' placeholder='Unit Health' />
                <label>Artifact</label>
                <select value={props.units['unit_' + props.i + '_artifact_id']} onChange={(e) => { props.setUnits({ ...props.units, ['unit_' + props.i + '_artifact_id']: e.target.value }) }}>
                    {artifact_selection}
                </select>
                <label>Item Set</label>
                <input onChange={(e) => { props.setUnits({ ...props.units, ['unit_' + props.i + '_item_set']: e.target.value }) }} value={props.units['unit_' + props.i + '_item_set']} type='text' placeholder='Unit Item Set' />
            </div>
        </>
    )
}

export default ReportForm_Unit