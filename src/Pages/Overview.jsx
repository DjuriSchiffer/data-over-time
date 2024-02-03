import MapBox from "../Components/MapBox";
import TimeLine from "../Components/Timeline";
import TimeSeriesChart from "../Components/TimeSeriesChart";
import InfoPanel from "../Components/InfoPanel";
import OverviewHeader from "../Components/OverviewHeader";

function Overview() {
  return (
    <>
      <OverviewHeader />
      <TimeSeriesChart />
      <InfoPanel />
      <MapBox />
      <TimeLine />
    </>
  );
}

export default Overview;
