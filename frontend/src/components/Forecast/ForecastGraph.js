import React from 'react'
import './Forecast.css'
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

const ForecastGraph = (data) => {
    var total = Object.keys(data.forecastGraph).length;
    const percentage = 100 - ((365 / total) * 100)

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
                <AreaChart data={Object.values(data.forecastGraph)}>
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                            <stop offset="0%" stopColor="blue" />
                            <stop offset={`${percentage}%`} stopColor="blue" />
                            <stop offset={`${percentage}%`} stopColor="red" />
                            <stop offset="100%" stopColor="red" />
                        </linearGradient>
                    </defs>
                    <Area dataKey="yhat" stroke="url(#gradient)" fill="url(#gradient)" fillOpacity={0.4} />
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

export default ForecastGraph