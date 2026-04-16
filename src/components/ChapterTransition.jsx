import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ChapterTransition.css';

gsap.registerPlugin(ScrollTrigger);

const ChapterTransition = ({ number, title, tagline, icon: Icon, color = '#4f46e5' }) => {
    const ref = useRef(null);
    const [activated, setActivated] = useState(false);

    useEffect(() => {
        const el = ref.current;
        const ctx = gsap.context(() => {
            // Main container entrance
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: 'top 82%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => setActivated(true),
                    onLeaveBack: () => setActivated(false),
                },
            });

            // Horizontal line sweeps in
            tl.fromTo(el.querySelector('.ct-line-left'),
                { scaleX: 0 },
                { scaleX: 1, duration: 0.5, ease: 'power3.out' }, 0
            );
            tl.fromTo(el.querySelector('.ct-line-right'),
                { scaleX: 0 },
                { scaleX: 1, duration: 0.5, ease: 'power3.out' }, 0
            );

            // Icon pops in with overshoot
            tl.fromTo(el.querySelector('.ct-icon-ring'),
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }, 0.15
            );

            // Badge slides down
            tl.fromTo(el.querySelector('.ct-badge'),
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.35
            );

            // Title reveals with clip-path
            tl.fromTo(el.querySelector('.ct-title'),
                { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.5, ease: 'power3.inOut' }, 0.4
            );

            // Tagline fades up
            tl.fromTo(el.querySelector('.ct-tagline'),
                { y: 12, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.55
            );

            // Particles burst
            const particles = el.querySelectorAll('.ct-particle');
            tl.fromTo(particles,
                { scale: 0, opacity: 0 },
                {
                    scale: 1, opacity: 0.6, duration: 0.4, ease: 'back.out(2)',
                    stagger: { each: 0.05, from: 'center' },
                }, 0.3
            );

        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <div
            className={`ct-checkpoint ${activated ? 'ct-active' : ''}`}
            ref={ref}
            style={{ '--ct-color': color }}
        >
            {/* Horizontal lines */}
            <div className="ct-line-left" />
            <div className="ct-line-right" />

            {/* Center icon */}
            <div className="ct-icon-ring">
                <Icon className="ct-icon" />
                <div className="ct-icon-glow" />
            </div>

            {/* Text content */}
            <div className="ct-content">
                <div className="ct-badge">
                    <span className="ct-badge-num">{String(number).padStart(2, '0')}</span>
                    <span className="ct-badge-label">Checkpoint</span>
                </div>
                <h3 className="ct-title">{title}</h3>
                <p className="ct-tagline">{tagline}</p>
            </div>

            {/* Burst particles */}
            {[...Array(8)].map((_, i) => (
                <span
                    key={i}
                    className="ct-particle"
                    style={{
                        '--angle': `${i * 45}deg`,
                        '--dist': `${50 + Math.random() * 30}px`,
                        '--size': `${3 + Math.random() * 4}px`,
                    }}
                />
            ))}
        </div>
    );
};

export default ChapterTransition;
