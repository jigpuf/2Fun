import React, { useEffect, useState } from "react";
import City from "./utilities/city.js";
import Food from "./categories/food.js";
import Hotels from "./categories/hotels.js";
import Destination from "./categories/destination.js";

const Main = (props) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const activeTab = props.activeTab;
  return (
    <div className="main">
      {latitude !== null && longitude !== null ? (
        <table>
          <tr>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>City</th>
          </tr>
          <tr>
            <td>
              {latitude.toFixed(4)} <br />
              {latitude > 0 ? "N" : "S"}
            </td>
            <td>
              {longitude.toFixed(4)} <br />
              {longitude > 0 ? "E" : "W"}
            </td>
            <City latitude={latitude} longitude={longitude} />
          </tr>
        </table>
      ) : (
        <p>Loading...</p>
      )}
      <nav>
        {activeTab === "food" && (
          <Food latitude={latitude} longitude={longitude} />
        )}
        {activeTab === "destination" && (
          <Destination latitude={latitude} longitude={longitude} />
        )}
        {activeTab === "hotels" && (
          <Hotels latitude={latitude} longitude={longitude} />
        )}
      </nav>
    </div>
  );
};

export default Main;
