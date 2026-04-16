import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaGamepad, FaUser, FaRocket, FaTrophy,
    FaBriefcase, FaEnvelope, FaDice
} from 'react-icons/fa';

import './StoryProgress.css';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
    { id: 'home', icon: FaGamepad, label: 'Start', num: 1 },
    { id: 'about', icon: FaUser, label: 'Player', num: 2 },
    { id: 'projects', icon: FaRocket, label: 'Quests', num: 3 },
    { id: 'resume', icon: FaBriefcase, label: 'Journey', num: 4 },
    { id: 'games', icon: FaDice, label: 'Arcade', num: 5 },
    { id: 'contact', icon: FaEnvelope, label: 'Co-op', num: 6 },
];

const StoryProgress = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const progressLineRef = useRef(null);


    useEffect(() => {
        const triggers = [];

        chapters.forEach((chapter, index) => {
            const el = document.getElementById(chapter.id);
            if (!el) return;

            const trigger = ScrollTrigger.create({
                trigger: el,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => {
                    setActiveIndex(index);

                },
                onEnterBack: () => {
                    setActiveIndex(index);
                    setXp(Math.round((index / (chapters.length - 1)) * 9999));
                },
            });
            triggers.push(trigger);
        });

        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                if (progressLineRef.current) {
                    progressLineRef.current.style.height = `${self.progress * 100}%`;
                }
            },
        });

        return () => {
            triggers.forEach(t => t.kill());
        };
    }, []);

    const handleClick = (sectionId) => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="story-progress" aria-label="Story progress">
            {/* Progress line */}
            <div className="progress-track">
                <div className="progress-line-bg" />
                <div className="progress-line-fill" ref={progressLineRef} />
            </div>

            {/* Chapter dots */}
            <div className="progress-dots">
                {chapters.map((chapter, index) => {
                    const Icon = chapter.icon;
                    const isActive = index === activeIndex;
                    const isPassed = index < activeIndex;
                    return (
                        <button
                            key={chapter.id}
                            className={`progress-dot ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                            onClick={() => handleClick(chapter.id)}
                            title={`LVL ${chapter.num}: ${chapter.label}`}
                            aria-label={`Go to ${chapter.label}`}
                        >
                            <div className="dot-icon-wrap">
                                <Icon />
                            </div>
                            <span className="dot-label">{chapter.label}</span>
                            {isActive && <span className="dot-ping" />}
                        </button>
                    );
                })}
            </div>


        </nav>
    );
};

export default StoryProgress;
