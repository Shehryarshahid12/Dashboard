import React, {useEffect, useState} from "react";
import logo from "./images/logo-dark-1-1.png";
import SearchField from "./SearchField";
import ToggleButton from "./ToggleButton";
import Clock from "react-digital-clock";
import BarChart from './BarChat';
import axios from "axios";
import Button from "antd/es/button";
import {Spin} from "antd";
import {CiUser} from "react-icons/ci";
import LoginPage from "./LoginPage";
import {getCookie} from "./config/cookie";


export default function CheckinOutSystem() {
    // -------------Login start
    const [isLoggedIn, setIsLoggedIn]=useState(false)
    // -------------Login end
    const [attendanceId, setAttendanceId] = useState(null)
    const [clockIn, setClockIn] = useState(null)
    const [clockOut, setClockOut] = useState(null)
    const [loading, setLoading] = useState(false)
    const [memberLoading, setMemberLoading] = useState(false)
    const [todayAttendance, setTodayAttendance] = useState([])
    const [member,setMember]=useState(null)
    const[lastVisitHours,setLastVisitHours]=useState(0)
    const[monthHours,setMonthHours]=useState(0)
    const[weekHours,setWeekHours]=useState(0)
    const [graphData,setGraphData]=useState([])
    const [clockoutLoading,setClockoutLoading]=useState(false)
    const setAttendance = (data) => {
        const {clock_in, clock_out, id,member} = data.attendance
        const {lastVisitHours,monthHours,weekHours,graphData}=data
        setLastVisitHours(lastVisitHours)
        setAttendanceId(id)
        setClockIn(clock_in)
        setClockOut(clock_out)
        setMember(member)
        setMonthHours(monthHours)
        setWeekHours(weekHours)
        setGraphData(graphData)
    }

    useEffect(() => {
        setIsLoggedIn(getCookie("userLoggedIn"))
        console.log("checkin logged in", getCookie("userLoggedIn"))
        console.log("logged", isLoggedIn)
    },[])
    
    const LoginHandler=()=>{
        setIsLoggedIn(getCookie("userLoggedIn"))
    }

    useEffect(() => {
        getTodayAttendance()
        
    }, [])
    const getTodayAttendance = async () => {
        try {
            setLoading(true)
            const response = await axios('todayAttendance')
            setTodayAttendance(response.data.attendances)
        } catch (e) {

        } finally {
            setLoading(false)
        }
    }
    const handleClockOut = async (id) => {
        try {
            setClockoutLoading(true)
            const response = await axios.get('clockOut/' + id)
        } catch (e) {

        } finally {
            setClockoutLoading(false)
            await getTodayAttendance()
        }
    }
    return (
        <div className="facio-main">

            {isLoggedIn=="true"?
                <>
                    <div className="facio">
                        <img src={logo} alt=" LOading"/>
                        <h2>Attendance Portal</h2>
                        <div className="clock">
                            <Clock/>
                        </div>
                        <div className="facio-logo">
                            <SearchField unSetMemberLoading={()=>setMemberLoading(false)} setMemberLoading={()=>setMemberLoading(true)} setAttendance={setAttendance}/>
                        </div>
                        {
                            memberLoading?<Spin/>:   <> <div className="buttons-checkin">
                                <ToggleButton  refreshAttendance={() => getTodayAttendance()} attendanceId={attendanceId} setAttendanceId={()=> {
                                    setAttendanceId(null)
                                    setMember(null)
                                }}
                                            clockIn={clockIn} clockOut={clockOut}/>
                                {/*<CheckInButton title="Check In"/>*/}
                            </div>
                        {
                            member &&
                            <div className="number-data">
                            <h3>Name:{member?.name}</h3>
                            <h3> Last Visit : {lastVisitHours}</h3>
                            <h3> This Week : {weekHours}</h3>
                            <h3>This Month :{monthHours}</h3>
                            </div>
                        }
                        </>
                        }

                        {
                            member &&
                            <div className="buttons-checkout">
                                {/* <CheckoutButton title="Check Out"/>*/}
                                <BarChart graphData={graphData}/>

                            </div>
                        }

                    </div>
                    <>
                        {
                            !loading ? (todayAttendance.length !== 0 ?
                                <div className="UserData">
                                    <table>
                                        <tr>
                                            <th>TODAY CLOCK IN USERS</th>
                                            <th>CLOCK OUT</th>
                                        </tr>
                                        {todayAttendance.map(attendance => {
                                            if(!attendance.clock_out)
                                            return (
                                                <tr>
                                                    
                                                    {console.log("attendance clock out ",attendance)}
                                                    {/* <td>{attendance.member.name}</td>
                                                    {
                                                        !attendance.clock_out ?
                                                        <td><Button loading={clockoutLoading} onClick={() => handleClockOut(attendance.id)}>
                                                            Clock Out <CiUser/>
                                                        </Button></td>:<td><BsFillPersonCheckFill/> {attendance.clock_out}</td>
                                                    } */}

                                                    {/* {
                                                        !attendance.clock_out && */}
                                                        <>
                                                            <td>{attendance.member.name}</td>
                                                            <td><Button loading={clockoutLoading} onClick={() => handleClockOut(attendance.id)}>
                                                                Clock Out <CiUser/>
                                                            </Button></td>
                                                        </>
                                                    {/* } */}
                                                </tr>
                                            )
                                        })}


                                    </table>
                                </div>
                                : <p>No Attendance for today</p>) :  <div className="UserData">
                                <table>
                                    <tr>
                                        <th>TODAY CLOCK IN USERS</th>
                                        <th>CLOCK OUT</th>

                                    </tr>
                                    <tr>
                                        <td><Spin/></td>
                                        <td><Spin/></td>
                                    </tr>


                                </table>
                            </div>
                        }
                    </>
                </>:
                <LoginPage LoginHandler={LoginHandler}/>
            }
        </div>
    );
}
