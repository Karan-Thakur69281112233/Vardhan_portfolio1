import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaGamepad, FaShieldAlt, FaHeartbeat, FaCouch, FaBullseye, FaHeart, FaCogs, FaExclamationTriangle, FaLightbulb, FaChevronDown, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { SiUnrealengine, SiUnity, SiReact, SiNodedotjs, SiAndroid } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const [expandedProject, setExpandedProject] = useState(null);
    const [activeTab, setActiveTab] = useState('completed');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.project-card', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.projects-grid',
                    start: 'top 85%'
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const toggleDesignSection = (projectId) => {
        setExpandedProject((prev) => (prev === projectId ? null : projectId));
    };

    const projects = [
        {
            id: 1,
            title: 'Dungeon Tower',
            subtitle: '3D Action Game',
            description: 'A 3D action-crawler in Unreal Engine 5 featuring 100 procedural levels and custom AI behavior trees.',
            icon: FaGamepad,
            tags: [
                { name: 'Unreal Engine 5', icon: SiUnrealengine },
                { name: 'AI Systems', icon: FaGamepad },
            ],
            color: '#6366f1',
            github: '#',
            live: '#',
            featured: true,
            status: 'ongoing',
            // Mini Design Section
            design: {
                goal: 'Create a challenging roguelike dungeon crawler with satisfying combat and deep progression systems.',
                playerExperience: 'Feel powerful yet vulnerable - every encounter should feel tense and rewarding.',
                coreMechanics: [
                    { name: 'Movement', detail: 'Dash-based traversal with i-frames and momentum' },
                    { name: 'Combat', detail: 'Combo system with light/heavy attacks and parry mechanics' },
                    { name: 'Loop', detail: 'Die → Learn → Upgrade → Retry with meta progression' }
                ],
                challenges: 'AI pathfinding broke on procedural levels. Fixed by implementing NavMesh chunking and dynamic obstacle avoidance.',
                learned: 'Behavior Trees are powerful but need careful state management. Learned to balance difficulty curves through extensive playtesting.'
            }
        },
        {
            id: 2,
            title: 'The First Dream',
            subtitle: '2D Story-driven Metroidvania',
            description: 'A Unity-developed Metroidvania following a 14-year-old boy navigating surreal, markerless dreamscapes to save his friend from the Creatures of Sleep.',
            icon: FaGamepad,
            tags: [
                { name: 'Unity', icon: SiUnity },
                { name: 'C#', icon: TbBrandCSharp },
            ],
            color: '#8b5cf6',
            github: '#',
            live: '#',
            featured: true,
            status: 'ongoing',
            design: {
                goal: 'Create a story-driven Metroidvania that eschews traditional quest markers in favor of poetic clues and memory-based navigation.',
                playerExperience: 'Experience deep immersion and tension through a surreal "Woodblock-Dream Ink" world, culminating in a high-stakes final boss with a 5-attempt permadeath limit.',
                coreMechanics: [
                    { name: 'Navigation', detail: 'Rely purely on memory of cryptic, poetic clues instead of objective markers or quest arrows' },
                    { name: 'Art Style', detail: '"Woodblock-Dream Ink" aesthetic blending disciplined linework with bleeding watercolors' },
                    { name: 'High-Stakes Boss', detail: 'Only five attempts to defeat the Nightmare Entity before eternal darkness triggers a complete game restart' }
                ],
                challenges: 'Designing intuitive but challenging navigation without objective markers across five distinct surreal landmasses like Ashveil and Shattergrave.',
                learned: 'High-stakes constraints (like the 5-attempt boss limit) significantly elevate narrative tension and make the player\'s journey feel deeply impactful.'
            }
        },
        {
            id: 3,
            title: '🌍 The Dying Land',
            subtitle: 'Story-driven Exploration Game',
            description: 'A narrative exploration experience set in a quiet, fading world where the player uncovers story through five unique houses and villager clues.',
            icon: FaGamepad,
            tags: [
                { name: 'Unity', icon: SiUnity },
                { name: 'C#', icon: TbBrandCSharp },
            ],
            color: '#10b981',
            github: 'https://github.com/VardhanChauhan/TheDyingLand',
            live: '#',
            featured: false,
            status: 'completed',
            design: {
                goal: 'Create a simple yet immersive exploration game where the player moves through a mysterious land and uncovers its story one house at a time.',
                playerExperience: 'Feel curious and purposeful as each house reveals new atmosphere, NPC hints, and narrative depth.',
                coreMechanics: [
                    { name: 'Exploration', detail: 'Move forward along a linear path through five unique houses' },
                    { name: 'NPC Guidance', detail: 'Villagers offer hints and clues to guide the player onward' },
                    { name: 'Story Progression', detail: 'Uncover the world through environment, dialogue, and subtle narrative beats' }
                ],
                challenges: 'Balancing a quiet, mysterious tone with clear progression through each house and NPC encounter.',
                learned: 'A simple progression loop can still feel meaningful when supported by atmosphere, dialogue, and environmental storytelling.'
            }
        },
        {
            id: 4,
            title: 'InterioAR',
            subtitle: 'AR Furniture Placement App',
            description: 'An Android AR application using Unity and ARCore to place and manipulate 3D furniture models in real-time.',
            icon: FaCouch,
            tags: [
                { name: 'Unity', icon: SiUnity },
                { name: 'ARCore', icon: SiAndroid },
            ],
            color: '#f59e0b',
            github: 'https://github.com/VardhanChauhan/InterioAR',
            live: '#',
            featured: false,
            status: 'completed',
            design: {
                goal: 'Let users visualize furniture in their space before buying - reduce purchase anxiety.',
                playerExperience: 'Feel confident about purchases - see exactly how items fit and look.',
                coreMechanics: [
                    { name: 'Placement', detail: 'Tap to place with automatic floor detection' },
                    { name: 'Manipulation', detail: 'Pinch to scale, drag to move, two-finger rotate' },
                    { name: 'Catalog', detail: 'Searchable 3D model library with real dimensions' }
                ],
                challenges: 'Lighting mismatch made objects look fake. Added environment probe sampling for realistic shading.',
                learned: 'AR success depends on managing user expectations. Clear onboarding dramatically improved user satisfaction.'
            }
        },
        {
            id: 5,
            title: 'Wanderer\'s Path',
            subtitle: '2D Top-Down Roamer',
            description: 'A deeply relaxing, combat-free 2D top-down game driven purely by the joy of undirected exploration and atmospheric roaming.',
            icon: FaGamepad,
            tags: [
                { name: 'Unity', icon: SiUnity },
                { name: 'C#', icon: TbBrandCSharp },
            ],
            color: '#14b8a6',
            github: 'https://github.com/VardhanChauhan/FreeRoam',
            live: '#',
            featured: false,
            status: 'completed',
            design: {
                goal: 'Create an entirely low-stakes experience where players can aimlessly wander and just enjoy the audiovisual environment.',
                playerExperience: 'Feel peaceful and unrestricted, letting curiosity guide them without the pressure of objectives or combat.',
                coreMechanics: [
                    { name: 'Movement', detail: 'Smooth top-down 8-directional walking mechanics with responsive animations' },
                    { name: 'Atmosphere', detail: 'Dynamic lighting, particle effects, and soothing ambient layers' },
                    { name: 'Pure Exploration', detail: 'Zero artificial boundaries within exploring zones, no win/lose states' }
                ],
                challenges: 'Eliminating traditional gameplay loops while keeping the world interesting enough to hold attention.',
                learned: 'Rich environmental storytelling and strong aesthetic design are crucial when you deliberately remove combat or clear objectives.'
            }
        }
    ];

    const ongoingProjects = projects.filter(p => p.status === 'ongoing');
    const completedProjects = projects.filter(p => p.status === 'completed');

    const renderProjectCard = (project, index) => (
        <motion.div
            key={project.id}
            className={`project-card ${project.featured ? 'featured' : ''} ${expandedProject === project.id ? 'expanded' : ''}`}
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className="project-image" style={{ background: `linear-gradient(135deg, ${project.color}40, ${project.color}80)` }}>
                <project.icon className="project-main-icon" />
                <span className="project-number">0{index + 1}</span>
                <div className="project-overlay">
                    <div className="project-links">
                        <a href={project.github} className="project-link" title="GitHub">
                            <FaGithub />
                        </a>
                        <a href={project.live} className="project-link" title="Live Demo">
                            <FaExternalLinkAlt />
                        </a>
                    </div>
                </div>
            </div>

            <div className="project-content">
                <span className="project-subtitle">{project.subtitle}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="project-tag">
                            <tag.icon className="tag-icon" />
                            {tag.name}
                        </span>
                    ))}
                </div>

                {/* Design Section Toggle */}
                <button
                    className={`design-toggle ${expandedProject === project.id ? 'active' : ''}`}
                    onClick={() => toggleDesignSection(project.id)}
                >
                    <FaLightbulb />
                    <span>View Design Doc</span>
                    <FaChevronDown className="toggle-arrow" />
                </button>

                {/* Expandable Design Section */}
                <AnimatePresence>
                    {expandedProject === project.id && (
                        <motion.div
                            className="design-section"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <div className="design-content">
                                {/* GOAL */}
                                <div className="design-item">
                                    <div className="design-header">
                                        <FaBullseye className="design-icon" />
                                        <h4>GOAL</h4>
                                    </div>
                                    <p>{project.design.goal}</p>
                                </div>

                                {/* PLAYER EXPERIENCE */}
                                <div className="design-item">
                                    <div className="design-header">
                                        <FaHeart className="design-icon" />
                                        <h4>PLAYER EXPERIENCE</h4>
                                    </div>
                                    <p>{project.design.playerExperience}</p>
                                </div>

                                {/* CORE MECHANICS */}
                                <div className="design-item">
                                    <div className="design-header">
                                        <FaCogs className="design-icon" />
                                        <h4>CORE MECHANICS</h4>
                                    </div>
                                    <ul className="mechanics-list">
                                        {project.design.coreMechanics.map((mechanic, i) => (
                                            <li key={i}>
                                                <strong>{mechanic.name}:</strong> {mechanic.detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CHALLENGES */}
                                <div className="design-item">
                                    <div className="design-header">
                                        <FaExclamationTriangle className="design-icon challenge" />
                                        <h4>CHALLENGES</h4>
                                    </div>
                                    <p>{project.design.challenges}</p>
                                </div>

                                {/* WHAT I LEARNED */}
                                <div className="design-item">
                                    <div className="design-header">
                                        <FaLightbulb className="design-icon learned" />
                                        <h4>WHAT I LEARNED</h4>
                                    </div>
                                    <p>{project.design.learned}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );

    const displayedProjects = activeTab === 'completed' ? completedProjects : ongoingProjects;

    return (
        <section id="projects" className="section projects" ref={sectionRef}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-subtitle">Check out my latest achievements and quests completed</p>
                </motion.div>

                {/* Tab Toggle */}
                <div className="projects-tabs">
                    <button
                        className={`projects-tab ${activeTab === 'completed' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('completed'); setExpandedProject(null); }}
                    >
                        <FaCheckCircle />
                        <span>Completed</span>
                        <span className="tab-count">{completedProjects.length}</span>
                    </button>
                    <button
                        className={`projects-tab ${activeTab === 'ongoing' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('ongoing'); setExpandedProject(null); }}
                    >
                        <FaSpinner className={activeTab === 'ongoing' ? 'spinning' : ''} />
                        <span>Ongoing</span>
                        <span className="tab-count">{ongoingProjects.length}</span>
                    </button>
                </div>

                <motion.div
                    className="projects-cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <a href="https://github.com/dashboard" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <FaGithub /> View All Projects on GitHub
                    </a>
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        className="projects-grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                        {displayedProjects.map((project, index) => renderProjectCard(project, index))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Projects;
