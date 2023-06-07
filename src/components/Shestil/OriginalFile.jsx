import React, { Component } from 'react';
import s from './shestil.module.css';
import * as XLSX from 'xlsx';
import Chart from './Chart';

export default class OriginalFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: [],
      groupedData: [],
    };
  }

  componentDidMount() {
    const jsonData = localStorage.getItem('jsonData');
    if (jsonData) {
      this.setState({ jsonData: JSON.parse(jsonData) }, () => {
        this.groupData(this.state.jsonData);
      });
    }
  }

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      this.setState({ jsonData }, () => {
        this.groupData(this.state.jsonData);
        localStorage.setItem('jsonData', JSON.stringify(jsonData));
      });
    };

    reader.readAsArrayBuffer(file);
  };

  groupData = (jsonData) => {
    const groupedData = {};
    jsonData.forEach((row) => {
      const key = row[0];
      const value = parseFloat(row[10]);
      if (groupedData[key]) {
        groupedData[key] += value;
      } else {
        groupedData[key] = value;
      }
    });

    const groupedArray = Object.entries(groupedData).map(([key, value]) => [key, value]);
    groupedArray[0][1] = 'Profit';

    this.setState({ groupedData: groupedArray });
  };

  formatValue = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  render() {
    const { groupedData } = this.state;

    return (
      <div className={s.shestil}>
        <input type="file" onChange={this.handleFileUpload} />

        <Chart groupedData={groupedData} />
      </div>
    );
  }
}
