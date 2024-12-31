import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GraphComponent = () => {
  const graph1Ref = useRef(null);
  const graph2Ref = useRef(null);
  const graph1Instance = useRef(null);
  const graph2Instance = useRef(null);

  useEffect(() => {
    // Destroy existing Chart instances
    if (graph1Instance.current) {
      graph1Instance.current.destroy();
    }
    if (graph2Instance.current) {
      graph2Instance.current.destroy();
    }

    // Graph 1
    const graph1Ctx = graph1Ref.current.getContext('2d');
    graph1Instance.current = new Chart(graph1Ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Sales',
          data: [120, 180, 90, 200, 150, 300],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Graph 2
    const graph2Ctx = graph2Ref.current.getContext('2d');
    graph2Instance.current = new Chart(graph2Ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, []);

  return (
    <div>
      <div>
        <canvas ref={graph1Ref}></canvas>
      </div>
      <div>
        <canvas ref={graph2Ref}></canvas>
      </div>
    </div>
  );
};

export default GraphComponent;
