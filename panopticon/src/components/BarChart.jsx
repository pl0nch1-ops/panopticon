import React from "react";
import {Bar} from "react-chartjs-2";
import 'chart.js/auto'

function lerpColor(a, b, amount) {
    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

const minColor = "#0b349b"
const maxColor = "#fafeff"

function BarChart({ chartData }) {
    let max_frequency = Math.max(...chartData.map(data => data.frequency))

    let payload = {
        labels: chartData?.map((data) => data.hour),
        datasets: [
            {
                label: "Частота обращений по часам",
                data: chartData?.map((data) => data.frequency),
                backgroundColor:
                    chartData.map(data=>{let a = lerpColor(minColor, maxColor, (data.frequency/max_frequency) ** 2)
                        console.log(a)
                        return a})
                ,
                borderWidth: 0,
                borderColor: "#444444"
            }
        ]
    }

    return (
        <div className="chart-container">
            <Bar
                data={payload}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Частота обращений абитуриентов по часам",
                            color: "#ffffff",
                            font: {
                                size: 18
                            }
                        }
                    },
                    responsive: true
                }}/>
        </div>
    );
}
export default BarChart;