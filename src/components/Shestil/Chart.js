import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Исправленный импорт

const ChartComponent = ({ groupedData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (groupedData.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: groupedData.map((row) => row[0]),
          datasets: [
            {
              data: groupedData.map((row) => Math.abs(row[1])),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8B572A', '#3CB371'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: 'Profit Distribution',
            },
          },
        },
      });
    }
  }, [groupedData]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
