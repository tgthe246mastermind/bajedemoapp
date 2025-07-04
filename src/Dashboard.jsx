// import React from 'react';

// const styles = {
//   root: {
//     '--default-font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "Source Han Sans CN", sans-serif',
//   },
//   dashContainer: {
//     position: 'relative',
//     width: '100%',
//     height: '100vh',
//     margin: '0 auto',
//     background: '#121212',
//     overflow: 'hidden',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     color: 'white',
//     fontFamily: 'Jost, var(--default-font-family)',
//   },
//   dashboardHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     padding: '20px 30px',
//   },
//   logo: {
//     display: 'flex',
//     alignItems: 'center',
//     color: 'white',
//     fontSize: '30px',
//     fontWeight: '700',
//     justifyContent: 'center',
//     width: '100%',
//   },
//   dashboardContent: {
//     width: '80%',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginTop: '50px',
//   },
//   card: {
//     width: '100%',
//     background: '#1e1e1e',
//     border: '1px solid #303139',
//     borderRadius: '10px',
//     padding: '20px',
//     marginBottom: '20px',
//   },
//   cardHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     padding: '10px 20px',
//     borderBottom: '1px solid #303139',
//     boxSizing: 'border-box', // Ensure padding doesn’t cause overflow
//     overflow: 'hidden' // Prevent content from breaking the layout
//   },
//   cardTitle: {
//     fontSize: '18px',
//     fontWeight: '700',
//   },
//   cardContent: {
//     padding: '20px',
//   },
//   navLink: {
//     color: '#5db075',
//     textDecoration: 'none',
//   },
//   navLinkHover: {
//     color: '#4ca064',
//   },
// };

// const Dashboard = () => {
//   return (
//     <div style={{ ...styles.root, ...styles.dashContainer }}>
//       <div style={styles.dashboardHeader}>
//         <div style={styles.logo}>BAJE</div>
//         <nav>
//           <a style={styles.navLink} href="https://example.com/settings">
//             Settings
//           </a>{' '}
//           <a style={styles.navLink} href="https://example.com/billing">
//             Billing
//           </a>
//         </nav>
//       </div>

//       <div style={styles.dashboardContent}>
//         <div style={styles.card}>
//           <div style={styles.cardHeader}>
//             <div style={styles.cardTitle}>Overview</div>
//             <a style={styles.navLink} href="https://example.com/overview">
//               View Details
//             </a>
//           </div>
//           <div style={styles.cardContent}>
//             Welcome to the BAJE dashboard. Here you can manage your account settings, view your billing information, and access other features.
//           </div>
//         </div>

//         <div style={styles.card}>
//           <div style={styles.cardHeader}>
//             <div style={styles.cardTitle}>Account Settings</div>
//             <a style={styles.navLink} href="https://example.com/account-settings">
//               Edit Settings
//             </a>
//           </div>
//           <div style={styles.cardContent}>
//             Manage your account settings, including your organization name, address, and contact information.
//           </div>
//         </div>

//         <div style={styles.card}>
//           <div style={styles.cardHeader}>
//             <div style={styles.cardTitle}>Billing Information</div>
//             <a style={styles.navLink} href="https://example.com/billing-information">
//               View Billing
//             </a>
//           </div>
//           <div style={styles.cardContent}>
//             View your billing information, including your current plan and payment history.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';

const styles = {
  root: {
    '--default-font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "Source Han Sans CN", sans-serif',
  },
  dashContainer: {
    position: 'relative',
    width: '700px', // Match Login’s mainContainer
    height: '840px', // Match Login’s mainContainer
    margin: '0 auto',
    background: '#121212',
    overflow: 'auto', // Allow scrolling to prevent clipping
    borderRadius: '8px', // Match Login’s borderRadius
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Jost, var(--default-font-family)',
    boxSizing: 'border-box',
  },
  dashboardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '20px 30px',
    boxSizing: 'border-box',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontSize: '30px',
    fontWeight: '700',
    justifyContent: 'center',
    width: '100%',
  },
  dashboardContent: {
    width: '80%', // Match Login’s loginForm width
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    background: '#1e1e1e',
    border: '1px solid #303139',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxSizing: 'border-box',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px 20px',
    borderBottom: '1px solid #303139', // The horizontal line
    boxSizing: 'border-box',
    overflow: 'hidden', // Prevent content overflow
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '700',
    wordBreak: 'break-word', // Prevent text overflow
  },
  cardContent: {
    padding: '20px',
    wordBreak: 'break-word', // Prevent text overflow
  },
  navLink: {
    color: '#5db075',
    textDecoration: 'none',
    whiteSpace: 'nowrap', // Prevent link wrapping
  },
  navLinkHover: {
    color: '#4ca064',
  },
};

const Dashboard = () => {
  return (
    <div style={{ ...styles.root, ...styles.dashContainer }}>
      <div style={styles.dashboardHeader}>
        <div style={styles.logo}>ISLE</div>
        <nav>
          <a style={styles.navLink} href="https://example.com/settings">
            Settings
          </a>{' '}
          <a style={styles.navLink} href="https://example.com/billing">
            Billing
          </a>
        </nav>
      </div>

      <div style={styles.dashboardContent}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>Overview</div>
            <a style={styles.navLink} href="https://example.com/overview">
              View Details
            </a>
          </div>
          <div style={styles.cardContent}>
            Welcome to the BAJE dashboard. Here you can manage your account settings, view your billing information, and access other features.
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>Account Settings</div>
            <a style={styles.navLink} href="https://example.com/account-settings">
              Edit Settings
            </a>
          </div>
          <div style={styles.cardContent}>
            Manage your account settings, including your organization name, address, and contact information.
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>Billing Information</div>
            <a style={styles.navLink} href="https://example.com/billing-information">
              View Billing
            </a>
          </div>
          <div style={styles.cardContent}>
            View your billing information, including your current plan and payment history.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;