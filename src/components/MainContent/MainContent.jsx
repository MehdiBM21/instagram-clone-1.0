import "./MainContent.css";
import Grid from "@mui/material/Grid";
import StatusBar from "../StatusBar/StatusBar";
import MainPage from "../MainPage/MainPage";
import InfoSection from "../InfoSection/InfoSection";
import Suggestions from "../Suggestions/Suggestions";

export default function MainContent() {
  return (
    <>
      <Grid container>
        <Grid xs={2}>{/* blank */}</Grid>
        <Grid xs={6}>
          <div>
            <StatusBar/>
            <MainPage/>
          </div>
        </Grid>
        <Grid xs={3} className="main-info-container">
          <div >
          <InfoSection/>
          <Suggestions/>
          </div>
        </Grid>
        <Grid xs={1}>
          
        </Grid>
      </Grid>
    </>
  );
}
