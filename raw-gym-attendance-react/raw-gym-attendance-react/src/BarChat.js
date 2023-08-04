import React, {useEffect, useState} from 'react'
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis,Cell} from 'recharts'
// import { Bar } from '@ant-design/plots';
export default function Barchat({graphData}) {
    const [data,setData]=useState([])
const dummy=[
    {name:"Monday",hours:0},
    {name:"Tuesday",hours:0},
    {name:"Wednesday",hours:0},
    {name:"Thursday",hours:0},
    {name:"Friday",hours:0},
    {name:"Saturday",hours:0},
    {name:"Sunday",hours:0}


]
    // const config = {
    //     data,
    //     xField: 'value',
    //     yField: 'year',
    //     seriesField: 'year',
    //     legend: {
    //         position: 'top-left',
    //     },
    // };
    useEffect(()=>{
        const data=dummy.map(d=>{
            let hours=graphData.find(g=>g.name===d.name);
            if(hours){
                return({
                        name:d.name.substring(0,3),
                        hours:hours.hours
                })
            }
            return({
                name:d.name.substring(0,3),
                hours:0
            })
        })
        setData(data)
    },[graphData])
  return (
      data.length !==0 &&
    <div className="barchat">
             <BarChart
                width={400}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                }}
                barSize={20}
            >
            <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Legend />
                {/*<CartesianGrid strokeDasharray="3 3" />*/}
                <Bar dataKey="hours"  fill="#fbd400" />

         </BarChart>

    </div>
    // <Bar {...config} />
  )
}
