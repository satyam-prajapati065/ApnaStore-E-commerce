import React from "react";
import { Headset, ShieldCheck, Truck } from "lucide-react";

function Support() {
  return (
    <div className="customer-supports-benifits">
      <div className="services">
        <div className="service-logos">
          <Truck size={30} />
        </div>
        <div className="text-container">
          <p>FREE AND FAST DELIVERY</p>
          <span>Free delivery for all orders over $140</span>
        </div>
      </div>
      <div className="services">
        <div className="service-logos">
          <Headset />
        </div>
        <div className="text-container">
          <p>FREE AND FAST DELIVERY</p>
          <span>Free delivery for all orders over $140</span>
        </div>
      </div>
      <div className="services">
        <div className="service-logos">
          <ShieldCheck />
        </div>
        <div className="text-container">
          <p>FREE AND FAST DELIVERY</p>
          <span>Free delivery for all orders over $140</span>
        </div>
      </div>
    </div>
  );
}

export default Support;
