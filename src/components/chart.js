import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {

    buildGraphData = () => {
        var result = this.props.mainData.map(a => a.weight);
        return result;
    };

    buildLabelsData = () => {
        var result = this.props.mainData.map(a => a.number);
        return result;
    };

    render() {

        const chartData = {
            labels: this.buildLabelsData(),
            datasets: [
                {
                    label: 'Kg´s',
                    data: this.buildGraphData()
                }
            ]
        };

        //console.log('acá: ', chartData);
        return (
            <div className="chart">
                <Line
                    data={chartData}
                    width={50}
                    height={25}
                    options={{}}
                />
            </div>
        )
    }
}

export default Chart;