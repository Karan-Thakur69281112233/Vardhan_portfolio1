import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FaGamepad, FaRocket, FaCode, FaTrophy } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Floating animation for icons
            gsap.to('.floating-icon', {
                y: -20,
                duration: 2,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: -1,
                stagger: 0.2
            });

            // Title animation
            gsap.from('.hero-title span', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power4.out',
                delay: 0.5
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const floatingIcons = [
        { Icon: FaGamepad, delay: 0, top: '20%', left: '10%' },
        { Icon: FaRocket, delay: 0.2, top: '60%', left: '5%' },
        { Icon: FaCode, delay: 0.4, top: '30%', right: '8%' },
        { Icon: FaTrophy, delay: 0.6, top: '70%', right: '12%' },
    ];

    return (
        <section id="home" className="hero" ref={heroRef}>
            <div className="hero-bg">
                <div className="hero-grid"></div>
                <div className="hero-gradient"></div>
            </div>

            {floatingIcons.map(({ Icon, delay, ...position }, index) => (
                <motion.div
                    key={index}
                    className="floating-icon"
                    style={position}
                    drag
                    dragMomentum={false}
                    dragElastic={0.1}
                    whileDrag={{ scale: 1.3, cursor: 'grabbing' }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + delay, duration: 0.5, type: 'spring' }}
                    whileHover={{ scale: 1.2, opacity: 0.8 }}
                >
                    <Icon />
                </motion.div>
            ))}

            <div className="hero-content">
                <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <span className="badge-dot"></span>
                    Open to Game Dev Opportunities
                </motion.div>

                <h1 className="hero-title" ref={titleRef}>
                    <span>Hi, I'm </span>
                    <span className="gradient-text-animated">Vardhan Singh Chauhan</span>
                </h1>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <span className="typewriter">Game Designer & Creative Developer</span>
                </motion.p>

                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    Crafting immersive gaming experiences with Unreal Engine 5 & Unity.
                    Turning concepts into playable realities.
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <a href="#projects" className="btn btn-primary">
                        <FaGamepad /> View My Work
                    </a>
                    <a href="#contact" className="btn btn-secondary">
                        Let's Connect
                    </a>
                </motion.div>

                <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                >
                    <div className="stat-item">
                        <span className="stat-number">4+</span>
                        <span className="stat-label">Projects</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">2+</span>
                        <span className="stat-label">Years Exp</span>
                    </div>
                </motion.div>
            </div>

            <motion.a
                href="#about"
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.6 }}
            >
                <span>Scroll Down</span>
                <HiArrowDown className="scroll-icon" />
            </motion.a>
        </section>
    );
};

export default Hero;
