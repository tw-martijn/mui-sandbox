import {
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "react";
import { v4 as uuid } from "uuid";
import {
  RootDirectionContext,
  ThemePrimaryMainColorContext,
  ThemeTypeContext,
} from "./AdaptableThemeProvider";

const getLabelId = (() => {
  function* getLabelId() {
    do {
      const id = uuid();
      yield id;
      yield id;
    } while (true);
  }
  const labelIds = getLabelId();
  return () => {
    const labelId = labelIds.next();
    if (labelId.done) throw new Error();
    return labelId.value;
  };
})();

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    position: "fixed",
    bottom: "0px",
    right: "0px",
    backgroundColor: theme.palette.background.paper,
    paddingInline: theme.spacing(2),
    gap: theme.spacing(1),
    width: "15vw",
  },
}));

export const AdaptableThemeChanger = () => {
  const [a, setA] = useContext(ThemeTypeContext);
  const [b, setB] = useContext(ThemePrimaryMainColorContext);
  const [c, setC] = useContext(RootDirectionContext);

  return (
    <Grid classes={useStyles()}>
      <FormControl fullWidth margin="dense">
        <FormControlLabel
          control={
            <Switch
              checked={a !== "dark"}
              onChange={(e) => {
                setA(e.target.checked ? "light" : "dark");
              }}
            />
          }
          label="Light mode"
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel id={getLabelId()}>Accent colour</InputLabel>
        <Input
          aria-labelledby={getLabelId()}
          type="color"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel id={getLabelId()}>Text direction</InputLabel>
        <Select
          labelId={getLabelId()}
          value={c ?? "browser"}
          onChange={(e) => {
            switch (e.target.value) {
              case "ltr":
              case "rtl":
                setC(e.target.value);
                break;
              default:
                setC(undefined);
            }
          }}
        >
          <MenuItem value="browser">browser</MenuItem>
          <MenuItem value="ltr">ltr</MenuItem>
          <MenuItem value="rtl">rtl</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};
