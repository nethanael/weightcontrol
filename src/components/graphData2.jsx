import React, { Component } from 'react';
import Chart2 from './chart2';

class GraphData2 extends Component {
    render() {
        return (
            <div className="container">
                <Chart2
                    mainData={this.props.mainData}
                />
            </div>
        );
    }
}

export default GraphData2;