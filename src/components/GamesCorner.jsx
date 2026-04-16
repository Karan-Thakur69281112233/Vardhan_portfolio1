import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaDice, FaGamepad, FaBrain, FaBolt,
    FaRedo, FaTrophy, FaPlay, FaStar,
    FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight
} from 'react-icons/fa';
import './GamesCorner.css';

// ═══════════════════════════════════════
// SNAKE GAME
// ═══════════════════════════════════════
const GRID = 20;
const CELL = 18;

const SnakeGame = () => {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState('idle'); // idle, playing, over
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() =>
        parseInt(localStorage.getItem('snake_high') || '0')
    );
    const dirRef = useRef({ x: 1, y: 0 });
    const snakeRef = useRef([{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }]);
    const foodRef = useRef({ x: 15, y: 10 });
    const loopRef = useRef(null);

    const spawnFood = () => {
        let pos;
        do {
            pos = {
                x: Math.floor(Math.random() * GRID),
                y: Math.floor(Math.random() * GRID),
            };
        } while (snakeRef.current.some(s => s.x === pos.x && s.y === pos.y));
        foodRef.current = pos;
    };

    const draw = useCallback(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        const W = GRID * CELL;

        // Background
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, W, W);

        // Grid
        ctx.strokeStyle = 'rgba(79, 70, 229, 0.06)';
        for (let i = 0; i <= GRID; i++) {
            ctx.beginPath();
            ctx.moveTo(i * CELL, 0);
            ctx.lineTo(i * CELL, W);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * CELL);
            ctx.lineTo(W, i * CELL);
            ctx.stroke();
        }

        // Food
        const f = foodRef.current;
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(f.x * CELL + CELL / 2, f.y * CELL + CELL / 2, CELL / 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Snake
        snakeRef.current.forEach((seg, i) => {
            const alpha = 1 - (i / snakeRef.current.length) * 0.5;
            ctx.fillStyle = i === 0
                ? '#8b5cf6'
                : `rgba(99, 102, 241, ${alpha})`;
            if (i === 0) {
                ctx.shadowColor = '#8b5cf6';
                ctx.shadowBlur = 8;
            }
            ctx.beginPath();
            ctx.roundRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2, 4);
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }, []);

    const tick = useCallback(() => {
        const snake = [...snakeRef.current];
        const head = {
            x: snake[0].x + dirRef.current.x,
            y: snake[0].y + dirRef.current.y,
        };

        // Wall collision
        if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
            setGameState('over');
            return;
        }

        // Self collision
        if (snake.some(s => s.x === head.x && s.y === head.y)) {
            setGameState('over');
            return;
        }

        snake.unshift(head);

        // Eat food
        if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
            setScore(prev => {
                const newScore = prev + 10;
                if (newScore > highScore) {
                    setHighScore(newScore);
                    localStorage.setItem('snake_high', String(newScore));
                }
                return newScore;
            });
            spawnFood();
        } else {
            snake.pop();
        }

        snakeRef.current = snake;
        draw();
    }, [draw, highScore]);

    useEffect(() => {
        if (gameState === 'playing') {
            loopRef.current = setInterval(tick, 120);
        }
        return () => clearInterval(loopRef.current);
    }, [gameState, tick]);

    useEffect(() => {
        const handleKey = (e) => {
            if (gameState !== 'playing') return;
            const d = dirRef.current;
            switch (e.key) {
                case 'ArrowUp': if (d.y === 0) dirRef.current = { x: 0, y: -1 }; break;
                case 'ArrowDown': if (d.y === 0) dirRef.current = { x: 0, y: 1 }; break;
                case 'ArrowLeft': if (d.x === 0) dirRef.current = { x: -1, y: 0 }; break;
                case 'ArrowRight': if (d.x === 0) dirRef.current = { x: 1, y: 0 }; break;
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [gameState]);

    const startGame = () => {
        snakeRef.current = [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }];
        dirRef.current = { x: 1, y: 0 };
        spawnFood();
        setScore(0);
        setGameState('playing');
        draw();
    };

    // Mobile controls
    const mobileDir = (x, y) => {
        const d = dirRef.current;
        if ((x !== 0 && d.x === 0) || (y !== 0 && d.y === 0)) {
            dirRef.current = { x, y };
        }
    };

    // Initial draw
    useEffect(() => { draw(); }, [draw]);

    return (
        <div className="game-wrapper">
            <div className="game-hud">
                <div className="hud-stat">
                    <FaStar className="hud-stat-icon" />
                    <span>{score}</span>
                </div>
                <div className="hud-stat best">
                    <FaTrophy className="hud-stat-icon" />
                    <span>{highScore}</span>
                </div>
            </div>

            <div className="game-canvas-wrap">
                <canvas
                    ref={canvasRef}
                    width={GRID * CELL}
                    height={GRID * CELL}
                    className="game-canvas"
                />

                {gameState !== 'playing' && (
                    <div className="game-overlay">
                        {gameState === 'over' && (
                            <div className="game-over-text">Game Over!</div>
                        )}
                        <button className="game-start-btn" onClick={startGame}>
                            {gameState === 'over' ? <><FaRedo /> Retry</> : <><FaPlay /> Play</>}
                        </button>
                        <p className="game-hint">Arrow keys to move</p>
                    </div>
                )}
            </div>

            {/* Mobile D-pad */}
            <div className="mobile-dpad">
                <button className="dpad-btn dpad-up" onClick={() => mobileDir(0, -1)}><FaArrowUp /></button>
                <div className="dpad-mid">
                    <button className="dpad-btn dpad-left" onClick={() => mobileDir(-1, 0)}><FaArrowLeft /></button>
                    <div className="dpad-center"><FaGamepad /></div>
                    <button className="dpad-btn dpad-right" onClick={() => mobileDir(1, 0)}><FaArrowRight /></button>
                </div>
                <button className="dpad-btn dpad-down" onClick={() => mobileDir(0, 1)}><FaArrowDown /></button>
            </div>
        </div>
    );
};

// ═══════════════════════════════════════
// MEMORY MATCH GAME
// ═══════════════════════════════════════
const ICONS = [FaGamepad, FaStar, FaTrophy, FaBolt, FaBrain, FaDice];
const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

const createDeck = () => {
    const pairs = ICONS.map((icon, i) => [
        { id: i * 2, icon, color: COLORS[i], matched: false },
        { id: i * 2 + 1, icon, color: COLORS[i], matched: false },
    ]).flat();
    return pairs.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
    const [cards, setCards] = useState(createDeck);
    const [flipped, setFlipped] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    const handleFlip = (index) => {
        if (flipped.length === 2 || flipped.includes(index) || cards[index].matched) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            const [a, b] = newFlipped;
            if (cards[a].icon === cards[b].icon) {
                setTimeout(() => {
                    setCards(prev => prev.map((c, i) =>
                        i === a || i === b ? { ...c, matched: true } : c
                    ));
                    setFlipped([]);
                    // Check win
                    const allMatched = cards.every((c, i) =>
                        (i === a || i === b) ? true : c.matched
                    );
                    if (allMatched) setGameWon(true);
                }, 500);
            } else {
                setTimeout(() => setFlipped([]), 800);
            }
        }
    };

    const reset = () => {
        setCards(createDeck());
        setFlipped([]);
        setMoves(0);
        setGameWon(false);
    };

    const matchedCount = cards.filter(c => c.matched).length / 2;

    return (
        <div className="game-wrapper">
            <div className="game-hud">
                <div className="hud-stat">
                    <FaBrain className="hud-stat-icon" />
                    <span>{moves} moves</span>
                </div>
                <div className="hud-stat">
                    <FaStar className="hud-stat-icon" />
                    <span>{matchedCount}/{ICONS.length}</span>
                </div>
                <button className="hud-reset" onClick={reset}><FaRedo /></button>
            </div>

            <div className="memory-grid">
                {cards.map((card, i) => {
                    const isFlipped = flipped.includes(i) || card.matched;
                    const CardIcon = card.icon;
                    return (
                        <motion.button
                            key={card.id}
                            className={`memory-card ${isFlipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
                            onClick={() => handleFlip(i)}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="card-inner">
                                <div className="card-front">
                                    <FaGamepad className="card-back-icon" />
                                </div>
                                <div className="card-back" style={{ background: `${card.color}15`, borderColor: `${card.color}30` }}>
                                    <CardIcon style={{ color: card.color }} />
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {gameWon && (
                    <motion.div
                        className="game-won-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="won-content">
                            <FaTrophy className="won-icon" />
                            <h4>You Win!</h4>
                            <p>Completed in {moves} moves</p>
                            <button className="game-start-btn" onClick={reset}>
                                <FaRedo /> Play Again
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ═══════════════════════════════════════
// REACTION TIMER GAME
// ═══════════════════════════════════════
const ReactionGame = () => {
    const [state, setState] = useState('idle'); // idle, waiting, ready, result
    const [reactionTime, setReactionTime] = useState(null);
    const [bestTime, setBestTime] = useState(() =>
        parseInt(localStorage.getItem('reaction_best') || '999')
    );
    const timeoutRef = useRef(null);
    const startRef = useRef(null);

    const start = () => {
        setState('waiting');
        const delay = 1500 + Math.random() * 3500;
        timeoutRef.current = setTimeout(() => {
            startRef.current = Date.now();
            setState('ready');
        }, delay);
    };

    const click = () => {
        if (state === 'waiting') {
            clearTimeout(timeoutRef.current);
            setState('idle');
            setReactionTime('Too early!');
        } else if (state === 'ready') {
            const time = Date.now() - startRef.current;
            setReactionTime(time);
            if (time < bestTime) {
                setBestTime(time);
                localStorage.setItem('reaction_best', String(time));
            }
            setState('result');
        }
    };

    const getRating = (ms) => {
        if (typeof ms !== 'number') return '';
        if (ms < 200) return '⚡ Superhuman!';
        if (ms < 250) return '🔥 Amazing!';
        if (ms < 350) return '👏 Great!';
        if (ms < 500) return '👍 Good';
        return '🐌 Keep practicing';
    };

    return (
        <div className="game-wrapper">
            <div className="game-hud">
                <div className="hud-stat best">
                    <FaTrophy className="hud-stat-icon" />
                    <span>{bestTime < 999 ? `${bestTime}ms` : '--'}</span>
                </div>
            </div>

            <button
                className={`reaction-zone reaction-${state}`}
                onClick={state === 'idle' || state === 'result' ? start : click}
            >
                {state === 'idle' && (
                    <div className="reaction-content">
                        <FaBolt className="reaction-icon" />
                        <h4>Reaction Timer</h4>
                        <p>Click to start</p>
                    </div>
                )}
                {state === 'waiting' && (
                    <div className="reaction-content">
                        <div className="reaction-spinner" />
                        <h4>Wait for it...</h4>
                        <p>Click when the screen turns green!</p>
                    </div>
                )}
                {state === 'ready' && (
                    <div className="reaction-content">
                        <FaBolt className="reaction-icon go" />
                        <h4>CLICK NOW!</h4>
                    </div>
                )}
                {state === 'result' && (
                    <div className="reaction-content">
                        <div className="reaction-time">
                            {typeof reactionTime === 'number' ? `${reactionTime}ms` : reactionTime}
                        </div>
                        <p className="reaction-rating">{getRating(reactionTime)}</p>
                        <p>Click to try again</p>
                    </div>
                )}
            </button>
        </div>
    );
};

// ═══════════════════════════════════════
// GAMES CORNER (Main Component)
// ═══════════════════════════════════════
const games = [
    { id: 'snake', label: 'Snake', icon: FaGamepad, color: '#8b5cf6', component: SnakeGame },
    { id: 'memory', label: 'Memory', icon: FaBrain, color: '#ec4899', component: MemoryGame },
    { id: 'reaction', label: 'Reaction', icon: FaBolt, color: '#f59e0b', component: ReactionGame },
];

const GamesCorner = () => {
    const [activeGame, setActiveGame] = useState('snake');
    const ActiveComponent = games.find(g => g.id === activeGame)?.component;

    return (
        <section id="games" className="section games-corner">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Games Corner</h2>
                    <p className="section-subtitle">Take a break and play some games!</p>
                </motion.div>

                {/* Game Selector Tabs */}
                <div className="game-tabs">
                    {games.map(game => {
                        const Icon = game.icon;
                        return (
                            <button
                                key={game.id}
                                className={`game-tab ${activeGame === game.id ? 'active' : ''}`}
                                onClick={() => setActiveGame(game.id)}
                                style={{ '--tab-color': game.color }}
                            >
                                <Icon className="tab-icon" />
                                <span>{game.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Game Area */}
                <div className="game-area">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeGame}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="game-container"
                        >
                            {ActiveComponent && <ActiveComponent />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default GamesCorner;
