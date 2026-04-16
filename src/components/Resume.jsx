import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaDownload, FaBriefcase, FaGraduationCap, FaTrophy, FaRocket } from 'react-icons/fa';
import { HiLocationMarker, HiCalendar, HiSparkles } from 'react-icons/hi';
import './Resume.css';

gsap.registerPlugin(ScrollTrigger);

const Resume = () => {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate timeline line with gradient effect
            gsap.from('.timeline-line', {
                scaleY: 0,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline',
                    start: 'top 80%'
                }
            });

            // Staggered timeline items animation
            gsap.from('.timeline-item', {
                opacity: 0,
                y: 60,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.timeline',
                    start: 'top 80%'
                }
            });

            // Animate stats cards
            gsap.from('.stats-card', {
                opacity: 0,
                y: 40,
                scale: 0.9,
                duration: 0.6,
                stagger: 0.15,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.resume-stats',
                    start: 'top 85%'
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const experiences = [
        {
            type: 'work',
            title: 'Club Leader',
            organization: 'AlgoZenith Coding Club',
            location: 'Chitkara University',
            period: '2024 - 2025',
            description: 'Curated curriculum for weekly algorithm challenges.',
            highlights: ['Weekly Challenges', 'Competitive Programming'],
            icon: <FaRocket />
        },
        {
            type: 'work',
            title: 'Secretary',
            organization: 'ACM Student Chapter',
            location: 'Chitkara University',
            period: '2023 - 2024',
            description: 'Coordinated 5+ technical workshops and a major 24-hour hackathon.',
            highlights: ['5+ Workshops', '24-hr Hackathon', '20% Membership Growth'],
            icon: <FaTrophy />
        },
        {
            type: 'education',
            title: 'Bachelor of Technology (B.Tech)',
            organization: 'Chitkara University',
            location: 'Punjab, India',
            period: '2023 - 2027',
            description: 'Game Design specialization with focus on Unreal Engine 5 and interactive experiences.',
            highlights: ['Game Design', 'Technical Leadership', 'UI/UX Design'],
            icon: <FaGraduationCap />
        },
        {
            type: 'education',
            title: '12th Non-Medical',
            organization: 'SGGS Collegiate School',
            location: 'Punjab, India',
            period: '2022 - 2023',
            description: 'Completed higher secondary education with focus on science and mathematics.',
            highlights: ['Science Stream', 'Mathematics', 'Computer Science'],
            icon: <FaGraduationCap />
        }
    ];

    const stats = [
        { number: '5+', label: 'Workshops Led', icon: <FaTrophy /> },
        { number: '2+', label: 'Leadership Roles', icon: <FaRocket /> },
        { number: '24hr', label: 'Hackathon Organized', icon: <FaBriefcase /> }
    ];

    return (
        <section id="resume" className="section resume" ref={sectionRef}>
            {/* Decorative background elements */}
            <div className="resume-bg-decor">
                <div className="resume-orb resume-orb-1"></div>
                <div className="resume-orb resume-orb-2"></div>
            </div>

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="resume-header"
                >
                    <span className="section-badge">
                        <FaBriefcase /> My Journey
                    </span>
                    <h2 className="section-title">Resume & Experience</h2>
                    <p className="section-subtitle">A chronicle of my professional adventures and achievements</p>
                </motion.div>

                {/* Animated Quote */}
                <motion.div
                    className="resume-quote"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <div className="quote-icon">"</div>
                    <p className="quote-text">
                        Passionate about creating <span className="highlight">immersive experiences</span> and
                        leading teams to build <span className="highlight">innovative solutions</span>.
                    </p>
                    <div className="quote-line"></div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    className="resume-stats"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stats-card"
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <div className="stats-icon">{stat.icon}</div>
                            <div className="stats-number">{stat.number}</div>
                            <div className="stats-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="resume-download"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <a href="Resume_Vardhan.pdf" className="btn btn-primary download-btn">
                        <FaDownload /> Download Full Resume
                        <span className="btn-glow"></span>
                    </a>
                </motion.div>

                <div className="resume-content">
                    {/* Timeline */}
                    <div className="timeline" ref={timelineRef}>
                        <div className="timeline-line">
                            <div className="timeline-line-glow"></div>
                        </div>

                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                className={`timeline-item ${exp.type}`}
                                whileHover={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <div className="timeline-dot">
                                    <span className="dot-pulse"></span>
                                    {exp.type === 'work' ? <FaBriefcase /> : <FaGraduationCap />}
                                </div>

                                <div className="timeline-content">
                                    <div className="timeline-header">
                                        <span className={`timeline-badge ${exp.type}`}>
                                            {exp.type === 'work' ? 'Experience' : 'Education'}
                                        </span>
                                        <span className="timeline-period">
                                            <HiCalendar /> {exp.period}
                                        </span>
                                    </div>

                                    <h3 className="timeline-title">{exp.title}</h3>
                                    <h4 className="timeline-org">
                                        <span className="org-icon">{exp.icon}</span>
                                        {exp.organization}
                                    </h4>
                                    <span className="timeline-location">
                                        <HiLocationMarker /> {exp.location}
                                    </span>
                                    <p className="timeline-description">{exp.description}</p>

                                    <ul className="timeline-highlights">
                                        {exp.highlights.map((highlight, i) => (
                                            <motion.li
                                                key={i}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                transition={{ type: 'spring', stiffness: 400 }}
                                            >
                                                <span className="highlight-dot"></span>
                                                {highlight}
                                            </motion.li>
                                        ))}
                                    </ul>

                                    <div className="timeline-card-glow"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;
