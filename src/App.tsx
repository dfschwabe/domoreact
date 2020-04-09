import React, { Component } from 'react';
import {
  PhoenixChartData,
  PhoenixChartOptions,
  DomoPhoenix.MAPPING,
  DomoPhoenix.DATA_TYPE,
  Chart,
  DomoPhoenix.CHART_TYPE
} from '@domoinc/domo-phoenix';

interface Props {
  name: string;
}

export class App extends Component<Props> {
  chartDiv: any;

  data: PhoenixChartData = {
    rows: [
      ['Low', 'Corporate', 8582.8875],
      ['High', 'Home Office', 14415.941],
      ['Low', 'Consumer', 1264.8215],
      ['Medium', 'Small Business', 21478.799],
      ['Critical', 'Consumer', 2621.97],
      ['Not Specified', 'Consumer', 2211.31],
      ['Critical', 'Corporate', 10087.1315],
      ['Not Specified', 'Corporate', 4407.138],
      ['High', 'Consumer', 11667.366],
      ['High', 'Corporate', 19503.323],
      ['Low', 'Small Business', 1735.3715],
      ['Low', 'Home Office', 10057.42],
      ['Medium', 'Home Office', 7691.02],
      ['Critical', 'Small Business', 4036.064],
      ['Not Specified', 'Small Business', 84.99],
      ['High', 'Small Business', 689.74],
      ['Critical', 'Home Office', 7416.828],
      ['Not Specified', 'Home Office', 1839.26],
      ['Medium', 'Consumer', 4280.034],
      ['Medium', 'Corporate', 7965.238]
    ],
    columns: [
      {
        type: DomoPhoenix.DATA_TYPE.STRING,
        name: 'Order Priority',
        mapping: DomoPhoenix.MAPPING.SERIES
      },
      {
        type: DomoPhoenix.DATA_TYPE.STRING,
        name: 'Customer Segment',
        mapping: DomoPhoenix.MAPPING.ITEM
      },
      {
        type: DomoPhoenix.DATA_TYPE.DOUBLE,
        name: 'Sales',
        mapping: DomoPhoenix.MAPPING.VALUE
      }
    ]
  };

  options: PhoenixChartOptions = {
    height: 600,
    width: 500
  };

  componentDidMount() {
    const chart = new Chart(
      DomoPhoenix.CHART_TYPE.BAR,
      this.data,
      this.options
    );
    this.chartDiv.appendChild(chart.canvas);
    chart.render();
  }

  render() {
    return (
      <div>
        <div ref={div => (this.chartDiv = div)} className="mychart" />
      </div>
    );
  }
}

Going Further

At this point you have your chart created and showing on your app. This is a very basic implementation and your own personal implementation is up to your discretion. It is recommended, however, that you create a reusable React component for your charts. An example component may look something like this:

import { Chart, PhoenixChartData, PhoenixChartOptions } from '@domoinc/domo-phoenix';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Chart extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidUpdate() {
    this.renderChart();
  }

  componentDidMount() {
    this.renderChart();
  }

  renderChart() {
    const options: PhoenixChartOptions = {
      width: this.props.width || 900,
      height: this.props.height || 400,
      properties: this.props.properties,
      colors: this.props.colors
    };
    const data: PhoenixChartData = {
      rows: this.props.data,
      columns: this.props.columns
    };
    const chart = new Chart(this.props.type, data, options);
    const el = ReactDOM.findDOMNode(this);
    if(el) {
      if(el.childNodes.length > 0 && el.firstChild) {
        // Trying to render new chart, remove old chart
        el.removeChild(el.firstChild);
      }
      el.appendChild(chart.canvas);
      chart.render();
    }
  }

  render() {
    return (
      <div></div>
    );
  }
}
