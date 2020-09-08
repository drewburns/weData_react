import React from "react";
import Grid from "@material-ui/core/Grid";

export default function LandingPage() {
  return (
      <Grid container justify="center" style={{marginTop: "5%"}}>
        <Grid item xs={8}>
          <h1 style={{textAlign: "center"}}><b>Why are you still manually updating spreadheets?</b></h1><br /><br />
          <img src="https://www.clicdata.com/wp-content/uploads/2019/06/example-dashboard-027.png" alt="dash" width= "100%" height="270px" margin="30%" />
        </Grid>

        <Grid item xs={12}>
          <h2 style={{textAlign: "center", marginTop: "15%", marginBottom: "5%"}}><b>How it works</b></h2>
        </Grid>
        <Grid item xs={4}>
          <h4 style={{textAlign: "center"}}><b>1.</b></h4>
          <h5 style={{textAlign: "center"}}>Connect to a database in one click without any code</h5>
        </Grid>
        <Grid item xs={4}>
          <h4 style={{textAlign: "center"}}><b>2.</b></h4>
          <h5 style={{textAlign: "center"}}>Add as many data fields and custom columns as you need</h5>
        </Grid>
        <Grid item xs={4}>
          <h4 style={{textAlign: "center"}}><b>3.</b></h4>
          <h5 style={{textAlign: "center"}}>Invite internal and exteral users to view/edit the table</h5>
        </Grid>

        <Grid item xs={12}>
          <h2 style={{textAlign: "center", marginTop: "15%", marginBottom: "5%"}}><b>Demo</b></h2>
        </Grid>


        <Grid style={{marginTop: "15%"}}>
          <h6>Quota 2020</h6>
        </Grid>
    </Grid>
  );
}
