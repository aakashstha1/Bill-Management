import React from "react";
import AppRoute from "../../frontend/src/routes/AppRoutes";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={AppRoute} />;
}

export default App;
