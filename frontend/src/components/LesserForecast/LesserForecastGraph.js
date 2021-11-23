import React from 'react'
import './LesserForecast.css'
import moment from 'moment'
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
} from "recharts";

const LesserForecastGraph = (data) => {



    // Customises the graphs ticks on the X-axis
    const CustomizedAxisTick = ({ x, y, payload }) => {
        const dateTip = moment(payload.value)
            .format("YYYY-MM-DD")
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={23} y={0} dy={14} fontSize="0.90em" fontFamily="bold" textAnchor="end" fill="#363636">
                    {dateTip}</text>
            </g>
        );
    }

    // Customises the graphs tooltips box
    const CustomTooltip = ({ active, payload, label }) => {
        const dateTip = moment(label)
            .format("ll")
            .slice(0, 12);
        const formattedDate = dateTip
        if (payload === null) return
        if (active)
            return (
                <div className="custom-tooltip">
                    <p className="label-tooltip">{`${formattedDate}`}</p>
                    <p className="desc-tooltip">
                        <span className="value-tooltip">Price: {payload[0].value.toLocaleString()}</span>
                    </p>
                </div>
            );
        return null;
    };



    return (
        <div className="forecast-graph">
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={Object.values(data.lesserForecastGraph)}>
                    <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2451B7" stopOpacity={0.8} />
                        <stop offset="75%" stopColor="#2451B7" stopOpacity={0.2} />
                    </linearGradient>
                    </defs>
                    <Area dataKey="yhat" stroke="#2451B7" fill="url(#color)" />
                    <XAxis
                        dataKey="ds"
                        tick={CustomizedAxisTick}
                    />
                    <YAxis
                        dataKey="yhat"
                        axisLine={false}
                        tickLine={false}
                        tickCount={8}
                        tickFormatter={(number) => `$${number}`}
                    />
                    <Tooltip content={<CustomTooltip />} animationDuration={0} />
                    <CartesianGrid opacity={0.4} vertical={false} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )

}




export default LesserForecastGraph