import { Outlet, useNavigate } from "react-router-dom";
import { FaBug } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import styles from "./Header.module.css"; // Import CSS Module

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.brand}>
          <FaBug size={30} style={{ marginRight: "8px" }} />
          Bug Hunt
        </div>
        <div className={styles.headerItems}>
          <div className={styles.headerItem}>
            <FaUserCircle size={18} style={{ marginRight: "8px" }} />
            Profile
          </div>
          <div
            className={`${styles.headerItem} ${styles.logout}`}
            onClick={handleLogout}
          >
            <FiLogOut size={18} style={{ marginRight: "8px" }} />
            Logout
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
