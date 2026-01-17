import { Link } from "react-router-dom";
import { logout } from "../api/auth";

export default function Navbar() {
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const styles = {
    nav: {
      background: "linear-gradient(135deg, #2c3e50, #34495e)",
      padding: "0.75rem 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      marginBottom: "20px",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "12px",
    },
    brand: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "1.4rem",
      fontWeight: 700,
    },
    links: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "8px",
    },
    link: {
      color: "#ecf0f1",
      textDecoration: "none",
      padding: "6px 12px",
      borderRadius: "6px",
      fontSize: "14px",
      transition: "background 0.2s ease",
    },
    linkHover: {
      background: "rgba(255,255,255,0.15)",
    },
    logoutBtn: {
      marginLeft: "8px",
      padding: "6px 14px",
      borderRadius: "6px",
      background: "transparent",
      border: "1px solid #fff",
      color: "#fff",
      fontSize: "14px",
      cursor: "pointer",
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/books" style={styles.brand}>
          📚 Book Manager
        </Link>

        <div style={styles.links}>
          {[
            ["Books", "/books"],
            ["Add Book", "/add-book"],
            ["Authors & Genres", "/author-genre"],
            ["Documents", "/documents"],
            ["Ingestion", "/ingestion"],
            ["RAG Search", "/rag"],
            ["Summary", "/summary"],
            ["Admin", "/admin/users"],
          ].map(([label, path]) => (
            <Link
              key={path}
              to={path}
              style={styles.link}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, styles.linkHover)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, { background: "transparent" })
              }
            >
              {label}
            </Link>
          ))}

          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
