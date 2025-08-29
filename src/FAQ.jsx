import React, { useState } from "react";

const styles = {
body: {
  margin: 0,
  padding: 0,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  background: "#f9fafb",
  width: "100%",
  minHeight: "100vh",   // ✅ not locked height
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
},


mainContainer: {
  flex: 1,
  width: "100%",
  minHeight: "100vh",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  background: "#f9fafb",
  overflowX: "hidden",
  overflowY: "auto",

  // ✅ Phones 375px and smaller
  "@media (max-width: 375px)": {
    width: "100vw",    // full viewport width (matches 375 on iPhone)
    height: "100vh",   // full viewport height (e.g. 667, 736, 812 depending on device)
    padding: "6px",
    overflow: "hidden",   // prevent horizontal scrollbars
  },

  "@media (min-width: 376px) and (max-width: 479px)": {
    padding: "6px",
  },
  "@media (min-width: 480px) and (max-width: 767px)": {
    padding: "8px",
  },
  "@media (min-width: 768px) and (max-width: 1024px)": {
    padding: "10px",
  },
  "@media (min-width: 1025px) and (max-width: 1280px)": {
    padding: "12px",
  },
  "@media (min-width: 1281px)": {
    padding: "16px",
  },
},


topNav: {
  display: "flex",
  flexWrap: "wrap",   // ✅ allow items to wrap onto a second line
  alignItems: "center",
  padding: "12px 20px",
  background: "#ffffff",
  borderBottom: "1px solid #e5e7eb",

  "@media (min-width: 320px) and (max-width: 479px)": {
    padding: "6px 8px",
    flexDirection: "column",  // ✅ stack logo + links vertically on tiny screens
    alignItems: "flex-start",
  },
  "@media (min-width: 480px) and (max-width: 767px)": {
    padding: "7px 10px",
  },
  "@media (min-width: 768px) and (max-width: 1024px)": {
    padding: "8px 12px",
  },
  "@media (min-width: 1025px) and (max-width: 1280px)": {
    padding: "10px 16px",
  },
  "@media (min-width: 1281px)": {
    padding: "12px 20px",
  },
},

  navItems: {
  display: "flex",
  gap: "16px",
  fontSize: "14px",
  flexWrap: "wrap",  // ✅ also add wrapping safeguard

  "@media (min-width: 320px) and (max-width: 479px)": {
    gap: "6px",
    fontSize: "9px",   // ✅ force smaller text
  },
},

  navItemsLink: {
    color: "#374151",
    textDecoration: "none",
    fontSize: "14px",
    "@media (min-width: 320px) and (max-width: 479px)": { fontSize: "10px" },
    "@media (min-width: 480px) and (max-width: 767px)": { fontSize: "11px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { fontSize: "12px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { fontSize: "13px" },
    "@media (min-width: 1281px)": { fontSize: "14px" },
  },
  navItemsLinkActive: {
    color: "#000000",
    fontWeight: 500,
    fontSize: "14px",
    "@media (min-width: 320px) and (max-width: 479px)": { fontSize: "10px" },
    "@media (min-width: 480px) and (max-width: 767px)": { fontSize: "11px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { fontSize: "12px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { fontSize: "13px" },
    "@media (min-width: 1281px)": { fontSize: "14px" },
  },
  helpSection: {
    background: "#ffffff",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    "@media (min-width: 320px) and (max-width: 479px)": { padding: "8px", borderRadius: "4px" },
    "@media (min-width: 480px) and (max-width: 767px)": { padding: "10px", borderRadius: "5px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { padding: "12px", borderRadius: "6px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { padding: "14px", borderRadius: "7px" },
    "@media (min-width: 1281px)": { padding: "16px", borderRadius: "8px" },
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: "16px",
    fontSize: "22px",
    color: "#111827",
    "@media (min-width: 320px) and (max-width: 479px)": { fontSize: "14px" },
    "@media (min-width: 480px) and (max-width: 767px)": { fontSize: "16px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { fontSize: "18px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { fontSize: "20px" },
    "@media (min-width: 1281px)": { fontSize: "22px" },
  },
  faqList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    "@media (min-width: 320px) and (max-width: 479px)": { gap: "8px" },
    "@media (min-width: 480px) and (max-width: 767px)": { gap: "10px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { gap: "12px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { gap: "14px" },
    "@media (min-width: 1281px)": { gap: "16px" },
  },
  faqItem: {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    "@media (min-width: 320px) and (max-width: 479px)": { borderRadius: "4px" },
    "@media (min-width: 480px) and (max-width: 767px)": { borderRadius: "5px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { borderRadius: "6px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { borderRadius: "7px" },
    "@media (min-width: 1281px)": { borderRadius: "8px" },
  },
  faqQuestion: {
    padding: "16px",
    background: "#f9fafb",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    "@media (min-width: 320px) and (max-width: 479px)": { padding: "8px", fontSize: "12px" },
    "@media (min-width: 480px) and (max-width: 767px)": { padding: "10px", fontSize: "13px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { padding: "12px", fontSize: "14px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { padding: "14px", fontSize: "15px" },
    "@media (min-width: 1281px)": { padding: "16px", fontSize: "16px" },
  },
  faqAnswer: {
    padding: "16px",
    borderTop: "1px solid #e5e7eb",
    fontSize: "16px",
    lineHeight: 1.6,
    "@media (min-width: 320px) and (max-width: 479px)": { padding: "8px", fontSize: "12px" },
    "@media (min-width: 480px) and (max-width: 767px)": { padding: "10px", fontSize: "13px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { padding: "12px", fontSize: "14px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { padding: "14px", fontSize: "15px" },
    "@media (min-width: 1281px)": { padding: "16px", fontSize: "16px" },
  },
  tutorials: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "16px",
    marginTop: "16px",
    "@media (min-width: 320px) and (max-width: 479px)": { gridTemplateColumns: "1fr" },
    "@media (min-width: 480px) and (max-width: 767px)": { gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" },
    "@media (min-width: 768px) and (max-width: 1024px)": { gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" },
    "@media (min-width: 1281px)": { gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" },
  },
  tutorialCard: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "16px",
    "@media (min-width: 320px) and (max-width: 479px)": { padding: "8px" },
    "@media (min-width: 480px) and (max-width: 767px)": { padding: "10px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { padding: "12px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { padding: "14px" },
    "@media (min-width: 1281px)": { padding: "16px" },
  },
  tutorialVideo: {
    marginBottom: "8px",
    background: "#f3f4f6",
    height: "180px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media (min-width: 320px) and (max-width: 479px)": { height: "100px" },
    "@media (min-width: 480px) and (max-width: 767px)": { height: "120px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { height: "140px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { height: "160px" },
    "@media (min-width: 1281px)": { height: "180px" },
  },
  videoPlaceholder: {
    background: "#e5e7eb",
    padding: "8px",
    borderRadius: "6px",
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280",
    "@media (min-width: 320px) and (max-width: 479px)": { padding: "4px", fontSize: "10px" },
    "@media (min-width: 480px) and (max-width: 767px)": { padding: "5px", fontSize: "11px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { padding: "6px", fontSize: "12px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { padding: "7px", fontSize: "13px" },
    "@media (min-width: 1281px)": { padding: "8px", fontSize: "14px" },
  },
  tutorialContent: {
    padding: "16px",
    "@media (min-width: 320px) and (max-width: 479px)": { padding: "8px" },
    "@media (min-width: 480px) and (max-width: 767px)": { padding: "10px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { padding: "12px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { padding: "14px" },
    "@media (min-width: 1281px)": { padding: "16px" },
  },
  tutorialTitle: {
    fontWeight: 500,
    marginBottom: "8px",
    fontSize: "16px",
    "@media (min-width: 320px) and (max-width: 479px)": { fontSize: "12px" },
    "@media (min-width: 480px) and (max-width: 767px)": { fontSize: "13px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { fontSize: "14px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { fontSize: "15px" },
    "@media (min-width: 1281px)": { fontSize: "16px" },
  },
  tutorialDescription: {
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: 1.5,
    "@media (min-width: 320px) and (max-width: 479px)": { fontSize: "10px" },
    "@media (min-width: 480px) and (max-width: 767px)": { fontSize: "11px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { fontSize: "12px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { fontSize: "13px" },
    "@media (min-width: 1281px)": { fontSize: "14px" },
  },
  contactButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "14px",
    "@media (min-width: 320px) and (max-width: 479px)": { padding: "6px 12px", fontSize: "10px" },
    "@media (min-width: 480px) and (max-width: 767px)": { padding: "7px 14px", fontSize: "11px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { padding: "8px 16px", fontSize: "12px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { padding: "9px 18px", fontSize: "13px" },
    "@media (min-width: 1281px)": { padding: "10px 20px", fontSize: "14px" },
  },
  logo: {
    height: "50px",
    marginRight: "16px",
    "@media (min-width: 320px) and (max-width: 479px)": { height: "30px" },
    "@media (min-width: 480px) and (max-width: 767px)": { height: "35px" },
    "@media (min-width: 768px) and (max-width: 1024px)": { height: "40px" },
    "@media (min-width: 1025px) and (max-width: 1280px)": { height: "45px" },
    "@media (min-width: 1281px)": { height: "50px" },
  },
};

const EmailButton = () => {
  const email = "Info@cariventuresglobal.com";
  const subject = encodeURIComponent("ISLE AI Support");
  const body = encodeURIComponent("Hello, I have a question about ISLE AI.");

  return (
    <a
      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`}
      style={styles.contactButton}
      target="_blank"
      rel="noopener noreferrer"
    >
      Email Support
    </a>
  );
};

function HelpPage() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqItems = [
    {
      question: "What is ISLE AI, and how is it starting in Barbados?",
      answer:
        "ISLE AI is an innovative AI-driven platform launching in Barbados on August 31, 2025, designed to enhance user experiences with smart, personalized services. Starting in Barbados, it leverages the island’s growing AI ecosystem to deliver cutting-edge solutions, with plans for broader Caribbean expansion. Visit https://isleai.com for updates.",
    },
    {
      question: "Why are prompts limited in ISLE AI?",
      answer:
        "ISLE AI limits prompts (e.g., queries or requests) to optimize performance and ensure reliable responses, especially during the initial Barbados launch. This helps maintain system stability while serving a growing user base in a resource-efficient manner.",
    },
    {
      question: "How can I use ISLE AI in Barbados?",
      answer:
        "Sign up for ISLE AI through the app or website, available starting August 31, 2025. Use it to access AI-powered features like personalized recommendations or services tailored to your needs in Barbados, such as travel planning or local insights.",
    },
    {
      question: "How does ISLE AI protect my data in Barbados?",
      answer:
        "ISLE AI uses advanced encryption and complies with Barbados’ data protection regulations to safeguard your information. We prioritize user privacy and do not share data without consent. See our privacy policy at https://isleai.com for details.",
    },
    {
      question: "How will ISLE AI benefit Barbados?",
      answer:
        "ISLE AI aims to boost Barbados’ economy by creating tech jobs, fostering innovation, and supporting the island’s emergence as an AI hub. It aligns with local initiatives to upskill youth and drive sustainable growth through technology.",
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div style={styles.body}>
      <nav style={styles.topNav}>
        <img src="/isle.png" alt="ISLE AI Logo" style={styles.logo} />
        <div style={styles.navItems}>
          <a href="#" style={styles.navItemsLink}>
            Dashboard
          </a>
          <a href="#" style={styles.navItemsLink}>
            Workbench
          </a>
          <a
            href="#"
            style={{ ...styles.navItemsLink, ...styles.navItemsLinkActive }}
          >
            Help
          </a>
        </div>
      </nav>

      <div style={styles.mainContainer}>
        <section style={styles.helpSection}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div style={styles.faqList}>
            {faqItems.map((item, index) => (
              <div key={index} style={styles.faqItem}>
                <div
                  style={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                >
                  {item.question}
                  <span>{expandedFAQ === index ? "−" : "+"}</span>
                </div>
                {expandedFAQ === index && (
                  <div style={styles.faqAnswer}>{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={styles.helpSection}>
          <h2 style={styles.sectionTitle}>Contact Support</h2>
          <EmailButton />
          <p style={{ marginTop: "12px", color: "#6b7280", fontSize: "14px" }}>
            If the button doesn't work, please email{" "}
            <a href="mailto:baisig246@gmail.com" style={{ color: "#007bff" }}>
              Info@cariventuresglobal.com
            </a>{" "}
            directly.
          </p>
        </section>
      </div>
    </div>
  );
}

export default HelpPage;
