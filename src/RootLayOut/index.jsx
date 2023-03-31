import React from "react";
import Grid from "@mui/material/Grid";
import { Sidebar } from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
export const RootLayOut = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={11}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};
