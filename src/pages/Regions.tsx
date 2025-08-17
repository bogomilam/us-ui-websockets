// import React, { JSX } from "react";
// import { lazy } from "react";

// export interface Region {
//   name: string;
//   path: string;
//   element: React.LazyExoticComponent<() => JSX.Element>;
// }

// // Lazy-load region pages
// export const regions: Region[] = [
//   {
//     name: "US East",
//     path: "us-east",
//     element: lazy(() => import("./regions/USEast")),
//   },
//   // {
//   //   name: "US West",
//   //   path: "us-west",
//   //   element: lazy(() => import("./regions/USWest")),
//   // },
//   {
//     name: "EU Central",
//     path: "eu-central",
//     element: lazy(() => import("./regions/EUCentral")),
//   },
//   {
//     name: "SA East",
//     path: "sa-east",
//     element: lazy(() => import("./regions/SAEast")),
//   },
//   // {
//   //   // Dynamic region page (catches all regions via URL param)
//   //   name: "Region Page",
//   //   path: ":region",
//   //   element: React.lazy(() => import("./regions/RegionPage")),
//   // },
// ];
