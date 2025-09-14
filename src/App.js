import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import DetailsPage from "./pages/DetailsPage";
import PhotoPage from "./pages/PhotoPage";
import PhotoResultPage from "./pages/PhotoResultPage";
import SalaryChart from "./components/SalaryChart";
import CityMap from "./components/CityMap";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/list" element={<ListPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/photo" element={<PhotoPage />} />
          <Route path="/photo/result" element={<PhotoResultPage />} />
          <Route path="/chart" element={<SalaryChart />} />
          <Route path="/map" element={<CityMap />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
