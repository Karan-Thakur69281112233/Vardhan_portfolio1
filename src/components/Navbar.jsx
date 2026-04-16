import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaGamepad } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'ArtStation', href: 'https://www.artstation.com/', external: true },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  const mobileMenuVariants = {
    initial: { opacity: 0, x: '100%' },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        <motion.a
          href="#home"
          className="navbar-logo"
          variants={logoVariants}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGamepad className="logo-icon" />
          <span className="logo-text">VARDHAN</span>
        </motion.a>

        <ul className="navbar-links">
          {navItems.map((item, i) => (
            <motion.li
              key={item.name}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              custom={i}
            >
              <a 
                href={item.href} 
                className="nav-link"
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                <span className="nav-link-text">{item.name}</span>
                <span className="nav-link-hover"></span>
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
        </motion.button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ul className="mobile-menu-links">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: i * 0.1 }
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => !item.external && setIsMobileMenuOpen(false)}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
