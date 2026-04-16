import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import ArtGallery from '../components/ArtGallery';
import './ArtGalleryPage.css';

const ArtGalleryPage = () => {
    useEffect(() => {
        // Scroll to top on page load
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            className="art-gallery-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Background Elements */}
            <div className="art-page-bg">
                <div className="art-bg-shape art-bg-shape-1"></div>
                <div className="art-bg-shape art-bg-shape-2"></div>
                <div className="art-bg-shape art-bg-shape-3"></div>
            </div>

            {/* Navigation Header */}
            <motion.nav
                className="art-page-nav"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
                <Link to="/" className="back-home-btn">
                    <FaArrowLeft className="back-icon" />
                    <span>Back to Portfolio</span>
                </Link>
                <Link to="/" className="home-icon-btn">
                    <FaHome />
                </Link>
            </motion.nav>

            {/* Page Title */}
            <motion.div
                className="art-page-header"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
                <h1 className="art-page-title">My Art Gallery</h1>
                <p className="art-page-subtitle">A collection of my 2D artwork and animations</p>
            </motion.div>

            {/* Art Gallery Content */}
            <ArtGallery />
        </motion.div>
    );
};

export default ArtGalleryPage;
