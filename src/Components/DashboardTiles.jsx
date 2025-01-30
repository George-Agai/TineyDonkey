import { useNavigate } from 'react-router-dom';

const DashboardTiles = () => {

  const navigate = useNavigate()

  const tiles = [
    {
      title: "Pending Orders",
      value: 3,
      linkText: "View all",
      linkAction: () => alert("Clicked"),
      icon: "📦",
    },
    {
      title: "Available Profit",
      value: `Ksh 1000`,
      linkText: "Manage Finances",
      linkAction: () => navigate("/finances"),
      icon: "💰",
    },
    {
      title: "Figurines In Stock",
      value: 12,
      subValue: "10,000",
      linkText: "Manage Figurines",
      linkAction: () => navigate("/addProductDashboard"),
      icon: "📊",
    },
    {
      title: "Total Figurines Sold",
      value: 40,
      subValue: "80,000",
      linkText: "View all",
      linkAction: () => alert("Clicked"),
      icon: "🛍️",
    },
  ];

  return (
    <div style={styles.container}>
      {tiles.map((tile, index) => (
        <div className="tile"  style={styles.tile}>
          <div key={index} style={styles.tileTop}>
            <div style={styles.content}>
              <h3 style={{ fontSize: "14px" }}>{tile.title}</h3>
              <h1 style={{ marginTop: "5px" }}>{tile.value}</h1>
              {!tile.subValue && <a onClick={tile.linkAction} style={styles.link}>
                {tile.linkText}
              </a>}

            </div>
            <div style={styles.icon}>{tile.icon}</div>
          </div>

          {tile.subValue && (
            <div style={styles.subRow}>
              <a onClick={tile.linkAction} style={styles.link}>
                {tile.linkText}
              </a>
              <p style={styles.subValue}>💸 Ksh{tile.subValue}</p>

            </div>
          )}
        </div>
      ))}
    </div>

  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    width: "100%",
    justifyContent: "space-between",
    
  },
  tile: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: "center",
    border: "1.5px solid rgb(231, 230, 230)",
    padding: "15px 25px",
    minWidth: "200px",
    flex: "1 1 calc(25% - 15px)", // Makes sure it fits 4 tiles in a row on large screens
    maxWidth: "calc(100% - 0px)",
    boxSizing: "border-box",
    marginTop: '5px'
  },
  tileTop:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%'
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    fontSize: "1.8rem",
    backgroundColor: 'rgb(241, 241, 241)',
    borderRadius: 10,
    padding: 4
  },
  subRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "-10px",
  },
  subValue: {
    fontSize: "12px",
    backgroundColor: '#ebf1bf',
    borderRadius: '20px',
    padding: '6px 8px',
    color: "black",
  },
  link: {
    color: "blue",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "15px",
  },
};

export default DashboardTiles;
