import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaArtstation } from 'react-icons/fa';
import './ArtButton.css';

const ArtButton = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["25deg", "-25deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);

    // Calculate glare translation based on tilt
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["60%", "-60%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["60%", "-60%"]);
    const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.8, 0, 0.8]);

    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Storytelling element: show a hint after 2 seconds
        const timer = setTimeout(() => {
            setShowTooltip(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

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
        <>
            <motion.a
                href="https://www.artstation.com/vardhxn"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-art-button"
                drag
                dragMomentum={false}
                dragElastic={0.1}
                whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    delay: 1.5,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    rotateX,
                    rotateY,
                    transformPerspective: 800,
                    transformStyle: "preserve-3d",
                    textDecoration: 'none'
                }}
            >
                {/* Glare container layered flat on surface */}
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', pointerEvents: 'none', transform: 'translateZ(0)' }}>
                    <motion.div
                        className="art-button-4d-glare"
                        style={{
                            position: "absolute",
                            top: "-50%",
                            left: "-50%",
                            width: "200%",
                            height: "200%",
                            background: "radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 40%)",
                            x: glareX,
                            y: glareY,
                            opacity: glareOpacity
                        }}
                    />
                </div>

                <span className="art-button-pulse"></span>

                {/* Inner Content separated in Z space to create 4D parallax depth */}
                <div className="art-button-content" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                    <FaArtstation className="art-button-icon" style={{ transform: "translateZ(10px)" }} />
                    <span className="art-button-text" style={{ transform: "translateZ(20px)" }}>ArtStation</span>
                </div>
            </motion.a>

            {/* Storytelling Tooltip Hologram */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        className="art-button-story-tooltip"
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    >
                        <button className="tooltip-close" onClick={() => setShowTooltip(false)}>×</button>
                        <div className="tooltip-header">Side Quest Discovered</div>
                        <div className="tooltip-body">
                            Check out the <strong>Art Gallery!</strong> I also create 3D renders and visual arts.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ArtButton;

