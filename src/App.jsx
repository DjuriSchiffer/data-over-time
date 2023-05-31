import ReducerProvider from "./hooks/useReducer";
import theme from "./theme";
import GlobalStyle from "./GlobalStyles";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./Pages/Map";

function App() {
  return (
    <ReducerProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Map />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </ReducerProvider>
  );
}

export default App;
