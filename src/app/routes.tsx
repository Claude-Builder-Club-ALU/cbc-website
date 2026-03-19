import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { Projects } from "./pages/Projects";
import { Gallery } from "./pages/Gallery";
import { Team } from "./pages/Team";
import { FAQ } from "./pages/FAQ";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "events", Component: Events },
      { path: "projects", Component: Projects },
      { path: "gallery", Component: Gallery },
      { path: "team", Component: Team },
      { path: "faq", Component: FAQ },
      { path: "*", Component: NotFound },
    ],
  },
]);
