import { ComponentType, LazyExoticComponent } from "react";
import { lazy } from "react";

export interface Page {
  name: string;
  path: string;
  element: LazyExoticComponent<ComponentType<any>>;
}

export const pages: Page[] = [
  {
    name: "US East",
    path: "us-east",
    element: lazy(() =>
      import("./USEast").then((module) => ({ default: module.USEast }))
    ),
  },
  {
    name: "US West",
    path: "us-west",
    element: lazy(() =>
      import("./USWest").then((module) => ({ default: module.USWest }))
    ),
  },
  {
    name: "EU Central",
    path: "eu-central",
    element: lazy(() =>
      import("./EUCentral").then((module) => ({ default: module.EUCentral }))
    ),
  },
  {
    name: "SA East",
    path: "sa-east",
    element: lazy(() =>
      import("./SAEast").then((module) => ({ default: module.SAEast }))
    ),
  },
  {
    name: "AP Southeast",
    path: "ap-southeast",
    element: lazy(() =>
      import("./APSouthEast").then((module) => ({
        default: module.APSouthEast,
      }))
    ),
  },
];
