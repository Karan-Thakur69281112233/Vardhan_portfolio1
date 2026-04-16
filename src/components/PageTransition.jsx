import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette, FaBrush, FaImage, FaMagic, FaStar, FaFeather, FaPaintBrush, FaEye } from 'react-icons/fa';
import './PageTransition.css';

const PageTransition = ({ isActive, onComplete, targetSection }) => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Initializing...');

    useEffect(() => {
        if (!isActive) {
            setProgress(0);
            return;
        }

        const loadingTexts = [
            'Loading assets...',
            'Preparing canvas...',
            'Rendering artwork...',
            'Almost ready...',
            'Entering gallery...'
        ];

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.random() * 15 + 8;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    onComplete();
                }, 500);
            }
            setProgress(currentProgress);

            const textIndex = Math.min(Math.floor(currentProgress / 25), loadingTexts.length - 1);
            setLoadingText(loadingTexts[textIndex]);
        }, 180);

        return () => clearInterval(interval);
    }, [isActive, onComplete]);

    // Icons for the orbiting elements
    const orbitIcons = [FaPalette, FaBrush, FaImage, FaMagic, FaStar, FaFeather, FaPaintBrush, FaEye];

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    className="page-transition"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                    {/* Background layers */}
                    <motion.div
                        className="transition-layer layer-1"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    />
                    <motion.div
                        className="transition-layer layer-2"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                    />
                    <motion.div
                        className="transition-layer layer-3"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                    />

                    {/* 3D Orbital Ring System */}
                    <motion.div
                        className="orbital-scene"
                        initial={{ opacity: 0, scale: 0.3, rotateX: 90 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        {/* Central glowing orb */}
                        <div className="central-orb">
                            <motion.div
                                className="orb-core"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    boxShadow: [
                                        '0 0 40px rgba(236, 72, 153, 0.6)',
                                        '0 0 80px rgba(99, 102, 241, 0.8)',
                                        '0 0 40px rgba(236, 72, 153, 0.6)'
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <FaPalette className="orb-icon" />
                            </motion.div>
                        </div>

                        {/* Outer ring 1 */}
                        <div className="orbit-ring orbit-ring-1">
                            {orbitIcons.slice(0, 4).map((Icon, i) => (
                                <motion.div
                                    key={i}
                                    className="orbit-item"
                                    style={{
                                        '--orbit-delay': `${i * -1.5}s`,
                                        '--orbit-index': i
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                >
                                    <Icon />
                                </motion.div>
                            ))}
                        </div>

                        {/* Outer ring 2 (tilted) */}
                        <div className="orbit-ring orbit-ring-2">
                            {orbitIcons.slice(4, 8).map((Icon, i) => (
                                <motion.div
                                    key={i}
                                    className="orbit-item orbit-item-secondary"
                                    style={{
                                        '--orbit-delay': `${i * -1.5}s`,
                                        '--orbit-index': i
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 + i * 0.1 }}
                                >
                                    <Icon />
                                </motion.div>
                            ))}
                        </div>

                        {/* Pulsing rings */}
                        <motion.div
                            className="pulse-ring pulse-ring-1"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                        />
                        <motion.div
                            className="pulse-ring pulse-ring-2"
                            animate={{
                                scale: [1, 1.8, 1],
                                opacity: [0.3, 0, 0.3]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                        />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        className="transition-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {/* Title */}
                        <motion.h2
                            className="transition-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Art Gallery
                        </motion.h2>

                        {/* Progress Bar */}
                        <div className="transition-progress-container">
                            <motion.div
                                className="transition-progress-bar"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                            <div className="transition-progress-glow" style={{ left: `${Math.min(progress, 100)}%` }} />
                        </div>

                        {/* Loading Text */}
                        <motion.p
                            className="transition-text"
                            key={loadingText}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {loadingText}
                        </motion.p>

                        {/* Percent */}
                        <span className="transition-percent">{Math.round(Math.min(progress, 100))}%</span>
                    </motion.div>

                    {/* Floating paint splashes */}
                    <div className="paint-splashes">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="paint-splash"
                                style={{
                                    left: `${10 + Math.random() * 80}%`,
                                    top: `${10 + Math.random() * 80}%`,
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: [0, 1.5, 0],
                                    opacity: [0, 0.6, 0],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.25,
                                    ease: 'easeInOut'
                                }}
                            />
                        ))}
                    </div>

                    {/* Corner decorations with animation */}
                    <motion.div
                        className="corner-decoration top-left"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.4, scale: 1, rotate: 360 }}
                        transition={{ delay: 0.3, duration: 1.5, ease: 'easeOut' }}
                    >
                        <FaBrush />
                    </motion.div>
                    <motion.div
                        className="corner-decoration top-right"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.4, scale: 1, rotate: -360 }}
                        transition={{ delay: 0.4, duration: 1.5, ease: 'easeOut' }}
                    >
                        <FaPalette />
                    </motion.div>
                    <motion.div
                        className="corner-decoration bottom-left"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.4, scale: 1, rotate: -360 }}
                        transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                    >
                        <FaImage />
                    </motion.div>
                    <motion.div
                        className="corner-decoration bottom-right"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.4, scale: 1, rotate: 360 }}
                        transition={{ delay: 0.6, duration: 1.5, ease: 'easeOut' }}
                    >
                        <FaMagic />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageTransition;
