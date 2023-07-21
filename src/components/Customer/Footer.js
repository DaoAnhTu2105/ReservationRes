import React from "react";

function Footer() {
  return (
    <div
      className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
      data-wow-delay="0.1s"
    >
      <div className="container py-5">
        <div className="row g-5 pl-2">
          <div className="col-lg-4 col-md-6">
            <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
              Contact
            </h4>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt me-3"></i>Duong 123. Quan 1 Tp
              Hcm VietNam
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt me-3"></i>+84 338 010 426
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope me-3"></i>vuncse151184@fpt.edu.vn
            </p>
          </div>
          <div className="col-lg-4 col-md-6">
            <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
              Opening
            </h4>
            <h5 className="text-light fw-normal">Monday - Saturday</h5>
            <p>09AM - 09PM</p>
            <h5 className="text-light fw-normal">Sunday</h5>
            <p>10AM - 08PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
