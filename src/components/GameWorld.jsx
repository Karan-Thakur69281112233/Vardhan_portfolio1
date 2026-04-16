import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCloud } from 'react-icons/fa';
import ProceduralTerrain from './ProceduralTerrain';
import './GameWorld.css';

gsap.registerPlugin(ScrollTrigger);



const GameWorld = ({ children }) => {
    const worldRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax sky layers
            gsap.to('.gw-sky-layer-1', {
                yPercent: -30,
                ease: 'none',
                scrollTrigger: { trigger: worldRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
            });
            gsap.to('.gw-sky-layer-2', {
                yPercent: -50,
                ease: 'none',
                scrollTrigger: { trigger: worldRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
            });

            // Mountains parallax
            gsap.to('.gw-mountains', {
                yPercent: -15,
                ease: 'none',
                scrollTrigger: { trigger: worldRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
            });

            // Clouds float horizontally
            gsap.to('.gw-clouds', {
                xPercent: -20,
                ease: 'none',
                scrollTrigger: { trigger: worldRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
            });

        }, worldRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="game-world" ref={worldRef}>
            {/* ═══ PROCEDURAL TERRAIN BACKGROUND ═══ */}
            <ProceduralTerrain />

            {/* ═══ PARALLAX SKY ═══ */}
            <div className="gw-sky">
                <div className="gw-sky-layer-1" />
                <div className="gw-sky-layer-2" />
            </div>

            {/* ═══ CLOUDS ═══ */}
            <div className="gw-clouds">
                {[...Array(10)].map((_, i) => (
                    <FaCloud
                        key={i}
                        className="gw-cloud"
                        style={{
                            top: `${5 + Math.sin(i * 1.7) * 20}%`,
                            left: `${i * 10 + Math.sin(i) * 5}%`,
                            fontSize: `${1.5 + Math.sin(i * 0.8) * 1}rem`,
                            opacity: 0.04 + (i % 3) * 0.015,
                            animationDuration: `${60 + i * 15}s`,
                            animationDelay: `${i * 3}s`,
                        }}
                    />
                ))}
            </div>

            {/* ═══ MOUNTAINS ═══ */}
            <div className="gw-mountains">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="gw-mountain"
                        style={{
                            left: `${i * 13}%`,
                            height: `${80 + Math.sin(i * 1.2) * 40}px`,
                            width: `${150 + Math.sin(i * 0.7) * 80}px`,
                            opacity: 0.04 + (i % 3) * 0.015,
                        }}
                    />
                ))}
            </div>



            {/* ═══ CONTENT ═══ */}
            <div className="gw-content">
                {children}
            </div>
        </div>
    );
};

export default GameWorld;
