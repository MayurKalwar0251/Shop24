import React from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 1)",
          backgroundColor: "#f2f2f2",
        }}
      >
        <h1 style={{ marginBottom: "20px", color: "#333" }}>Contact Us</h1>
        <p style={{ marginBottom: "30px", lineHeight: "1.6", color: "#555" }}>
          Have a question or need assistance? Feel free to reach out to us using
          the contact form below. We'll get back to you as soon as possible.
        </p>

        <form style={{ width: "100%", maxWidth: "400px" }}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="name"
              style={{ marginBottom: "5px", color: "#333", display: "block" }}
            >
              Your Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{ marginBottom: "5px", color: "#333", display: "block" }}
            >
              Your Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "30px" }}>
            <label
              htmlFor="message"
              style={{ marginBottom: "5px", color: "#333", display: "block" }}
            >
              Your Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={{
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </Layout>
  );
};

export default ContactUs;
