import React from "react";
import { Truck, Clock, Phone, RefreshCcw, Percent } from "lucide-react";

const OurServices = () => {
  return (
    <div className="flex flex-col justify-center bg-white p-8 rounded-lg shadow-lg text-center">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Our Services</h3>
      <div className="space-y-4">
        <ServiceItem icon={Truck} text="Worldwide Delivery For Order Over $100" />
        <ServiceItem icon={Clock} text="Next Day Delivery UK Orders Only" />
        <ServiceItem icon={Phone} text="Best Online Support Hours: 8AM - 11PM" />
        <ServiceItem icon={RefreshCcw} text="Return Policy Easy & Free Return" />
        <ServiceItem icon={Percent} text="30% Money Back For Order Over $100" />
      </div>
    </div>
  );
};

const ServiceItem = ({ icon: Icon, text }) => (
  <div className="flex items-center just">
    <div className="flex-shrink-0 mr-4">
      <Icon className="w-6 h-6 text-pink-500" />
    </div>
    <p className="text-gray-700">{text}</p>
  </div>
);

export default OurServices;
