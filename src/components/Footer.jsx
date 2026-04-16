import { motion } from 'framer-motion';
import { FaGamepad, FaHeart, FaArrowUp, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-glow"></div>

            <div className="container">
                <div className="footer-content">
                    <motion.div
                        className="footer-brand"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <a href="#home" className="footer-logo">
                            <FaGamepad className="logo-icon" />
                            <span>VARDHAN</span>
                        </a>
                        <p className="footer-tagline">
                            Crafting immersive gaming experiences with passion and precision.
                        </p>
                    </motion.div>

                    <motion.div
                        className="footer-links"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#about">About</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#resume">Resume</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="footer-social"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h4>Connect</h4>
                        <div className="social-links-footer">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © {currentYear} Vardhan Singh Chauhan. Made with <FaHeart className="heart-icon" /> and lots of ☕
                    </p>

                    <motion.button
                        className="back-to-top"
                        onClick={scrollToTop}
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaArrowUp />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
