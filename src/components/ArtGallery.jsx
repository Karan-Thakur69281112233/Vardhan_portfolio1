import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPalette, FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ArtGallery.css';

gsap.registerPlugin(ScrollTrigger);

const ArtGallery = () => {
    const sectionRef = useRef(null);
    const [selectedArt, setSelectedArt] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.art-card', {
                scale: 0.9,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'expo.out'
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const artworks = [
        {
            id: 1,
            title: 'Fantasy Warrior',
            category: '2d',
            description: 'Digital painting of a fantasy warrior character',
            color: '#6366f1'
        },
        {
            id: 2,
            title: 'Idle Animation',
            category: 'animation',
            description: 'Character idle animation loop',
            color: '#ec4899'
        },
        {
            id: 3,
            title: 'Cyberpunk City',
            category: '2d',
            description: 'Futuristic cityscape concept art',
            color: '#06b6d4'
        },
        {
            id: 4,
            title: 'Walk Cycle',
            category: 'animation',
            description: 'Character walk cycle animation',
            color: '#10b981'
        },
        {
            id: 5,
            title: 'Magic Spell VFX',
            category: 'animation',
            description: 'Magical spell effect animation',
            color: '#8b5cf6'
        },
        {
            id: 6,
            title: 'Character Design',
            category: '2d',
            description: 'Original character design sheet',
            color: '#f59e0b'
        },
        {
            id: 7,
            title: 'Game UI Mockup',
            category: '2d',
            description: 'User interface design for RPG game',
            color: '#ef4444'
        },
        {
            id: 8,
            title: 'Attack Animation',
            category: 'animation',
            description: 'Combat attack animation sequence',
            color: '#14b8a6'
        }
    ];

    const filters = [
        { id: 'all', label: 'All Works' },
        { id: '2d', label: '2D Art' },
        { id: 'animation', label: 'Animations' }
    ];

    const filteredArtworks = activeFilter === 'all'
        ? artworks
        : artworks.filter(art => art.category === activeFilter);

    const openLightbox = (art) => setSelectedArt(art);
    const closeLightbox = () => setSelectedArt(null);

    const navigateArt = (direction) => {
        const currentIndex = filteredArtworks.findIndex(art => art.id === selectedArt.id);
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = filteredArtworks.length - 1;
        if (newIndex >= filteredArtworks.length) newIndex = 0;
        setSelectedArt(filteredArtworks[newIndex]);
    };

    return (
        <section id="art-gallery" className="section art-gallery" ref={sectionRef}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Art Gallery</h2>
                    <p className="section-subtitle">My 2D artwork and animations</p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    className="art-filters"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                    viewport={{ once: true }}
                >
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter.id)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </motion.div>

                {/* Art Grid */}
                <motion.div
                    className="art-grid"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredArtworks.map((art) => (
                            <ArtCard key={art.id} art={art} openLightbox={openLightbox} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Lightbox */}
                <AnimatePresence>
                    {selectedArt && (
                        <motion.div
                            className="lightbox"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeLightbox}
                        >
                            <motion.div
                                className="lightbox-content"
                                initial={{ scale: 0.85, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.85, opacity: 0, y: 20 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button className="lightbox-close" onClick={closeLightbox}>
                                    <FaTimes />
                                </button>

                                <button className="lightbox-nav prev" onClick={() => navigateArt(-1)}>
                                    <FaChevronLeft />
                                </button>

                                <div
                                    className="lightbox-image"
                                    style={{ background: `linear-gradient(135deg, ${selectedArt.color}60, ${selectedArt.color})` }}
                                >
                                    <FaPalette className="lightbox-placeholder-icon" />
                                    <span className="lightbox-badge">
                                        {selectedArt.category === '2d' ? '2D Art' : 'Animation'}
                                    </span>
                                </div>

                                <button className="lightbox-nav next" onClick={() => navigateArt(1)}>
                                    <FaChevronRight />
                                </button>

                                <div className="lightbox-info">
                                    <h3>{selectedArt.title}</h3>
                                    <p>{selectedArt.description}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

const ArtCard = ({ art, openLightbox }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Calculate glare translation based on tilt
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "-100%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "-100%"]);
    const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.5, 0, 0.5]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                layout: { type: 'spring', stiffness: 350, damping: 30 }
            }}
            style={{ perspective: 1200 }}
            className="art-card-container"
        >
            <motion.div
                className="art-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => openLightbox(art)}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
                <div
                    className="art-image"
                    style={{ 
                        background: `linear-gradient(135deg, ${art.color}40, ${art.color}80)`,
                        transform: "translateZ(30px)",
                        transformStyle: "preserve-3d"
                    }}
                >
                    <div style={{ transform: "translateZ(40px)", display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <FaPalette className="art-placeholder-icon" />
                    </div>
                    <span className="art-category-badge" style={{ transform: "translateZ(50px)" }}>
                        {art.category === '2d' ? '2D Art' : 'Animation'}
                    </span>
                    <div className="art-overlay" style={{ transform: "translateZ(60px)" }}>
                        <FaExpand className="expand-icon" />
                    </div>
                </div>
                <div className="art-info" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                    <h3 className="art-title" style={{ transform: "translateZ(20px)" }}>{art.title}</h3>
                    <p className="art-description" style={{ transform: "translateZ(10px)" }}>{art.description}</p>
                </div>
                
                {/* 4D Glare Effect */}
                <div style={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius-lg)', overflow: 'hidden', pointerEvents: 'none', zIndex: 10 }}>
                    <motion.div 
                        className="art-card-glare"
                        style={{
                            position: "absolute",
                            top: "-50%",
                            left: "-50%",
                            width: "200%",
                            height: "200%",
                            background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)",
                            x: glareX,
                            y: glareY,
                            opacity: glareOpacity
                        }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ArtGallery;
