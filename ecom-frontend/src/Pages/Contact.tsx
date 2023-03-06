import React from 'react'

export default function Contact() {
  return (
        <div className="contact-container">
              <div className="contact-item">
                {/* <img
                  className="img"
                    src="http://localhost:3000/images/hero.jpg"
                /> */}
                <div className="contact-item-info">
                  <h1>Contact</h1>
                  <p style={{marginBottom: "2rem"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel minus at, dolores odio ex magni corporis quidem enim eius. Maxime labore hic aliquid assumenda saepe, quas repudiandae fuga quae accusamus!</p>
                  <h3>Get in touch with customer service:</h3>
                  <h3>+47 000 00 000</h3>
                  <div className="mapFrame">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.6037872533277!2d10.738724316097001!3d59.91386998187614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4642a7e1f5f4d5b9%3A0x2e9a4f4f4f4f4f4f!2sOslo%20Metropolitan%20University!5e0!3m2!1sen!2sno!4v1625581000000!5m2!1sen!2sno" style={{border:0, marginTop: "5rem"}} title="contact-map">
                    </iframe>
                </div>
                </div>
                {/* random google maps api */}
                
              </div>
    </div>
  )
}
