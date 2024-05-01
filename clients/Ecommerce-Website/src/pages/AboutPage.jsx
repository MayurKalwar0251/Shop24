import React from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import company1Logo from "../assets/company1-logo.jpg";
import company2Logo from "../assets/company2-logo.jpg";
import company3Logo from "../assets/company3-logo.png";
import company4Logo from "../assets/company4-logo.jpg";
import company5Logo from "../assets/company5-logo.jpg";
import company6Logo from "../assets/company6-logo.jpg";
import company7Logo from "../assets/company7-logo.jpg";
import company8Logo from "../assets/company8-logo.jpg";

const AboutPage = () => {
  const aboutStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 1)",
    backgroundColor: "#f9f9f9",
  };

  const headingStyle = {
    marginBottom: "20px",
    color: "#333",
  };

  const paragraphStyle = {
    marginBottom: "20px",
    lineHeight: "1.6",
    color: "#555",
  };
  const backgroundStyle = {
    backgroundColor: "#000", // Change the background color here
  };
  return (
    <Layout
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={aboutStyle}
      >
        <h1 style={headingStyle}>About Our Tech Products</h1>
        <p style={paragraphStyle}>
          Welcome to our tech products emporium! At our store, we are passionate
          about bringing you the latest and greatest in technology.
        </p>
        <p style={paragraphStyle}>
          Our mission is to provide you with top-quality gadgets, devices, and
          accessories that enhance your digital lifestyle. Whether you're a tech
          enthusiast, a professional in need of cutting-edge tools, or simply
          someone who loves staying connected, we have something for you.
        </p>
        {/* <p style={paragraphStyle}>
          With a keen eye for innovation and a commitment to customer satisfaction, we carefully curate our product selection to ensure you have access to the most reliable and advanced tech solutions on the market.
        </p> */}
        <p style={paragraphStyle}>
          From smartphones and laptops to smart home devices and wearables, we
          strive to offer a diverse range of products that cater to your every
          need.
        </p>
        <p style={paragraphStyle}>
          Thank you for choosing us as your go-to destination for all things
          tech. We look forward to serving you and helping you discover the
          perfect products to complement your digital lifestyle.
        </p>

        <div className="logos-section">
          <h2>Trusted by:</h2>
          <div className="company-logos">
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={company1Logo}
              alt="Company 1"
              style={{ marginRight: "20px", height: "100px" }}
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              src={company2Logo}
              alt="Company 2"
              style={{ marginRight: "20px", height: "100px" }}
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              src={company3Logo}
              alt="Company 3"
              style={{ marginRight: "20px", height: "130px" }}
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              src={company6Logo}
              alt="Company 6"
              style={{ marginRight: "20px", height: "80px" }}
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              src={company4Logo}
              alt="Company 4"
              style={{ marginRight: "50px", height: "100px" }}
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              src={company7Logo}
              alt="Company 7"
              style={{ marginRight: "80px", height: "130px" }}
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              src={company5Logo}
              alt="Company 5"
              style={{ marginRight: "65px", height: "80px" }}
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              src={company8Logo}
              alt="Company 8"
              style={{ marginRight: "30px", height: "100px" }}
            />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default AboutPage;
