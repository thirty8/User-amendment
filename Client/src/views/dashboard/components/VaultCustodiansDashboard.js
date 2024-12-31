import React from "react";
import { Line, Bar, Doughnut, PolarArea } from "react-chartjs-2";

const TellerDashboard = () => {
  // Sample data for graphs
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Transaction Volume",
        data: [50, 70, 90, 60, 80, 100],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ["Deposit", "Withdrawal", "Transfer", "Payment", "Exchange"],
    datasets: [
      {
        label: "Success Rate",
        data: [85, 90, 75, 80, 70],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

  const polarAreaChartData = {
    labels: [
      "Category A",
      "Category B",
      "Category C",
      "Category D",
      "Category E",
    ],
    datasets: [
      {
        label: "Loan Categories",
        data: [120, 80, 60, 100, 90],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9800",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center p-8 h-full -mt-10">
      <div className="flex justify-center space-x-4 mb-4">
        {/* Cards */}
        <Card
          title="Total Transactions"
          icon="📊"
          value={300}
          color="#ff6384"
        />
        <Card
          title="Successful Transactions"
          icon="✅"
          value={250}
          color="#98FB98"
        />
        <Card
          title="Pending Transactions"
          icon="⌛"
          value={30}
          color="#FFFFE0"
        />
        <Card
          title="Rejected Transactions"
          icon="❌"
          value={20}
          color="#FF6347"
        />
        <Card
          title="Average Transaction Amount"
          icon="💵"
          value={1500}
          color="#ADD8E6"
        />
        <Card
          title="Average Success Rate"
          icon="📈"
          value="80%"
          color="#D3D3D3"
        />
      </div>

      {/* Charts */}
      <div className="flex justify-center space-x-4 flex-grow">
        <ChartCard title="Transaction Volume Over Time">
          <Line
            data={lineChartData}
            options={{ maintainAspectRatio: false, height: 400, width: 600 }}
          />
        </ChartCard>
        <ChartCard title="Transaction Success Rate by Type">
          <Bar
            data={barChartData}
            options={{ maintainAspectRatio: false, height: 400, width: 600 }}
          />
        </ChartCard>
        <ChartCard title="Transaction Status">
          <Doughnut
            data={doughnutChartData}
            options={{ maintainAspectRatio: false, height: 400, width: 600 }}
          />
        </ChartCard>
        <ChartCard title="Transaction Categories">
          <PolarArea
            data={polarAreaChartData}
            options={{ maintainAspectRatio: false, height: 400, width: 600 }}
          />
        </ChartCard>
      </div>
    </div>
  );
};

const Card = ({ title, icon, value, color }) => (
  <div
    className="rounded-lg shadow-lg p-4 text-center flex-grow-1"
    style={{ backgroundColor: color }}
  >
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-xl font-semibold mb-1">{title}</div>
    <div className="text-lg">{value}</div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-lg p-4 flex-grow-1" style={{  height: "250px", zoom: "1"  }}>
    <div className="text-lg font-semibold mb-2">{title}</div>
    <div className="chart-container">{children}</div>
  </div>
);

export default TellerDashboard;
