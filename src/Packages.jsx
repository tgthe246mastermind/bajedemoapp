import React from 'react';

const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #1a4731 0%, #065f46 100%)',
    color: '#fff',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowX: 'hidden',
    overflowY: 'auto', // scroll vertically if content overflows height
  },

  container: {
    maxWidth: 1200,
    width: '100%',
    padding: '40px 20px',
    boxSizing: 'border-box',
    flex: '1 1 auto', // grow and shrink but take available vertical space
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    textAlign: 'center',
    marginBottom: 60,
  },

  headerH1: {
    fontSize: 48,
    margin: 0,
    background: 'linear-gradient(to right, #4ade80, #22d3ee)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'white',
  },

  packagesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 30,
    marginBottom: 40,
    width: '100%',
    boxSizing: 'border-box',
    flexGrow: 1,
  },

  packageCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: 20,
    padding: 30,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'transform 0.3s ease',
    boxSizing: 'border-box',
  },

  packageName: {
    fontSize: 24,
    fontWeight: 700,
    margin: '0 0 20px 0',
    color: '#4ade80',
  },

  packagePrice: {
    fontSize: 36,
    fontWeight: 700,
    margin: '0 0 20px 0',
  },

  period: {
    fontSize: 16,
    opacity: 0.7,
  },

  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 30px 0',
  },

  featuresListItem: {
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  ctaButton: {
    width: '100%',
    padding: 15,
    border: 'none',
    borderRadius: 10,
    background: 'linear-gradient(to right, #4ade80, #22d3ee)',
    color: 'white',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },

  enterpriseNote: {
    textAlign: 'center',
    maxWidth: 600,
    margin: '40px auto 0',
    padding: 20,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: 10,
    boxSizing: 'border-box',
  },

  '@media (max-width: 768px)': {
    packagesGrid: {
      gridTemplateColumns: '1fr',
    },
    headerH1: {
      fontSize: 36,
    },
  },
};

function Packages() {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.headerH1}>BAJE Subscription Packages</h1>
        </header>

        <div style={styles.packagesGrid}>
          <PackageCard
            name="Free Package"
            price="$0"
            period="/month"
            features={[
              "15 hours access to Main Agent",
              "6 hours access to Traffic & Tourism agents",
              "Text and voice features",
              "Basic support",
            ]}
            buttonText="Get Started Free"
          />
          <PackageCard
            name="Regular Citizen"
            price="$19.99"
            period="/month"
            features={[
              "24/7 access to all agents",
              "Text and voice features",
              "Chart visualization",
              "Priority support",
            ]}
            buttonText="Subscribe Now"
          />
          <PackageCard
            name="VIP Citizen"
            price="$49.99"
            period="/month"
            features={[
              "All Regular features",
              "Interactive maps",
              "XR capabilities",
              "Premium support",
            ]}
            buttonText="Upgrade to VIP"
          />
          <PackageCard
            name="Small Business"
            price="$149.99"
            period="/month"
            features={[
              "All VIP features",
              "Business simulations",
              "Custom chatbot",
              "General AI generations",
            ]}
            buttonText="Start Business Plan"
          />
          <PackageCard
            name="Medium Business"
            price="$299.99"
            period="/month"
            features={[
              "All Small Business features",
              "Business-specific generations",
              "Advertising discounts",
              "Dedicated support",
            ]}
            buttonText="Contact Sales"
          />
          <PackageCard
            name="Large Business"
            price="$999.99"
            period="/month"
            features={[
              "All Medium Business features",
              "API access",
              "Physical support",
              "Enterprise-grade solutions",
            ]}
            buttonText="Contact Sales"
          />
        </div>

        <div style={styles.enterpriseNote}>
          <h3>Organizations & Government Entities</h3>
          <p>
            We offer custom enterprise solutions tailored to your specific needs.
            Contact our sales team for a personalized quote and detailed consultation.
          </p>
          <button style={styles.ctaButton}>Request Custom Quote</button>
        </div>
      </div>
    </div>
  );
}

function PackageCard({ name, price, period, features, buttonText }) {
  return (
    <div style={styles.packageCard}>
      <div style={styles.packageName}>{name}</div>
      <div style={styles.packagePrice}>
        {price} <span style={styles.period}>{period}</span>
      </div>
      <ul style={styles.featuresList}>
        {features.map((feature, i) => (
          <li key={i} style={styles.featuresListItem}>
            <span style={{ color: '#4ade80', fontWeight: 'bold', marginRight: 10 }}>
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <button style={styles.ctaButton}>{buttonText}</button>
    </div>
  );
}

export default Packages;
