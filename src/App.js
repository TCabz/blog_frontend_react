import React from "react";
import "./App.css";
import BlogList from "./BlogList/BlogList";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  app_title: {
    textAlign: "center",
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1" className={classes.app_title}>
          Blogs
        </Typography>
        <hr />
        <BlogList />
      </header>
    </div>
  );
}

export default App;
