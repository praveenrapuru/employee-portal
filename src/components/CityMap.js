import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import cityCoords from "../data/cityCoords";

// Fix Leaflet default marker icons in React/webpack environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function CityMap() {
  const location = useLocation();
  const navigate = useNavigate();
  const employees = location.state || []; // employees passed from ListPage

  // coordinates imported from data module

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Employees by City</h2>
      {Array.isArray(employees) && employees.length > 0 ? (
        <MapContainer
          center={[20, 0]} // world view
          zoom={2}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {(employees || []).map((emp, idx) => {
            const coords = cityCoords[emp.city];
            if (!coords) return null;
            return (
              <Marker key={idx} position={coords}>
                <Popup>
                  <strong>{emp.name}</strong> <br />
                  {emp.position} <br />
                  {emp.city} <br />
                  {emp.salary}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      ) : (
        <div className="p-4 border rounded bg-gray-50">
          <p className="mb-3">No employee data to display on the map.</p>
          <button
            className="bg-blue-600 text-white px-3 py-2 rounded"
            onClick={() => navigate("/list")}
          >
            Go to Employee List
          </button>
        </div>
      )}
    </div>
  );
}

export default CityMap;
