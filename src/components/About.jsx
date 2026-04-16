import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGamepad, FaCode, FaCubes, FaPalette, FaMobileAlt, FaUsers } from 'react-icons/fa';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-image-container', {
                x: -100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                }
            });

            gsap.from('.about-text', {
                x: 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                }
            });

            gsap.from('.skill-card', {
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: 'top 85%'
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const skills = [
        { icon: FaGamepad, name: 'Unreal Engine 5', experience: '2+ Years', tag: 'Foundational', color: '#6366f1' },
        { icon: FaCubes, name: 'Level Design', experience: '1+ Years', tag: 'Foundational', color: '#ec4899' },
        { icon: FaCode, name: 'Systems Design', experience: '1+ Year', tag: 'Learning', color: '#06b6d4' },
        { icon: FaGamepad, name: 'Unity', experience: '1+ Year', tag: 'Learning', color: '#10b981' },
        { icon: FaPalette, name: '2D Concept Art', experience: '1+ Years', tag: 'Foundational', color: '#f59e0b' },
        { icon: FaMobileAlt, name: 'UI/UX Design', experience: '1+ Year', tag: 'Learning', color: '#8b5cf6' },
    ];

    return (
        <section id="about" className="section about" ref={sectionRef}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">About Me</h2>
                    <p className="section-subtitle">Get to know the player behind the code</p>
                </motion.div>

                <div className="about-content">
                    <div className="about-image-container">
                        <div className="about-image-wrapper">
                            <div className="about-image">
                                <img
                                    src="Animatedone.png"
                                    alt="Vardhan"
                                    className="about-photo"
                                />
                                <FaGamepad className="placeholder-icon" />
                            </div>
                            <div className="image-decoration"></div>
                            <div className="image-glow"></div>
                        </div>

                        <div className="experience-badge">
                            <span className="exp-number">B.Tech</span>
                            <span className="exp-text">Chitkara<br />University</span>
                        </div>
                    </div>

                    <div className="about-text">
                        <h3 className="about-heading">
                            Creative Game Designer & <span className="gradient-text-animated">Technical Leader</span>
                        </h3>

                        <p className="about-description">
                            Hello! I'm Vardhan, a Creative Game Design student at Chitkara University with a strong
                            foundation in Unreal Engine 5, level design, and 3D modeling. I specialize in building
                            interactive experiences from concept to prototype.
                        </p>

                        <p className="about-description">
                            My background spans 2D digital art, UI/UX design, and technical leadership. As a proven
                            leader in technical communities, I'm passionate about collaborative, player-centric
                            development.
                        </p>

                        <div className="about-highlights">
                            <div className="highlight-item">
                                <span className="highlight-number">4+</span>
                                <span className="highlight-label">Major Projects</span>
                            </div>
                            <div className="highlight-item">
                                <span className="highlight-number">3</span>
                                <span className="highlight-label">Languages</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="skills-section">
                    <h3 className="skills-title">My Skill Arsenal</h3>
                    <div className="skills-grid">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                className="skill-card"
                                whileTap={{ scale: 0.95, rotate: -2 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            >
                                <div className="skill-icon" style={{ background: `${skill.color}15`, color: skill.color }}>
                                    <skill.icon />
                                </div>
                                <h4 className="skill-name">{skill.name}</h4>
                                <div className="skill-tags">
                                    <span className="skill-tag" style={{ background: `${skill.color}20`, color: skill.color }}>
                                        {skill.tag}
                                    </span>
                                    <span className="skill-experience">{skill.experience}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;