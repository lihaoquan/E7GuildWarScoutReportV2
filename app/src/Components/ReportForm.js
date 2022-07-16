import React, { useEffect, useState } from 'react'
import axios from 'axios'

import closeIcon from '../Images/close-01.svg'

import UnitInput from './ReportForm_Unit'

const ReportForm = (props) => {

    const handleSubmit = (e) => {

        e.preventDefault()

        axios.post('http://localhost:3001/api/update-report', { ...units, author: props.author, report_id: props.currentReport, fort_id: props.currentFort },
            {
                withCredentials: true,
                headers: { Authorization: `Bearer ${props.bearer}` }
            })
            .then(function (response) {
                props.createPopup('Successfully updated report.', true)
                props.onClose(false)
            }).catch(function (error) {
                props.createPopup('Failed to update report.', false)
                props.onClose(false)
            })
    }

    const [units, setUnits] = useState({
        unit_1: '',
        unit_1_id: '',
        unit_1_speed: '',
        unit_1_health: '',
        unit_1_artifact: '',
        unit_1_artifact_id: '',
        unit_1_item_set: '',

        unit_2: '',
        unit_2_id: '',
        unit_2_speed: '',
        unit_2_health: '',
        unit_2_artifact: '',
        unit_2_artifact_id: '',
        unit_2_item_set: '',

        unit_3: '',
        unit_3_id: '',
        unit_3_speed: '',
        unit_3_health: '',
        unit_3_artifact: '',
        unit_3_artifact_id: '',
        unit_3_item_set: '',

        unit_4: '',
        unit_4_id: '',
        unit_4_speed: '',
        unit_4_health: '',
        unit_4_artifact: '',
        unit_4_artifact_id: '',
        unit_4_item_set: '',

        unit_5: '',
        unit_5_id: '',
        unit_5_speed: '',
        unit_5_health: '',
        unit_5_artifact: '',
        unit_5_artifact_id: '',
        unit_5_item_set: '',

        unit_6: '',
        unit_6_id: '',
        unit_6_speed: '',
        unit_6_health: '',
        unit_6_artifact: '',
        unit_6_artifact_id: '',
        unit_6_item_set: ''
    })

    useEffect(() => {
        if (props.unitData.report_details) {

            let data = {}

            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 3; j++) {

                    let unit_number = j + 1 + (i * 3)

                    let unit = props.unitData.report_details.unit_data.rounds[i].units[j] || null

                    if (unit) {
                        data = {
                            ...data,
                            ['unit_' + unit_number]: props.unitData.units[unit.unit].unit_name,
                            ['unit_' + unit_number + '_id']: unit.unit,
                            ['unit_' + unit_number + '_speed']: unit.speed,
                            ['unit_' + unit_number + '_health']: unit.health,
                            ['unit_' + unit_number + '_artifact']: props.unitData.artifacts[unit.artifact].artifact_name,
                            ['unit_' + unit_number + '_artifact_id']: props.unitData.artifacts[unit.artifact]._id,
                            ['unit_' + unit_number + '_item_set']: unit.item_set
                        }
                    } else {
                        data = {
                            ...data, ['unit_' + unit_number]: props.unitData.unit_list[0].unit_name,
                            ['unit_' + unit_number + '_id']: props.unitData.unit_list[0]._id,
                            ['unit_' + unit_number + '_speed']: 0,
                            ['unit_' + unit_number + '_health']: 0,
                            ['unit_' + unit_number + '_artifact']: props.unitData.artifact_list[0].artifact_name,
                            ['unit_' + unit_number + '_artifact_id']: props.unitData.artifact_list[0]._id,
                            ['unit_' + unit_number + '_item_set']: 'None'
                        }
                    }
                }
            }
            setUnits(data)
        } else {
            let data = {}
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 3; j++) {

                    let unit_number = j + 1 + (i * 3)
                    data = {
                        ...data, ['unit_' + unit_number]: props.unitData.unit_list[0].unit_name,
                        ['unit_' + unit_number + '_id']: props.unitData.unit_list[0]._id,
                        ['unit_' + unit_number + '_speed']: 0,
                        ['unit_' + unit_number + '_health']: 0,
                        ['unit_' + unit_number + '_artifact']: props.unitData.artifact_list[0].artifact_name,
                        ['unit_' + unit_number + '_artifact_id']: props.unitData.artifact_list[0]._id,
                        ['unit_' + unit_number + '_item_set']: 'None'
                    }
                }
            }
            setUnits(data)
        }
    }, [props.unitData])

    return (
        <>
            <form className='full-page-small height dialog' onSubmit={handleSubmit}>
                <div className='form-title'>
                    <h3>New Guild War Record</h3>
                    <img src={closeIcon} alt='' onClick={() => { props.onClose(false) }} />
                </div>
                <div className='form-scroll'>
                    <div className='form-large-group'>
                        <h4 className='label-header'>R1 - Unit 1</h4>
                        <UnitInput unit_list={props.unitData.unit_list} artifact_list={props.unitData.artifact_list} i={1} setUnits={setUnits} units={units} />
                        <h4 className='label-header'>R1 -Unit 2</h4>
                        <UnitInput unit_list={props.unitData.unit_list} artifact_list={props.unitData.artifact_list} i={2} setUnits={setUnits} units={units} />
                        <h4 className='label-header'>R1 - Unit 3</h4>
                        <UnitInput unit_list={props.unitData.unit_list} artifact_list={props.unitData.artifact_list} i={3} setUnits={setUnits} units={units} />
                        <h4 className='label-header'>R2 - Unit 1</h4>
                        <UnitInput unit_list={props.unitData.unit_list} artifact_list={props.unitData.artifact_list} i={4} setUnits={setUnits} units={units} />
                        <h4 className='label-header'>R2 - Unit 2</h4>
                        <UnitInput unit_list={props.unitData.unit_list} artifact_list={props.unitData.artifact_list} i={5} setUnits={setUnits} units={units} />
                        <h4 className='label-header'>R2 - Unit 3</h4>
                        <UnitInput unit_list={props.unitData.unit_list} artifact_list={props.unitData.artifact_list} i={6} setUnits={setUnits} units={units} />
                    </div>
                </div>
                <input type='submit' name='new_record' value='Update Report' />
            </form>
        </>
    )
}

export default ReportForm