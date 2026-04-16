import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad } from 'react-icons/fa';
import './Loader.css';

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(onComplete, 500);
                    }, 300);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="loader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        filter: 'blur(10px)'
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="loader-content">
                        <motion.div
                            className="loader-icon"
                            animate={{
                                rotateY: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                rotateY: { duration: 2, repeat: Infinity, ease: 'linear' },
                                scale: { duration: 1, repeat: Infinity }
                            }}
                        >
                            <FaGamepad />
                        </motion.div>

                        <motion.h1
                            className="loader-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            PLAYER_ONE
                        </motion.h1>

                        <div className="loader-bar-container">
                            <motion.div
                                className="loader-bar"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                            <div className="loader-bar-glow" style={{ left: `${Math.min(progress, 100)}%` }} />
                        </div>

                        <motion.p
                            className="loader-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {progress < 30 && 'Initializing...'}
                            {progress >= 30 && progress < 60 && 'Loading assets...'}
                            {progress >= 60 && progress < 90 && 'Almost ready...'}
                            {progress >= 90 && 'Let\'s go!'}
                        </motion.p>

                        <span className="loader-percent">{Math.round(Math.min(progress, 100))}%</span>
                    </div>

                    <div className="loader-particles">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="loader-particle"
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: window.innerHeight + 50,
                                    opacity: 0
                                }}
                                animate={{
                                    y: -50,
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
