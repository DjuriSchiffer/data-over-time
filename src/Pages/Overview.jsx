import MapBox from "../Components/MapBox";
import TimeLine from "../Components/Timeline";
import TimeSeriesChart from "../Components/TimeSeriesChart";
import InfoPanel from "../Components/InfoPanel";

function Overview() {
  return (
    <>
      <TimeSeriesChart />
      <InfoPanel />
      <MapBox />
      <TimeLine />
    </>
  );
}

export default Overview;
