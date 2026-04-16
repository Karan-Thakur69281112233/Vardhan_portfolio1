import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaGamepad, FaPlaystation, FaXbox, FaSteam, FaTwitch,
    FaDiscord, FaHeadset, FaKeyboard, FaMouse, FaDesktop,
    FaCode, FaRocket, FaTrophy, FaStar, FaBolt
} from 'react-icons/fa';
import { SiNintendoswitch, SiUnrealengine, SiUnity } from 'react-icons/si';
import './FloatingIcons.css';

const allIcons = [
    FaGamepad, FaPlaystation, FaXbox, FaSteam, FaTwitch,
    FaDiscord, FaHeadset, FaKeyboard, FaMouse, FaDesktop,
    FaCode, FaRocket, FaTrophy, FaStar, FaBolt,
    SiNintendoswitch, SiUnrealengine, SiUnity
];

// Seeded random for consistent placement
const seededRandom = (seed) => {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 2147483647;
        return s / 2147483647;
    };
};

const generateIcons = (count = 95) => {
    const rng = seededRandom(42);
    const icons = [];
    for (let i = 0; i < count; i++) {
        const Icon = allIcons[i % allIcons.length];
        const size = 20 + Math.floor(rng() * 30); // 20-50px
        // Spread across full page height (0-100% of scrollable area)
        const topPercent = (i / count) * 100 + rng() * (100 / count) * 0.6;
        // Alternate between left and right sides, with some in the middle
        const leftPercent = rng() * 100;
        const delay = rng() * 3;
        const duration = 5 + rng() * 6; // 5-11s

        icons.push({
            Icon,
            size,
            top: `${topPercent.toFixed(1)}%`,
            left: `${leftPercent.toFixed(1)}%`,
            delay,
            duration,
        });
    }
    return icons;
};

const FloatingIcons = () => {
    const [icons] = useState(() => generateIcons(45));

    // Generate random movement values for each icon
    const getRandomMovement = () => {
        const randomX = Math.random() * 60 - 30; // -30 to 30
        const randomY = Math.random() * 60 - 30; // -30 to 30
        return { x: randomX, y: randomY };
    };

    return (
        <div className="floating-icons-container">
            {icons.map((item, index) => {
                const style = {
                    top: item.top,
                    left: item.left,
                    fontSize: `${item.size}px`,
                };

                // Generate unique random movements for each icon
                const move1 = getRandomMovement();
                const move2 = getRandomMovement();
                const move3 = getRandomMovement();

                return (
                    <motion.div
                        key={index}
                        className="floating-gaming-icon"
                        style={style}
                        drag
                        dragMomentum={false}
                        dragElastic={0.1}
                        whileDrag={{ scale: 1.3, cursor: 'grabbing' }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0.08, 0.18, 0.08],
                            scale: [1, 1.15, 1],
                            x: [0, move1.x, move2.x, move3.x, 0],
                            y: [0, move1.y, move2.y, move3.y, 0],
                            rotate: [0, 8, -8, 4, 0]
                        }}
                        transition={{
                            duration: item.duration + Math.random() * 3,
                            delay: item.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatType: "reverse"
                        }}

                    >
                        <item.Icon />
                    </motion.div>
                );
            })}
        </div>
    );
};

export default FloatingIcons;
