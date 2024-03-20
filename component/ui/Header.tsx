import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Header.module.css'; // Ensure this path is correct

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Empty div for spacing */}
      <div className={styles.spacer}></div>

      <div className={styles.title}>
        ReLoveYarn
      </div>

      {/* Navigation Links and Cart Icon */}
      <div className={styles.navLinks}>
        <Link href="/shop">
          <div className={styles.navLink}>Shop</div>
        </Link>
        <Link href="/about">
          <div className={styles.navLink}>About Us</div>
        </Link>
        <div className={styles.cartIcon}>
          <Link href="/cart">
            <div><i className="fas fa-shopping-cart"></i></div>
          </Link>
        </div>
      </div>

      {/* Another empty div for spacing */}
      <div className={styles.spacer}></div>
    </header>
  );
};

export default Header;
