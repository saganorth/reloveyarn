import React from 'react';
import Link from 'next/link';
import styles from '../../../styles/Header.module.css'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Left Section - About */}
      <div className={styles.leftNav}>
        <Link href="/about">
          <div className={styles.navLink}>About Us</div>
        </Link>
        <Link href="/form">
          <div className={styles.navLink}>Form </div>
        </Link>
      </div>

      {/* Center Section - Title */}
      <Link href="/">
        <div className={styles.title}>ReLoveYarn</div>
      </Link>

      {/* Right Section - Shop and Cart */}
      <div className={styles.rightNav}>
        <Link href="/shop">
          <div className={styles.navLink}>Shop</div>
        </Link>
        <Link href="/cart">
          <div className={styles.cartIcon}><FontAwesomeIcon icon={faShoppingCart} /></div>
        </Link>
      </div>
    </header>
  );
};

export default Header;