import { CssBaseline, Typography } from "@material-ui/core";
import { StrictMode } from "react";
import { render } from "react-dom";
import { Helmet } from "react-helmet-async";
import { AdaptableThemeProvider } from "./AdaptableThemeProvider";
import { AdaptableThemeChanger } from "./AdaptableThemeChanger";

const App = () => {
  return (
    <AdaptableThemeProvider>
      <CssBaseline />
      <Helmet>
        <title>Test page</title>
      </Helmet>
      <Typography color="primary" variant="h1">Test page</Typography>
      <Typography component="p">This is a page for testing MUI elements in a controllable theme.</Typography>
      {/* Render a box in the corner to modify theme */}
      <AdaptableThemeChanger />
    </AdaptableThemeProvider>
  );
};

// Wrap the root App in StrictMode so no components are rendered outside of it.
render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.body.firstElementChild
);
