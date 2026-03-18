import { lazy, Suspense } from "react";
import "./App.css";
import { LoadingProvider } from "./context/LoadingProvider";
import { ThemeProvider } from "./context/ThemeContext";

const MainContainer = lazy(() => import("./components/MainContainer"));

const App = () => {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <Suspense>
          <MainContainer />
        </Suspense>
      </LoadingProvider>
    </ThemeProvider>
  );
};

export default App;
