import React from "react";
import Grid from "@material-ui/core/Grid";
import quotascreenshot1 from "../assets/quotascreenshot1.png";

export default function LandingPage() {
  return (
    <Grid container justify="center" style={{ marginTop: 5 }}>
      <Grid item xs={9}>
        <h1 style={{ textAlign: "center", marginBottom: 0 }}>
          <b>Why are you still manually updating spreadheets?</b>
        </h1>
        <br />
        <h2 style={{ textAlign: "center", marginTop: 5 }}>
          <p>Quota is the new way companies share data.</p>
        </h2>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={quotascreenshot1} alt="dash" width="85%" />
        </div>
        <h4 style={{ textAlign: "center", marginTop: 5 }}>
          <i>
            Say goodbye to sending spreadsheets back and forth
            <span role="img">👋</span>
          </i>
        </h4>
      </Grid>

      <Grid item xs={12}>
        <h2 style={{ textAlign: "center", marginTop: 50, marginBottom: 15 }}>
          <b>How it works</b>
        </h2>
      </Grid>
      <Grid item xs={4}>
        <h4 style={{ textAlign: "center" }}>
          <b>1.</b>
        </h4>
        <h5 style={{ textAlign: "center" }}>
          Connect to a database/API in one click without any code
        </h5>
      </Grid>
      <Grid item xs={4}>
        <h4 style={{ textAlign: "center" }}>
          <b>2.</b>
        </h4>
        <h5 style={{ textAlign: "center" }}>
          Add as many data fields and custom columns as you need
        </h5>
      </Grid>
      <Grid item xs={4}>
        <h4 style={{ textAlign: "center" }}>
          <b>3.</b>
        </h4>
        <h5 style={{ textAlign: "center" }}>
          Invite internal and exteral users to view/edit the table
        </h5>
      </Grid>

      {/* <Grid item xs={12}>
        <h2 style={{ textAlign: "center", marginTop: 40, marginBottom: 10 }}>
          <b>Demo</b>
        </h2>
      </Grid> */}

      <Grid style={{ marginTop: 15 }}>
        <h6>Quota 2020</h6>
      </Grid>
    </Grid>
  );
}
