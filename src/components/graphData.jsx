import React, { Component } from 'react';
import Chart from './chart';

class GraphData extends Component {
    render() {
        return (
            <div className="container">
                <Chart
                    mainData={this.props.mainData}
                />
            </div>
        );
    }
}

export default GraphData;