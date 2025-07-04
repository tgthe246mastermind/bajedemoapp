import React, { useState } from "react";

const styles = {
  mainContainer: {
    margin: 0,
    padding: 0,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', Helvetica, Arial, sans-serif",
    background: "#f9fafb",
    width: "100vw",
    height: "100vh",
    // overflow: "hidden", // commented out to allow scrolling
    display: "flex",
    flexDirection: "column",
  },
  topNav: {
    backgroundColor: "#fff",
    padding: "1rem 2rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    flexShrink: 0,
  },
  navItems: {
    display: "flex",
    gap: "2rem",
  },
  navItemLink: {
    color: "#333",
    textDecoration: "none",
    fontWeight: "600",
  },
  navItemLinkActive: {
    color: "#0070f3",
    borderBottom: "2px solid #0070f3",
  },
  content: {
    padding: "2rem",
    overflowY: "auto",
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    marginBottom: "1rem",
    fontSize: "1.25rem",
    fontWeight: "700",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  formLabel: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "600",
  },
  formInput: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  saveButton: {
    backgroundColor: "#0070f3",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.2s ease",
  },
  saveButtonHover: {
    backgroundColor: "#005bb5",
  },
  dangerButton: {
    backgroundColor: "#e00",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.2s ease",
  },
  dangerButtonHover: {
    backgroundColor: "#a00",
  },
  billingInfo: {
    marginBottom: "1rem",
    fontSize: "1rem",
    color: "#555",
  },
  sectionDivider: {
    height: "1px",
    backgroundColor: "#eee",
    margin: "1rem 0",
  },
};

const Settings = () => {
  const [formData, setFormData] = useState({
    organizationName: "Acme Corp",
    plan: "Pro",
    cardNumber: "**** **** **** 1234",
    billingEmail: "billing@acmecorp.com",
    password: "",
    notificationsEmail: true,
    notificationsSMS: false,
    privacyProfilePublic: true,
  });

  const [isSaveHover, setIsSaveHover] = useState(false);
  const [isDeleteHover, setIsDeleteHover] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved:\n" + JSON.stringify(formData, null, 2));
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      alert("Account deleted!");
      // Implement actual delete logic here
    }
  };

  return (
    <div style={styles.mainContainer}>
      <nav style={styles.topNav}>
        <div style={styles.navItems}>
          <a href="#" style={styles.navItemLink}>
            Dashboard
          </a>
          <a href="#" style={styles.navItemLink}>
            Workbench
          </a>
          <a
            href="#"
            style={{ ...styles.navItemLink, ...styles.navItemLinkActive }}
          >
            Settings
          </a>
        </div>
      </nav>

      <main style={styles.content}>
        {/* Profile Settings */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Profile Settings</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Profile saved!");
            }}
          >
            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="organizationName">
                Organization Name
              </label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Enter organization name"
                style={styles.formInput}
                required
              />
            </div>

            <button type="submit" style={styles.saveButton}>
              Save Profile
            </button>
          </form>
        </section>

        {/* Plans & Billing */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Plans & Billing</h2>

          <div style={styles.billingInfo}>
            <p>
              <strong>Current Plan:</strong> {formData.plan}
            </p>
            <p>
              <strong>Billing Email:</strong> {formData.billingEmail}
            </p>
            <p>
              <strong>Payment Method:</strong> {formData.cardNumber}
            </p>
          </div>

          <div style={styles.sectionDivider} />

          <form onSubmit={handleSave}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="plan">
                Change Plan
              </label>
              <select
                id="plan"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                style={styles.formInput}
              >
                <option value="Free">Free</option>
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="billingEmail">
                Billing Email
              </label>
              <input
                type="email"
                id="billingEmail"
                name="billingEmail"
                value={formData.billingEmail}
                onChange={handleChange}
                placeholder="Enter billing email"
                style={styles.formInput}
                required
              />
            </div>

            <button
              type="submit"
              style={isSaveHover ? { ...styles.saveButton, ...styles.saveButtonHover } : styles.saveButton}
              onMouseEnter={() => setIsSaveHover(true)}
              onMouseLeave={() => setIsSaveHover(false)}
            >
              Save Changes
            </button>
          </form>
        </section>

        {/* Password & Security */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Password & Security</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Password updated!");
            }}
          >
            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                style={styles.formInput}
                required
                minLength={6}
              />
            </div>

            <button type="submit" style={styles.saveButton}>
              Update Password
            </button>
          </form>
        </section>

        {/* Notifications */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Notifications</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Notification settings saved!");
            }}
          >
            <div style={{ ...styles.formGroup, display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                id="notificationsEmail"
                name="notificationsEmail"
                checked={formData.notificationsEmail}
                onChange={handleChange}
                style={{ marginRight: "12px" }}
              />
              <label htmlFor="notificationsEmail" style={styles.formLabel}>
                Email Notifications
              </label>
            </div>

            <div style={{ ...styles.formGroup, display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                id="notificationsSMS"
                name="notificationsSMS"
                checked={formData.notificationsSMS}
                onChange={handleChange}
                style={{ marginRight: "12px" }}
              />
              <label htmlFor="notificationsSMS" style={styles.formLabel}>
                SMS Notifications
              </label>
            </div>

            <button type="submit" style={styles.saveButton}>
              Save Preferences
            </button>
          </form>
        </section>

        {/* Privacy Settings */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Privacy Settings</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Privacy settings saved!");
            }}
          >
            <div style={{ ...styles.formGroup, display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                id="privacyProfilePublic"
                name="privacyProfilePublic"
                checked={formData.privacyProfilePublic}
                onChange={handleChange}
                style={{ marginRight: "12px" }}
              />
              <label htmlFor="privacyProfilePublic" style={styles.formLabel}>
                Make Profile Public
              </label>
            </div>

            <button type="submit" style={styles.saveButton}>
              Save Privacy
            </button>
          </form>
        </section>

        {/* Delete Account */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Delete Account</h2>
          <p style={styles.billingInfo}>
            Deleting your account is <strong>permanent</strong> and will remove all
            your data from our servers. Please proceed with caution.
          </p>

          <button
            style={isDeleteHover ? { ...styles.dangerButton, ...styles.dangerButtonHover } : styles.dangerButton}
            onClick={handleDeleteAccount}
            onMouseEnter={() => setIsDeleteHover(true)}
            onMouseLeave={() => setIsDeleteHover(false)}
          >
            Delete My Account
          </button>
        </section>
      </main>
    </div>
  );
};

export default Settings;
