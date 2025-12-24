import React, { useEffect, useRef } from 'react';

const RefractionBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    const particles = [];
    const prisms = [];
    const colors = ['#22D3EE', '#FB7185', '#FBBF24', '#6366F1'];

    // Create light rays
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 500 + 200,
        speed: Math.random() * 0.3 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.12 + 0.03
      });
    }

    // Create floating glass prisms
    for (let i = 0; i < 8; i++) {
      prisms.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        velocity: { x: (Math.random() - 0.5) * 0.5, y: (Math.random() - 0.5) * 0.5 },
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'screen';

      // Draw light rays with bending
      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y + p.length < 0) p.y = canvas.height + p.length;

        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 600;
        const force = Math.max(0, (maxDist - dist) / maxDist);

        ctx.beginPath();
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.5 + force * 2;
        ctx.globalAlpha = p.opacity + (force * 0.2);
        
        const bendX = dx * force * 0.4;
        const bendY = dy * force * 0.4;

        ctx.moveTo(p.x, p.y);
        ctx.bezierCurveTo(
          p.x + bendX, 
          p.y + p.length * 0.3 + bendY, 
          p.x - bendX,
          p.y + p.length * 0.7 + bendY,
          p.x, 
          p.y + p.length
        );
        ctx.stroke();
      });

      // Draw floating prisms
      ctx.globalCompositeOperation = 'source-over';
      prisms.forEach(prism => {
        prism.x += prism.velocity.x;
        prism.y += prism.velocity.y;
        prism.rotation += prism.rotationSpeed;

        if (prism.x < -100) prism.x = canvas.width + 100;
        if (prism.x > canvas.width + 100) prism.x = -100;
        if (prism.y < -100) prism.y = canvas.height + 100;
        if (prism.y > canvas.height + 100) prism.y = -100;

        ctx.save();
        ctx.translate(prism.x, prism.y);
        ctx.rotate(prism.rotation);
        
        // Triangle shape
        ctx.beginPath();
        const sides = 3;
        for (let i = 0; i < sides; i++) {
          const angle = (i * 2 * Math.PI) / sides;
          const x = prism.size * Math.cos(angle);
          const y = prism.size * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        // Glass material feel
        const gradient = ctx.createLinearGradient(-prism.size, -prism.size, prism.size, prism.size);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Prismatic edges
        ctx.beginPath();
        ctx.moveTo(-prism.size, -prism.size);
        ctx.lineTo(prism.size, prism.size);
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.1)';
        ctx.stroke();

        ctx.restore();
      });

      // Prismatic Mouse Glow
      const glowGrad = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, 800
      );
      glowGrad.addColorStop(0, 'rgba(34, 211, 238, 0.06)');
      glowGrad.addColorStop(0.4, 'rgba(251, 113, 133, 0.02)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.globalCompositeOperation = 'screen';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-[#050505]"
    />
  );
};

export default RefractionBackground;
