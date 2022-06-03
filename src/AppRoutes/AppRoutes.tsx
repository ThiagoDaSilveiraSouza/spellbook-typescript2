import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import { Home } from "../Pages";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
