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
    const [scaleValue2, setscaleValue2] = useState(0);

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
            let tempDeathData = [];
            let maxIncrease = 0;
            let maxDeathIncrease = 0;
            for (let i = 0; i < allStates.length; i++) {
                if (allStates[i].state === id) {
                    console.log(allStates[i]);
                    if (allStates[i].deathIncrease > maxDeathIncrease) {
                        maxDeathIncrease = allStates[i].deathIncrease;
                    }
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
                case maxIncrease < 100:
                    setscaleValue(100);
                    break;
                case maxIncrease < 200:
                    setscaleValue(200);
                    break;
                case maxIncrease < 300:
                    setscaleValue(300);
                    break;
                case maxIncrease < 400:
                    setscaleValue(400);
                    break;
                case maxIncrease < 500:
                    setscaleValue(500);
                    break;
                case maxIncrease < 600:
                    setscaleValue(600);
                    break;
                case maxIncrease < 700:
                    setscaleValue(700);
                    break;
                case maxIncrease < 800:
                    setscaleValue(800);
                    break;
                case maxIncrease < 900:
                    setscaleValue(900);
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

            switch (true) {
                case maxDeathIncrease < 50:
                    setscaleValue2(50);
                    break;
                case maxDeathIncrease < 75:
                    setscaleValue2(75);
                    break;
                case maxDeathIncrease < 100:
                    setscaleValue2(100);
                    break;
                case maxDeathIncrease < 200:
                    setscaleValue2(200);
                    break;
                case maxDeathIncrease < 300:
                    setscaleValue2(300);
                    break;
                case maxDeathIncrease < 400:
                    setscaleValue2(400);
                    break;
                case maxDeathIncrease < 500:
                    setscaleValue2(500);
                    break;
                case maxDeathIncrease < 600:
                    setscaleValue2(600);
                    break;
                case maxDeathIncrease < 700:
                    setscaleValue2(700);
                    break;
                case maxDeathIncrease < 800:
                    setscaleValue2(800);
                    break;
                case maxDeathIncrease < 900:
                    setscaleValue2(900);
                    break;
                case maxDeathIncrease < 1000:
                    setscaleValue2(1000);
                    break;
                case maxDeathIncrease < 3000:
                    setscaleValue2(3000);
                    break;
                case maxDeathIncrease < 5000:
                    setscaleValue2(5000);
                    break;
                default:
                    setscaleValue2(10000);
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

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`New Infected - ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    const CustomTooltip2 = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`New Deaths - ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <Fragment>
            <NavBar />
            <div className="container d-flex justify-content-center">
                <div id="stateInfo">
                    <h1 id="stateName">{stateName} </h1>
                    <h6 id="updatedDate"> Last Updated - {currentDate} </h6>
                    <table id="infoTable">
                        <tbody>

                            <tr>
                                <td className="infoLeft">
                                    Daily Infected Total:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.positiveIncrease === null ? "N/A" : oneState.positiveIncrease}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Daily Death Total:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.deathIncrease === null ? "N/A" : oneState.deathIncrease}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Total Confirmed Deaths:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.deathConfirmed === null ? "N/A" : oneState.deathConfirmed}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Total Hospitalized:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.hospitalizedCumulative === null ? "N/A" : oneState.hospitalizedCumulative}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Currently Hospitalized:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.hospitalizedCurrently === null ? "N/A" : oneState.hospitalizedCurrently}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Daily Hospitalized Total:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.hospitalizedIncrease === null ? "N/A" : oneState.hospitalizedIncrease}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Total In ICU:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.inIcuCumulative === null ? "N/A" : oneState.inIcuCumulative}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Currently In ICU:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.inIcuCurrently === null ? "N/A" : oneState.inIcuCurrently}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Total Recovered:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.recovered === null ? "N/A" : oneState.recovered}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Total Ever On Ventilator:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.onVentilatorCumulative === null ? "N/A" : oneState.onVentilatorCumulative}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Still On Ventilator:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.onVentilatorCurrently === null ? "N/A" : oneState.onVentilatorCurrently}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Total Tested:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.totalTestResults === null ? "N/A" : oneState.totalTestResults}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Daily Tested:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.totalTestResultsIncrease === null ? "N/A" : oneState.totalTestResultsIncrease}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Total Negative Tests:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.negative === null ? "N/A" : oneState.negative}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="infoLeft">
                                    Daily Negative Tests:
                            </td>
                                <td className="infoRight">
                                    <span >{oneState.negativeIncrease === null ? "N/A" : oneState.negativeIncrease}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="stateImg">
                    <img src={`/assets/${imgId}.png`}></img>
                </div>
                <div>
                    <div id="graphData">
                        <LineChart
                            width={550}
                            height={400}
                            data={graphData}
                            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                        >
                            {/* <CartesianGrid stroke="#f5f5f5" /> */}
                            {/* <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={style} /> */}
                            <Tooltip content={<CustomTooltip />} />
                            <XAxis stroke="black">
                                <Label style={{ fill: 'black' }} position="insideBottom" offset={-20}>Last 30 Days</Label>
                            </XAxis>
                            {/* width={130} */}
                            <YAxis domain={[0, scaleValue]} stroke="black" allowDataOverflow >
                                <Label style={{ fill: 'black', textAnchor: 'middle' }} position="insideLeft" offset={-10} angle={270} > Number of New Infected</Label>
                            </YAxis>
                            <Line type="monotone" stroke="red" dataKey="positiveIncrease" dot={false} activeDot={{ fill: 'white', stroke: 'black', r: 6 }} />
                            {/* <Line type="monotone" dataKey="positiveIncrease" activeDot={{ fill: '#387908', stroke: 'none', r: 6 }} /> */}
                        </LineChart>
                    </div>

                    <div id="graphData2">
                        <LineChart
                            width={550}
                            height={400}
                            data={graphData}
                            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                        >
                            {/* <CartesianGrid stroke="#f5f5f5" /> */}
                            {/* <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={style} /> */}
                            <Tooltip content={<CustomTooltip2 />} />
                            <XAxis stroke="black">
                                <Label style={{ fill: 'black' }} position="insideBottom" offset={-20}>Last 30 Days</Label>
                            </XAxis>
                            {/* width={130} */}
                            <YAxis domain={[0, scaleValue2]} stroke="black" allowDataOverflow >
                                <Label style={{ fill: 'black', textAnchor: 'middle' }} position="insideLeft" offset={-10} angle={270} > Number of New Deaths</Label>
                            </YAxis>
                            <Line type="monotone" stroke="red" dataKey="deathIncrease" dot={false} activeDot={{ fill: 'white', stroke: 'black', r: 6 }} />
                            {/* <Line type="monotone" dataKey="positiveIncrease" activeDot={{ fill: '#387908', stroke: 'none', r: 6 }} /> */}
                        </LineChart>
                    </div>

                </div>
            </div>
        </Fragment>


    );
}

export default statePage