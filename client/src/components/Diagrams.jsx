import React from 'react';
import Plot from 'react-plotly.js';

class Diagrams extends React.Component {
    render() {
      return (
        <Plot
          data={[
            {
              x: [2000, 2001, 2002],
              y: [2, 6, 3],
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
            {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
          ]}
          layout={ {width: 800, height: 420, title: 'A Fancy Plot'} }
        />
      );
    }
  }
export default Diagrams
