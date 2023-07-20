import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BookTable from "./BookTable";
import Menu from "./Menu";
import heroImg from "../../img/hero.png";

function HomePage() {
  return (
    <>
      <div id="home_p" className="container-fluid bg-white p-0">
        <div className="container-xxl  position-relative p-0">
          <Header />
          <div className="container-xxl py-5 bg-dark hero-header mb-5">
            <div className="container my-5 py-5">
              <div className="row align-items-center g-5">
                <div
                  className="col-lg-6 text-center text-lg-start"
                  id="content"
                >
                  <h1 className="display-3 text-white animated slideInLeft">
                    Enjoy Our <br></br> Delicious Meal
                  </h1>
                  <p
                    className="text-white animated slideInLeft mb-4 pb-2"
                    style={{ textAlign: "center", marginTop: 10 }}
                  >
                    Come for a drink, stay for a meal. <br></br> Fast and yummy.
                    Good for your tummy.
                  </p>
                  <div style={{ textAlign: "center" }}>
                    <a
                      href="#book_a"
                      className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft"
                    >
                      Book A Table
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                  <img className="img-fluid" src={heroImg} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Menu />

        <BookTable />

        <Footer />
        <a
          href="/#"
          className="btn btn-lg btn-primary btn-lg-square back-to-top"
        >
          <i className="bi bi-arrow-up"></i>
        </a>
      </div>
    </>
  );
}

export default HomePage;
