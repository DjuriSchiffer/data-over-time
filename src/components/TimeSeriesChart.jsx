import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";
import { useState as useGlobalState } from "../hooks/useReducer";
import { calculateDateFromRatio } from "../utils/time";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StyledTimeSeriesChart = styled.div`
  ${({ theme }) => `
    background-color: ${theme.color.background.dark};
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
   `}
`;

const TimeSeriesChart = () => {
  const { appData, time, timelineSettings } = useGlobalState();
  const { year } = calculateDateFromRatio(timelineSettings, time);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const provincesColors = {
    Groningen: "rgba(255, 99, 132, 0.1)", // Pink
    Fryslân: "rgba(54, 162, 235, 0.1)", // Blue
    Drenthe: "rgba(255, 206, 86, 0.1)", // Yellow
    Overijssel: "rgba(75, 192, 192, 0.1)", // Teal
    Flevoland: "rgba(153, 102, 255, 0.1)", // Purple
    Gelderland: "rgba(255, 159, 64, 0.1)", // Orange
    Utrecht: "rgba(22, 160, 133, 0.1)", // Green
    "Noord-Holland": "rgba(41, 128, 185, 0.1)", // Navy Blue
    "Zuid-Holland": "rgba(243, 156, 18, 0.1)", // Tangerine
    Zeeland: "rgba(211, 84, 0, 0.1)", // Dark Orange
    "Noord-Brabant": "rgba(142, 68, 173, 0.1)", // Dark Purple
    Limburg: "rgba(192, 57, 43, 0.1)", // Red
  };

  useEffect(() => {
    const years = Object.keys(appData).sort((a, b) => a - b);
    const regions = [
      ...new Set(
        years.flatMap((year) => appData[year].map((entry) => entry.region))
      ),
    ];

    const datasets = regions.map((region) => {
      const baseColor = provincesColors[region];

      const regionData = years.map((year) => {
        const yearData = appData[year].find((entry) => entry.region === region);
        return yearData ? yearData.totals : null;
      });

      const pointBackgroundColor = regionData.map((_, dataIndex) => {
        const dataYear = parseInt(years[dataIndex]);
        if (dataYear < year) return baseColor.replace("0.1", "0.1");
        if (dataYear === year) return baseColor.replace("0.1", "1"); // Current year with full opacity
        return baseColor;
      });

      return {
        label: region,
        data: regionData,
        fill: true,
        borderColor: baseColor,
        backgroundColor: baseColor.replace("0.1", "1"),
        pointBackgroundColor: pointBackgroundColor,
        borderWidth: 2,
        pointRadius: 5,
      };
    });

    setChartData({
      labels: years,
      datasets,
    });
  }, [appData, year]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        fill: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      line: {
        tension: 0,
      },
      point: {
        radius: 5, // Show all points with the same radius
        hoverRadius: 7, // Larger radius on hover
      },
    },
  };

  return (
    <StyledTimeSeriesChart>
      <Line data={chartData} options={chartOptions} />
    </StyledTimeSeriesChart>
  );
};

export default TimeSeriesChart;
