import React, { useState } from "react";

const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', Helvetica, Arial, sans-serif",
    background: "#f9fafb",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  mainContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    background: "#f9fafb",
  },
  topNav: {
    display: "flex",
    alignItems: "center",
    padding: "12px 24px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    width: "100%",
    boxSizing: "border-box",
  },
  navItems: {
    display: "flex",
    gap: "24px",
    fontSize: "14px",
  },
  navItemsLink: {
    color: "#374151",
    textDecoration: "none",
  },
  navItemsLinkActive: {
    color: "#000000",
    fontWeight: 500,
  },
  helpSection: {
    background: "#ffffff",
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    width: "100%",
    boxSizing: "border-box",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "16px",
    color: "#111827",
  },
  faqList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  faqItem: {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    overflow: "hidden",
  },
  faqQuestion: {
    padding: "16px",
    background: "#f9fafb",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqAnswer: {
    padding: "16px",
    borderTop: "1px solid #e5e7eb",
    lineHeight: 1.6,
  },
  tutorials: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
    marginTop: "24px",
    flexWrap: "wrap", // Preserve existing flexWrap
  },
  tutorialCard: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    overflow: "hidden",
    padding: "16px",
    width: "300px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  tutorialVideo: {
    marginBottom: "8px",
    background: "#f3f4f6",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  videoPlaceholder: {
    background: "#e5e7eb",
    padding: "8px",
    borderRadius: "4px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
  },
  tutorialContent: {
    padding: "16px",
  },
  tutorialTitle: {
    fontWeight: 500,
    marginBottom: "8px",
    color: "#111827",
  },
  tutorialDescription: {
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: 1.5,
  },
  contactForm: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "600px",
    marginTop: "24px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
  },
  formLabel: {
    marginBottom: "8px",
    fontWeight: 500,
    display: "block",
  },
  formInput: {
    padding: "8px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    fontSize: "14px",
    width: "100%",
    fontFamily: "inherit",
  },
  formInputTextarea: {
    minHeight: "120px",
    resize: "vertical",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  submitButtonDisabled: {
    backgroundColor: "#6b7280",
    cursor: "not-allowed",
  },
  statusMessage: {
    color: "green",
    marginTop: "8px",
  },
  errorMessage: {
    color: "red",
    marginTop: "8px",
  },
};

function HelpPage() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const faqItems = [
    {
      question: "How do I get started with the BAJE API?",
      answer:
        "First, sign up for an API key from your dashboard. Then, follow our quickstart guide to begin.",
    },
    {
      question: "What are the available API endpoints?",
      answer:
        "We offer chat, function calling, classification, and more. All documented in our API section.",
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Simulate API call (replace with actual API call if needed)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.body}>
      <nav style={styles.topNav}>
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
          <h2 style={styles.sectionTitle}>Tutorials</h2>
          <div style={styles.tutorials}>
            <div style={styles.tutorialCard}>
              <div style={styles.tutorialVideo}>
                <div style={styles.videoPlaceholder}>
                  Tutorial Video: Getting Started
                </div>
              </div>
              <div style={styles.tutorialContent}>
                <h3 style={styles.tutorialTitle}>Getting Started with BAJE</h3>
                <p style={styles.tutorialDescription}>
                  Learn the basics of integrating BAJE into your applications and
                  making your first API call.
                </p>
              </div>
            </div>
            <div style={styles.tutorialCard}>
              <div style={styles.tutorialVideo}>
                <div style={styles.videoPlaceholder}>
                  Tutorial Video: Advanced Features
                </div>
              </div>
              <div style={styles.tutorialContent}>
                <h3 style={styles.tutorialTitle}>Advanced API Features</h3>
                <p style={styles.tutorialDescription}>
                  Explore advanced features like function calling, streaming
                  responses, and fine-tuning.
                </p>
              </div>
            </div>
            <div style={styles.tutorialCard}>
              <div style={styles.tutorialVideo}>
                <div style={styles.videoPlaceholder}>
                  Tutorial Video: Best Practices
                </div>
              </div>
              <div style={styles.tutorialContent}>
                <h3 style={styles.tutorialTitle}>API Best Practices</h3>
                <p style={styles.tutorialDescription}>
                  Learn about rate limiting, error handling, and optimization
                  techniques.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.helpSection}>
          <h2 style={styles.sectionTitle}>Contact Support</h2>
          <form style={styles.contactForm} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.formInput}
                placeholder="Your name"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.formInput}
                placeholder="your@email.com"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                style={{ ...styles.formInput, ...styles.formInputTextarea }}
                placeholder="How can we help?"
                required
              />
            </div>
            <button
              type="submit"
              style={{
                ...styles.submitButton,
                ...(isSubmitting ? styles.submitButtonDisabled : {}),
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {submitStatus && (
              <div
                style={
                  submitStatus.includes("successfully")
                    ? styles.statusMessage
                    : styles.errorMessage
                }
              >
                {submitStatus}
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

export default HelpPage;