import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Testimonialpart() {
  const [testimonial, setTestimonial] = useState({});

  async function getTestimonial() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/testimonial`
      );

      if (response.status !== 200) {
        console.error("Error getting testimonials.");
      } else {
        setTestimonial(response.data.testimonial || {});
      }
    } catch (err) {
      console.error("Request failed.", err);
    }
  }

  useEffect(() => {
    getTestimonial();
  }, []);

  return (
    <div className="container my-5 py-4">
      <div className="row align-items-center">
        {/* Testimonial Card or fallback */}
        <div className="col-md-6 mb-4 order-2 order-md-1">
          {testimonial.patient_name ? (
            <div className="crd border rounded-lg">
              <div className="cards shadow-sm p-3">
                <div className="d-flex align-items-center mb-3">
                    <div
                    className="rounded-circle text-white d-flex justify-content-center align-items-center"
                    style={{ width:'48px',height:'48px',fontWeight:'bold',fontSize:'1.25rem',backgroundColor: '#001040' }}>
                    {testimonial.patient_name.charAt(0)}
                    </div>

                    <h3
                    className="mb-0 ms-3"
                    style={{ fontSize:'1.25rem',color: '#001040' }}>
                    {testimonial.patient_name}
                    </h3>
                </div>

                <h5 className="text-center mb-3" style={{ color: '#FFA200' }}>
                    Patient
                </h5>

                <p className="text-muted">{testimonial.content}</p>
              </div>
            </div>
          ) : (
              <p className="text-black text-2xl">Currently No testimonial</p>
          )}

        </div>

        <div className="col-md-6 text-center  order-1 order-md-2 py-5 md-py-0">
          <h1 className="fw-bold patientwords" style={{ color: '#001040' }}>
            Words from our <br className="d-none d-sm-block" />
            Patient...
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Testimonialpart;
