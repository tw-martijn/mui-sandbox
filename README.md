# Material UI v4 Theme Sandbox

Sample application including an AdaptableTheme, allowing the easy switching of
MUI’s primary colour, light/dark mode, and direction.

## Running

```sh
npm ci
npm run dev
```

If you want to make sure you are running on the same version of node as me, a
`.node_version` file has been included for use with tools like [fnm][].

## Usage of AdaptableTheme

As shown in the [App.tsx](src/App.tsx), wrap the entire MUI using application
with `<AdaptableThemeProvider>`. This will make 3 separate React Contexts
available for configuring the theme, as well as create the outermost MUI
ThemeProvider.

The three contexts exposed are:

1. `ThemeTypeContext`, a React state of `PaletteType` (default: dark).
2. `ThemePrimaryMainColorContext`, a React state of `PaletteColor["main"]`
   (default: #FD954B).
3. `RootDirectionContext`, a React state of `HTMLAttributes<HTMLElement>["dir"]`
   (default: undefined).

Every Context holds the output of `useState()`, thus a tuple of the value and
the state changing function.

To be able to implement direction switching, Helmet is used to set a `dir`
attribute on the `html` element. This means a HelmerProvider instance is
created by the AdaptableThemeProvider and the rest of the application can
use Helmet without having to create the provider first.

### Adapting Theme in Browser

For easy access to the Theme and changing it on the fly, a form compontent is
provided: `AdaptableThemeChanger`. Include this within the
AdaptableThemeProvider wrapping to be able to configure all three Contexts.

[fnm]: https://github.com/Schniz/fnm
