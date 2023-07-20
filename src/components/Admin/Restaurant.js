import React from "react";
import { Link } from "react-router-dom";
import AdminReservation from "./Admin";
import { useState, useEffect } from "react";
export default function Restaurant() {
  const [resAPI, setResAPI] = useState([]);
  const resUrl = `http://tablereservationapi.somee.com/API/Admin/GetAllRestaurants`;
  useEffect(() => {
    fetch(resUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setResAPI(data);
      })
      .catch((error) => console.log(error.message));
  });
  return (
    <>
      <AdminReservation />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-4">
              <div className="col-md-12 title-block">
                <h1 className="main-title">Manage Restaurant</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="">
              {resAPI.map((restaurant) => (
                <Link
                  to={`/admin/restaurant/table/${restaurant.restaurantId}`}
                  key={restaurant.restaurantId}
                >
                  <div className="wrap animate pop">
                    <div className="overlay">
                      <div className="overlay-content animate slide-left delay-2">
                        <h1 className="animate slide-left pop delay-4 title-restaurant">
                          {restaurant.restaurantName}
                        </h1>
                        <p
                          className="animate slide-left pop delay-5"
                          style={{ color: "white" }}
                        >
                          {restaurant.restaurantAddress}
                        </p>
                      </div>
                      <img
                        src="https://i.pinimg.com/originals/aa/99/7d/aa997d46440009de587b7733f30e3a0a.jpg"
                        className="image-content animate slide delay-5"
                        alt="#"
                      />
                    </div>
                    <div className="text">
                      <h2>
                        Restaurant Name : <em> {restaurant.restaurantName}</em>
                      </h2>
                      <div className="br"></div>
                      <h4>Address : {restaurant.restaurantAddress}</h4>
                      <h4>Open Hours : {restaurant.openHours}</h4>
                      <h4>Phone : {restaurant.restaurantPhone}</h4>
                      <div className="br"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
