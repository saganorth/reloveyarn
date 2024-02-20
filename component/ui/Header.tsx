import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Header.module.css';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
     
        
        <div className={styles.dropdownContainer}>
          <button onClick={toggleDropdown} className={styles.dropdownButton}> <i className="fa fa-bars"></i></button>
          {dropdownVisible && (
            <div className={styles.dropdownMenu}>
              <Link href="/category1"><div className={styles.dropdownItem}>Kategori 1</div></Link>
              <Link href="/category2"><div className={styles.dropdownItem}>Kategori 2</div></Link>
              {/* Fler länkar */}
            </div>
          )}
        </div>
        <Link href="/">
        <h1 className={styles.headerTitle}>ReLoveYarn</h1>
        </Link>
        <Link href="/cart">
          <div className={styles.cartLink}>Cart</div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
