import React, { useState } from "react";

const styles = {
  pageWrapper: {
    margin: 0,
    padding: 0,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', Helvetica, Arial, sans-serif",
    backgroundColor: "#000",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  container: {
    width: "100%",
    maxWidth: "700px",
    height: "840px",
    backgroundColor: "#121212",
    borderRadius: "12px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  header: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#1E1E1E",
  },

  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#005A9C",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40px",
    marginRight: "20px",
    fontWeight: "bold",
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "5px",
  },

  email: {
    fontSize: "16px",
    color: "#888",
  },

  sections: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },

  section: {
    backgroundColor: "#1E1E1E",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "20px",
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "15px",
    color: "#5DB075",
  },

  option: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #303139",
  },

  lastOption: {
    borderBottom: "none",
  },

  toggle: (active) => ({
    width: "50px",
    height: "24px",
    backgroundColor: "#303139",
    borderRadius: "12px",
    position: "relative",
    cursor: "pointer",
    transition: "background 0.3s",
    ...(active && {
      backgroundColor: "#5DB075",
    }),
  }),

  toggleCircle: (active) => ({
    content: "''",
    position: "absolute",
    width: "20px",
    height: "20px",
    top: "2px",
    left: active ? "26px" : "2px",
    borderRadius: "50%",
    backgroundColor: "white",
    transition: "left 0.3s",
  }),

  logoutBtn: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#005A9C",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

function Profile() {
  const [userData] = useState({
    initials: "JD",
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const [notifications, setNotifications] = useState({
    trafficAlerts: true,
    waterOutageAlerts: false,
    emergencyNotifications: true,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.avatar}>{userData.initials}</div>
          <div style={styles.info}>
            <div style={styles.name}>{userData.name}</div>
            <div style={styles.email}>{userData.email}</div>
          </div>
        </div>

        <div style={styles.sections}>
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Account Settings</div>
            <div style={styles.option}>
              <span>Edit Profile</span>
              <span>›</span>
            </div>
            <div style={{ ...styles.option, ...styles.lastOption }}>
              <span>Change Password</span>
              <span>›</span>
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionTitle}>Notifications</div>
            {[
              { key: "trafficAlerts", label: "Traffic Alerts" },
              { key: "waterOutageAlerts", label: "Water Outage Alerts" },
              { key: "emergencyNotifications", label: "Emergency Notifications" },
            ].map((notif, index, arr) => (
              <div
                key={notif.key}
                style={{
                  ...styles.option,
                  ...(index === arr.length - 1 ? styles.lastOption : {}),
                }}
              >
                <span>{notif.label}</span>
                <div
                  style={styles.toggle(notifications[notif.key])}
                  onClick={() => toggleNotification(notif.key)}
                >
                  <div style={styles.toggleCircle(notifications[notif.key])}></div>
                </div>
              </div>
            ))}
          </div>

          <button style={styles.logoutBtn}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
