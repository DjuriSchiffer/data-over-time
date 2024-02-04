import MapBox from "../components/MapBox";
import TimeLine from "../components/Timeline";
import TimeSeriesChart from "../components/TimeSeriesChart";
import styled from "styled-components";
import InfoPanel from "../components/InfoPanel";

const StyledOverView = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
`;

const StyledOverViewContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  overflow: auto;
`;

const TopLeftPanel = styled.div`
  position: relative;
  grid-column: 1;
  overflow: hidden;
`;

const TopBottomPanel = styled.div`
  position: relative;
  grid-row: 2;
  overflow: hidden;
`;

const RightPanel = styled.div`
  position: relative;
  grid-column: 2;
  grid-row: 1 / span 2;
  overflow: hidden;
`;

function Overview() {
  return (
    <StyledOverView>
      <StyledOverViewContainer>
        <TopLeftPanel>
          <TimeSeriesChart />
        </TopLeftPanel>
        <TopBottomPanel>
          <InfoPanel />
        </TopBottomPanel>
        <RightPanel>
          <MapBox />
        </RightPanel>
      </StyledOverViewContainer>
      <TimeLine />
    </StyledOverView>
  );
}

export default Overview;
