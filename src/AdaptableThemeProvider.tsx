import { createTheme, PaletteType, ThemeProvider } from "@material-ui/core";
import { PaletteColor } from "@material-ui/core/styles/createPalette";
import {
  createContext,
  HTMLAttributes,
  ReactNode,
  useContext,
  useState,
} from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const ThemeTypeContext = createContext<[PaletteType, Function]>([
  "dark",
  Function.prototype,
]);
export const ThemePrimaryMainColorContext = createContext<
  [PaletteColor["main"], Function]
>(["#FD954B", Function.prototype]);
export const RootDirectionContext = createContext<
  [HTMLAttributes<HTMLElement>["dir"], Function]
>([undefined, Function.prototype]);

export const AdaptableThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [themeType, setThemeType] = useState(useContext(ThemeTypeContext)[0]);
  const [themePrimaryMainColor, setThemePrimaryMainColor] = useState(
    useContext(ThemePrimaryMainColorContext)[0]
  );
  const [rootDirection, setRootDirection] = useState(
    useContext(RootDirectionContext)[0]
  );

  const theme = createTheme({
    palette: {
      type: themeType,
      primary: {
        main: themePrimaryMainColor,
      },
    },
  });

  return (
    <HelmetProvider>
      <ThemeTypeContext.Provider value={[themeType, setThemeType]}>
        <ThemePrimaryMainColorContext.Provider
          value={[themePrimaryMainColor, setThemePrimaryMainColor]}
        >
          <RootDirectionContext.Provider
            value={[rootDirection, setRootDirection]}
          >
            <ThemeProvider theme={theme}>
              <Helmet htmlAttributes={{ dir: rootDirection }} />
              {children}
            </ThemeProvider>
          </RootDirectionContext.Provider>
        </ThemePrimaryMainColorContext.Provider>
      </ThemeTypeContext.Provider>
    </HelmetProvider>
  );
};
