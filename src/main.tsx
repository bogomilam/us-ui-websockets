import { JSX, StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import Layout from "./containers/WithLayout.tsx";
import { Page, pages } from "./pages/page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Layout />}>
          {pages.map((page: Page) => {
            const Component = page.element as React.LazyExoticComponent<
              () => JSX.Element
            >;
            return (
              <Route key={page.path} path={page.path} element={<Component />} />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
