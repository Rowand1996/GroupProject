import React, { useState, useEffect, Fragment } from "react";
import NavBar from "./NavBar.jsx";
import { useParams } from "react-router-dom";
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList
} from 'recharts';
import { scalePow, scaleLog } from 'd3-scale';

const statePage = () => {
    let { id } = useParams();

    const [stateName, setStateName] = useState("");
    const [stateId, setStateId] = useState("");

    const [currentDate, setCurrentDate] = useState("");
    const [oneState, setOneState] = useState({});
    const [graphData, setgraphData] = useState([]);
    const [scaleValue, setscaleValue] = useState(0);

    const style = {
        lineHeight: '24px',
        left: 420,
    };



    useEffect(() => {
        (async () => {
            let res = await fetch(`http://localhost:3000/api/state/${id}`)
            let state = await res.json();
            let statesRes = await fetch('https://covidtracking.com/api/states/daily');
            let allStates = await statesRes.json();
            setStateId(id);
            setStateName(state[0].stateName);
            let todaysDate = allStates[0]?.date;
            for (let i = 0; i < allStates.length; i++) {
                if (allStates[i].date === parseInt(todaysDate)) {
                    if (allStates[i].state === id) {
                        setOneState(allStates[i]);
                        let dd = allStates[i].date.toString().substring(6);
                        let mm = allStates[i].date.toString().substring(4, 6);
                        let yyyy = allStates[i].date.toString().substring(0, 4);
                        let newDate = dd + "/" + mm + "/" + yyyy;
                        setCurrentDate(newDate);
                        break;
                    }
                } else {
                    return
                }
            }
            let tempData = [];
            let maxIncrease = 0;
            for (let i = 0; i < allStates.length; i++) {
                if (allStates[i].state === id) {
                    if (allStates[i].positiveIncrease > maxIncrease) {
                        maxIncrease = allStates[i].positiveIncrease;
                    }
                    tempData.push(allStates[i])
                    if (tempData.length === 30) {
                        break;
                    }
                }
            }
            switch (true) {
                case maxIncrease < 500:
                    setscaleValue(500);
                    break;
                case maxIncrease < 1000:
                    setscaleValue(1000);
                    break;
                case maxIncrease < 3000:
                    setscaleValue(3000);
                    break;
                case maxIncrease < 5000:
                    setscaleValue(5000);
                    break;
                case maxIncrease < 10000:
                    setscaleValue(10000);
                    break;
                case maxIncrease < 15000:
                    setscaleValue(15000);
                    break;
                default:
                    setscaleValue(20000);
                    break;
            }
            setgraphData(tempData.reverse());
        })();
    }, []);


    let imgId = "";
    switch (true) {
        case oneState.positiveIncrease < 500:
            imgId = stateId + "-1"
            break;
        case oneState.positiveIncrease < 1000:
            imgId = stateId + "-2"
            break;
        case oneState.positiveIncrease < 3500:
            imgId = stateId + "-3"
            break;
        case oneState.positiveIncrease < 10000:
            imgId = stateId + "-4"
            break;
        case oneState.positiveIncrease < 100000:
            imgId = stateId + "-5"
            break;

        default:
            imgId = stateId + "-1"
            break;
    }

    return (
        <Fragment>
            <NavBar />
            <div className="container">
                <div id="stateInfo">
                    <h1 id="stateName">{stateName} </h1>
                    <h6 id="updatedDate"> Last Updated - {currentDate} </h6>
                    <p>Daily Infected Total - {oneState.positiveIncrease === null ? "N/A" : oneState.positiveIncrease}</p>
                    <p>Daily Death Total - {oneState.deathIncrease === null ? "N/A" : oneState.deathIncrease}</p>
                    <p>Total Confirmed Deaths - {oneState.deathConfirmed === null ? "N/A" : oneState.deathConfirmed}</p>
                    <p>Total Hospitalized - {oneState.hospitalizedCumulative === null ? "N/A" : oneState.hospitalizedCumulative}</p>
                    <p>Currently Hospitalized - {oneState.hospitalizedCurrently === null ? "N/A" : oneState.hospitalizedCurrently}</p>
                    <p>Daily Hospitalized Total - {oneState.hospitalizedIncrease === null ? "N/A" : oneState.hospitalizedIncrease}</p>
                    <p>Total In ICU - {oneState.inIcuCumulative === null ? "N/A" : oneState.inIcuCumulative}</p>
                    <p>Currently In ICU - {oneState.inIcuCurrently === null ? "N/A" : oneState.inIcuCurrently}</p>
                    <p>Total Recovered - {oneState.recovered === null ? "N/A" : oneState.recovered}</p>
                    <p>Total Ever On Ventilator - {oneState.onVentilatorCumulative === null ? "N/A" : oneState.onVentilatorCumulative}</p>
                    <p>Still On Ventilator - {oneState.onVentilatorCurrently === null ? "N/A" : oneState.onVentilatorCurrently}</p>
                    <p>Total Tested - {oneState.totalTestResults === null ? "N/A" : oneState.totalTestResults}</p>
                    <p>Daily Tested - {oneState.totalTestResultsIncrease === null ? "N/A" : oneState.totalTestResultsIncrease}</p>
                    <p>Total Negative Tests - {oneState.negative === null ? "N/A" : oneState.negative}</p>
                    <p>Daily Negative Tests - {oneState.negativeIncrease === null ? "N/A" : oneState.negativeIncrease}</p>
                </div>
                <div id="stateImg">
                    <img src={`/assets/${imgId}.png`}></img>
                </div>
                <div id="graphData">
                    <LineChart
                        width={550}
                        height={400}
                        data={graphData}
                        margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
                    >
                        {/* <CartesianGrid stroke="#f5f5f5" /> */}
                        {/* <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={style} /> */}
                        <Tooltip />
                        <XAxis>
                            <Label position="insideBottom"  offset={-20}>Last 30 Days</Label>
                        </XAxis>
                        <YAxis domain={[0, scaleValue]} allowDataOverflow width={130}> 
                            <Label  position="center" offset={0} angle={270} > Number of New Infected</Label>
                        </YAxis>
                        <Line type="monotone" stroke="red" dataKey="positiveIncrease" dot={false} activeDot={{ fill: 'white', stroke: 'black', r: 6 }} />
                        {/* <Line type="monotone" dataKey="positiveIncrease" activeDot={{ fill: '#387908', stroke: 'none', r: 6 }} /> */}
                    </LineChart>
                </div>
            </div>
        </Fragment>


    );
}

export default statePage