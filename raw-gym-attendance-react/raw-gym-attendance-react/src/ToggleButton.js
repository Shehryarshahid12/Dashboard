import {Switch} from 'antd'
import React, {useEffect, useState} from 'react'
import axios from "axios";


export default function ToggleButton({attendanceId,clockIn,clockOut,refreshAttendance,setAttendanceId}) {
    const [checkIn,setCheckIn]=useState(clockIn)
    const [checkOut,setCheckOut]=useState(clockOut)
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        setCheckIn(clockIn)
        setCheckOut(clockOut)
    },[clockIn,clockOut,attendanceId])
    const onChange = async (value) => {
        if (value) {
            await setClockIn()
        } else {
            await setClockOut()
        }
        refreshAttendance()
    }
    const setClockIn = async () => {
        try {
            setLoading(true)
            setCheckIn(true)
            const response = await axios.get('clockIn/' + attendanceId)
            setAttendanceId()
        } catch (e) {

        } finally {
            setLoading(false)

        }
    }
    const setClockOut = async () => {
        try {
            setLoading(true)
            setCheckOut(true)
            setCheckIn(false)
            const response = await axios.get('clockOut/' + attendanceId)
            setAttendanceId()
        } catch (e) {

        } finally {
            setLoading(false)

        }
    }
    return (

        attendanceId && (
            // checkIn && checkOut ?<div className="number-data"><p>Already marked attendance for today.</p></div>:
            <div className='toggle'>
            <Switch loading={loading} onChange={onChange} checked={!!checkIn}
                    checkedChildren="Clock Out" unCheckedChildren="Clock In"/>
        </div>
        )


    )
}
