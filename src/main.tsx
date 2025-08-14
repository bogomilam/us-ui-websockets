import { JSX, StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import Layout from "./containers/WithLayout.tsx";
import { regions, Region } from "./components/pages/Regions.tsx";
// import { Regions } from "./pages/Regions.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          {regions.map((region: Region) => {
            const Component = region.element as React.LazyExoticComponent<
              () => JSX.Element
            >;
            return (
              <Route
                key={region.path}
                path={region.path}
                element={<Component />}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
