import { useEffect, useRef } from 'react';
import './ProceduralTerrain.css';

// ─── Noise helpers ───────────────────────────────
// Simple value-noise using sine composites (no library needed)
const noise = (x) => {
    const s = Math.sin(x * 0.3) * 0.5
        + Math.sin(x * 0.7 + 1.3) * 0.3
        + Math.sin(x * 1.1 + 4.7) * 0.15
        + Math.sin(x * 2.3 + 0.8) * 0.05;
    return s;
};

// ─── Terrain layer configs ───────────────────────
const LAYERS = [
    {
        // Back layer — large gentle hills, slowest scroll
        speed: 0.15,
        baseY: 0.78,          // starts at 78% down
        amplitude: 60,
        frequency: 0.0025,
        fillTop: 'rgba(79, 70, 229, 0.10)',
        fillBot: 'rgba(139, 92, 246, 0.04)',
        trees: false,
    },
    {
        // Mid layer
        speed: 0.3,
        baseY: 0.84,
        amplitude: 45,
        frequency: 0.004,
        fillTop: 'rgba(139, 92, 246, 0.12)',
        fillBot: 'rgba(236, 72, 153, 0.05)',
        trees: true,
        treeColor: 'rgba(79, 70, 229, 0.13)',
        treeSpacing: 120,
    },
    {
        // Front layer — small sharp hills, fastest scroll
        speed: 0.5,
        baseY: 0.90,
        amplitude: 30,
        frequency: 0.006,
        fillTop: 'rgba(236, 72, 153, 0.14)',
        fillBot: 'rgba(79, 70, 229, 0.05)',
        trees: true,
        treeColor: 'rgba(139, 92, 246, 0.15)',
        treeSpacing: 80,
    },
];

// ─── Stars config ────────────────────────────────
const NUM_STARS = 50;

const ProceduralTerrain = () => {
    const canvasRef = useRef(null);
    const scrollRef = useRef(0);
    const starsRef = useRef([]);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // ── Sizing ──
        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // regenerate stars on resize
            generateStars();
        };

        // ── Stars ──
        const generateStars = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const stars = [];
            for (let i = 0; i < NUM_STARS; i++) {
                stars.push({
                    x: Math.random() * w * 3,    // spread across wider area for scrolling
                    y: Math.random() * h * 0.65,  // upper 65% of screen
                    r: 0.5 + Math.random() * 1.5,
                    twinkleSpeed: 0.5 + Math.random() * 2,
                    twinkleOffset: Math.random() * Math.PI * 2,
                });
            }
            starsRef.current = stars;
        };

        // ── Scroll ──
        const onScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        };

        // ── Draw one terrain layer ──
        const drawLayer = (layer, w, h, scrollProgress, time) => {
            const offset = scrollProgress * w * 4 * layer.speed;

            // Create gradient fill
            const grad = ctx.createLinearGradient(0, h * layer.baseY - layer.amplitude, 0, h);
            grad.addColorStop(0, layer.fillTop);
            grad.addColorStop(1, layer.fillBot);

            ctx.beginPath();
            ctx.moveTo(0, h);

            // Draw terrain curve
            for (let x = 0; x <= w; x += 3) {
                const nx = x + offset;
                const y = h * layer.baseY
                    + noise(nx * layer.frequency) * layer.amplitude
                    + Math.sin(nx * layer.frequency * 0.5 + 2) * layer.amplitude * 0.5;
                ctx.lineTo(x, y);
            }

            ctx.lineTo(w, h);
            ctx.closePath();
            ctx.fillStyle = grad;
            ctx.fill();

            // ── Trees / bushes ──
            if (layer.trees) {
                const spacing = layer.treeSpacing;
                for (let x = -spacing; x <= w + spacing; x += spacing) {
                    const worldX = x + (offset % spacing);
                    const nx = worldX + offset - (offset % spacing);
                    const terrainY = h * layer.baseY
                        + noise(nx * layer.frequency) * layer.amplitude
                        + Math.sin(nx * layer.frequency * 0.5 + 2) * layer.amplitude * 0.5;

                    // Vary tree size with noise
                    const treeH = 12 + Math.abs(noise(nx * 0.01)) * 18;
                    const treeW = 6 + Math.abs(noise(nx * 0.013 + 5)) * 8;

                    // Triangle tree
                    ctx.beginPath();
                    ctx.moveTo(worldX, terrainY);
                    ctx.lineTo(worldX - treeW, terrainY);
                    ctx.lineTo(worldX, terrainY - treeH);
                    ctx.lineTo(worldX + treeW, terrainY);
                    ctx.closePath();
                    ctx.fillStyle = layer.treeColor;
                    ctx.fill();

                    // Trunk
                    ctx.fillStyle = layer.treeColor;
                    ctx.fillRect(worldX - 1, terrainY, 2, 5);
                }
            }
        };

        // ── Draw stars ──
        const drawStars = (w, scrollProgress, time) => {
            const stars = starsRef.current;
            const starOffset = scrollProgress * w * 0.8;

            stars.forEach(star => {
                const sx = ((star.x - starOffset) % (w * 1.5) + w * 1.5) % (w * 1.5) - w * 0.25;
                const alpha = 0.03 + 0.04 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset);

                ctx.beginPath();
                ctx.arc(sx, star.y, star.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
                ctx.fill();
            });
        };

        // ── Draw glowing spirit/orb ──
        const drawSpirit = (w, h, scrollProgress, time) => {
            const layer = LAYERS[1]; // float on mid terrain layer
            const offset = scrollProgress * w * 4 * layer.speed;

            // Spirit position — fixed at ~40% of screen width
            const spiritScreenX = w * 0.4;
            const nx = spiritScreenX + offset;
            const terrainY = h * layer.baseY
                + noise(nx * layer.frequency) * layer.amplitude
                + Math.sin(nx * layer.frequency * 0.5 + 2) * layer.amplitude * 0.5;

            // Floating bob
            const floatY = Math.sin(time * 2) * 6;
            const floatX = Math.cos(time * 1.3) * 3;
            const cx = spiritScreenX + floatX;
            const cy = terrainY - 30 + floatY;

            ctx.save();

            // ── Outer glow ──
            const glowRadius = 18 + Math.sin(time * 3) * 4;
            const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
            glow.addColorStop(0, 'rgba(99, 102, 241, 0.20)');
            glow.addColorStop(0.4, 'rgba(139, 92, 246, 0.10)');
            glow.addColorStop(1, 'rgba(236, 72, 153, 0)');
            ctx.beginPath();
            ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();

            // ── Core orb ──
            const coreRadius = 5 + Math.sin(time * 4) * 1;
            const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
            core.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
            core.addColorStop(0.5, 'rgba(99, 102, 241, 0.30)');
            core.addColorStop(1, 'rgba(139, 92, 246, 0.15)');
            ctx.beginPath();
            ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
            ctx.fillStyle = core;
            ctx.fill();

            // ── Rotating ring ──
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(time * 1.5);
            ctx.beginPath();
            ctx.ellipse(0, 0, 10, 4, 0, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();

            // ── Particle trail ──
            for (let i = 1; i <= 8; i++) {
                const t = i / 8;
                const trailX = cx - i * 7 + Math.sin(time * 3 + i * 0.8) * 3;
                const trailY = cy + i * 2 + Math.cos(time * 2.5 + i * 1.2) * 3;
                const trailAlpha = 0.18 * (1 - t);
                const trailR = (3.5 - i * 0.35);

                const trailGrad = ctx.createRadialGradient(trailX, trailY, 0, trailX, trailY, trailR);
                trailGrad.addColorStop(0, `rgba(139, 92, 246, ${trailAlpha})`);
                trailGrad.addColorStop(1, `rgba(236, 72, 153, 0)`);
                ctx.beginPath();
                ctx.arc(trailX, trailY, trailR, 0, Math.PI * 2);
                ctx.fillStyle = trailGrad;
                ctx.fill();
            }

            // ── Tiny sparkles around orb ──
            for (let i = 0; i < 4; i++) {
                const angle = time * 2 + (i * Math.PI / 2);
                const dist = 12 + Math.sin(time * 3 + i) * 4;
                const sx = cx + Math.cos(angle) * dist;
                const sy = cy + Math.sin(angle) * dist;
                const sparkAlpha = 0.10 + 0.08 * Math.sin(time * 5 + i * 1.5);

                ctx.beginPath();
                ctx.arc(sx, sy, 1, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${sparkAlpha})`;
                ctx.fill();
            }

            ctx.restore();
        };

        // ── Render loop ──
        let startTime = performance.now();

        const render = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const time = (performance.now() - startTime) / 1000;
            const scrollProgress = scrollRef.current;

            // Clear
            ctx.clearRect(0, 0, w, h);

            // Stars
            drawStars(w, scrollProgress, time);

            // Terrain layers (back to front)
            LAYERS.forEach(layer => drawLayer(layer, w, h, scrollProgress, time));

            // Glowing spirit on mid terrain
            drawSpirit(w, h, scrollProgress, time);

            rafRef.current = requestAnimationFrame(render);
        };

        // ── Init ──
        resize();
        onScroll();
        render();

        window.addEventListener('resize', resize);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="procedural-terrain-canvas"
            aria-hidden="true"
        />
    );
};

export default ProceduralTerrain;
