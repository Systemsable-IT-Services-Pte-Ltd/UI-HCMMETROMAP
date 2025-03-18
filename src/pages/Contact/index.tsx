import React from "react";
import ContactBanner from "./ContactBanner";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import LocationMap from "./LocationMap";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header Banner */}
      <ContactBanner />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <ContactInfo />

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>

      {/* Map Section */}
      <LocationMap />
    </div>
  );
};

export default Contact;