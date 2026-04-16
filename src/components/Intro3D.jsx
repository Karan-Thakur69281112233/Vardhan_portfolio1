import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaCode, FaPalette, FaRocket, FaStar, FaBolt } from 'react-icons/fa';
import './Intro3D.css';

const Intro3D = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState(1); // 1: loading, 2: reveal, 3: exit
    const [loadingText, setLoadingText] = useState('Initializing...');

    useEffect(() => {
        const loadingTexts = [
            'Initializing systems...',
            'Loading creative assets...',
            'Preparing experience...',
            'Almost ready...',
            'Welcome!'
        ];

        const timer = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + Math.random() * 12 + 5;

                // Update loading text
                const textIndex = Math.min(Math.floor(newProgress / 25), loadingTexts.length - 1);
                setLoadingText(loadingTexts[textIndex]);

                if (newProgress >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setPhase(2), 300); // Start reveal
                    setTimeout(() => setPhase(3), 1500); // Start exit
                    setTimeout(onComplete, 2200); // Complete
                    return 100;
                }
                return newProgress;
            });
        }, 120);

        return () => clearInterval(timer);
    }, [onComplete]);

    const cubeIcons = [FaGamepad, FaCode, FaPalette, FaRocket, FaStar, FaBolt];

    return (
        <AnimatePresence>
            {phase !== 3 && (
                <motion.div
                    className="intro-3d"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.2,
                        filter: 'blur(20px)'
                    }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                    {/* Animated Background */}
                    <div className="intro-bg">
                        <div className="intro-grid"></div>
                        <div className="intro-gradient-1"></div>
                        <div className="intro-gradient-2"></div>
                        <div className="intro-gradient-3"></div>
                    </div>

                    {/* Floating Orbs */}
                    <div className="intro-orbs">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="intro-orb"
                                style={{
                                    left: `${15 + i * 15}%`,
                                    top: `${20 + (i % 3) * 25}%`,
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{
                                    duration: 3 + i * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                    ease: 'easeInOut'
                                }}
                            />
                        ))}
                    </div>

                    {/* 3D Cube Container */}
                    <motion.div
                        className="intro-cube-scene"
                        initial={{ scale: 0, rotateX: -90 }}
                        animate={{
                            scale: phase === 2 ? 1.3 : 1,
                            rotateX: 0,
                            y: phase === 2 ? -50 : 0
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                    >
                        <div className="intro-cube">
                            {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face, i) => {
                                const Icon = cubeIcons[i];
                                return (
                                    <div key={face} className={`intro-cube-face intro-cube-${face}`}>
                                        <Icon />
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        className="intro-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: phase === 2 ? 1.1 : 1
                        }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        {/* Title */}
                        <motion.div className="intro-title-container">
                            <motion.h1
                                className="intro-title"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                            >
                                VARDHAN SINGH CHAUHAN
                            </motion.h1>
                            <motion.p
                                className="intro-subtitle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                Game Developer & Creative Artist
                            </motion.p>
                        </motion.div>

                        {/* Progress Bar */}
                        <div className="intro-progress-container">
                            <motion.div
                                className="intro-progress-bar"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                            <motion.div
                                className="intro-progress-glow"
                                style={{ left: `${Math.min(progress, 100)}%` }}
                            />
                        </div>

                        {/* Loading Text */}
                        <motion.p
                            className="intro-loading-text"
                            key={loadingText}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {loadingText}
                        </motion.p>

                        {/* Percentage */}
                        <motion.span
                            className="intro-percent"
                            animate={{
                                scale: progress >= 100 ? [1, 1.2, 1] : 1
                            }}
                        >
                            {Math.round(Math.min(progress, 100))}%
                        </motion.span>
                    </motion.div>

                    {/* Floating Particles */}
                    <div className="intro-particles">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="intro-particle"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                }}
                                initial={{ y: '100vh', opacity: 0 }}
                                animate={{
                                    y: '-10vh',
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 3,
                                    repeat: Infinity,
                                    delay: Math.random() * 3,
                                    ease: 'linear'
                                }}
                            />
                        ))}
                    </div>

                    {/* Corner Elements */}
                    <motion.div
                        className="intro-corner intro-corner-tl"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.5, scale: 1, rotate: 360 }}
                        transition={{ delay: 0.3, duration: 1.5 }}
                    >
                        <FaStar />
                    </motion.div>
                    <motion.div
                        className="intro-corner intro-corner-tr"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.5, scale: 1, rotate: -360 }}
                        transition={{ delay: 0.4, duration: 1.5 }}
                    >
                        <FaRocket />
                    </motion.div>
                    <motion.div
                        className="intro-corner intro-corner-bl"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.5, scale: 1, rotate: -360 }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                    >
                        <FaCode />
                    </motion.div>
                    <motion.div
                        className="intro-corner intro-corner-br"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.5, scale: 1, rotate: 360 }}
                        transition={{ delay: 0.6, duration: 1.5 }}
                    >
                        <FaGamepad />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Intro3D;
