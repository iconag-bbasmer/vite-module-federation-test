import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/pages/ErrorPage";
// const Header1 = React.lazy(() => import("sbhApp1/AppHeader"));
// const Header2 = React.lazy(() => import("sbhApp2/AppHeader"));
import externalComponents from "./externalComponents.json";
import "./index.css";

externalComponents.forEach((component) => {
  // (window as { [key: string]: any })[component.appName] = React.lazy(() => import("sbhApp1/AppHeader"));
  (window as { [key: string]: any })[component.appName] = React.lazy(() => import(component.importLink));
});

const availableComponents: RouteObject[] = externalComponents.map((component: any) => {
  return {
    path: component.path,
    element: React.createElement((window as { [key: string]: any })[component.appName], {}),
  };
});

const router = createBrowserRouter(
  [
    {
      // path: "/index.html",
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      // children: [
      //   { path: "app1", element: <Header1 /> },
      //   { path: "app2", element: <Header2 /> },
      // ],
      children: availableComponents,
    },
  ]
  // {
  //   basename: "/b-con/portal/sbh/",
  // }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>
);
