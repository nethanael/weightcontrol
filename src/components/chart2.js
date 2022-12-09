import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Chart2 extends Component {

    buildGraphData = () => {
        var result = this.props.mainData.map(data => data.IMC);
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
                    label: 'IMC',
                    data: this.buildGraphData()
                }
            ]
        };

        //console.log('acá: ', chartData);
        return (
            <div className="chart">
                <Bar
                    data={chartData}
                    width={50}
                    height={25}
                    options={{}}
                />
            </div>
        )
    }
}

export default Chart2;