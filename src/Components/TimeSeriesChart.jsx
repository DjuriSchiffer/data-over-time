import React from "react";
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
import { useState as useGlobalState } from "../hooks/useReducer";
import styled from "styled-components";

// Registering necessary components for Chart.js
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
    height: 50vh;
    width: 50vw;
   `}
`;

const TimeSeriesChart = () => {
  const { time } = useGlobalState();

  // Data representing a fictional metric for the top 10 cities
  const cityData = {
    labels: [
      "Amsterdam",
      "Rotterdam",
      "The Hague",
      "Utrecht",
      "Eindhoven",
      "Tilburg",
      "Groningen",
      "Almere",
      "Breda",
      "Nijmegen",
    ],
    values: [300, 250, 220, 180, 160, 140, 130, 120, 110, 100], // Fictional metric values
  };

  const numberOfPointsToShow = Math.ceil(cityData.labels.length * time);
  const displayedLabels = cityData.labels.slice(0, numberOfPointsToShow);
  const displayedData = cityData.values.slice(0, numberOfPointsToShow);

  // Chart data and options
  const chartData = {
    labels: displayedLabels,
    datasets: [
      {
        label: "City Metrics",
        data: displayedData,
        fill: false,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
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
