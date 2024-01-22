# Data Over Time Visualization

## Overview
"Data Over Time" is a versatile visualization project that dynamically represents various datasets in relation to time. This project is designed to be adaptable, allowing integration of different types of data, including geographic and statistical data, and rendering changes over a time continuum. It showcases interactive visualizations such as maps and charts, but is not limited to these examples and can be extended to other forms of data representation. The project is structured to handle a range of time representations, from simple progressions like 0% to 100%, to more complex formats such as actual timestamps, making it suitable for various time-based data visualization needs.

## Features

### Time-Responsive Map Visualization
- **Dynamic Map Markers:** As an example, the project displays the top 10 cities in the Netherlands with growing circles representing a specific metric that increases over time.

### Time-Series Data Chart
- **Interactive Line Chart:** This example represents a fictional metric for the top 10 cities in the Netherlands.
- **Progressive Data Reveal:** Showcases how the chart can reveal more data points as the 'time' variable increases, which can be adapted to display real-time data or data over a historical timeline.

These features demonstrate the project's capability but can be customized or expanded based on specific data visualization requirements.

## Technology Stack
- **React.js:** Utilized for building the user interface.
- **Mapbox GL JS:** For rendering interactive maps.
- **Chart.js and React-Chartjs-2:** Used for creating responsive and animated charts.
- **Styled-Components:** For styling the components.
- **Custom Hooks:** For managing global state and time progression.

## Setup and Installation
1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
2. **Install Dependencies:**  
Navigate to the project directory and run:
  ```bash
  npm install
3. **Environment Variables:**  
Set up the required environment variables, including the MapBox Access Token in a `.env` file:
  ```bash
  VITE_MAP_BOX_API=<your-mapbox-access-token>
4. **Run the Application:**
  ```bash
  npm start


The application will start running on `localhost:3000` (or on another port if specified).

## Usage
The application visualizes data progression over time. Adjust the 'time' variable through the interface to see how the data changes on the map and chart.

## Contributing
Contributions to "Data Over Time" are welcome. Please follow the standard fork, branch, and pull request workflow.
