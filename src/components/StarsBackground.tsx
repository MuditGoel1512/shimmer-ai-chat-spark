
import React, { useEffect, useState } from 'react';

interface StarProps {
  size: 'sm' | 'md' | 'lg';
  style: React.CSSProperties;
  color: string;
}

const Star: React.FC<StarProps> = ({ size, style, color }) => {
  const [animation, setAnimation] = useState<React.CSSProperties>({});

  useEffect(() => {
    // More subtle pulsing animation
    const duration = 3 + Math.random() * 5;
    setAnimation({
      animation: `pulse ${duration}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 5}s`,
      backgroundColor: color
    });
  }, [color]);

  return <div className={`star star-${size}`} style={{ ...style, ...animation }} />;
};

const StarsBackground: React.FC = () => {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generateStars = () => {
      // Even fewer stars for a more professional look
      const starCount = Math.floor(window.innerWidth / 25);
      const newStars = [];
      
      // Professional blue color palette - more subtle and deeper blues
      const colors = ['#1a5fb4', '#3584e4', '#62a0ea', '#99c1f1'];

      for (let i = 0; i < starCount; i++) {
        // Make most stars small for a more subtle effect
        const size = Math.random() > 0.97 ? 'lg' : Math.random() > 0.85 ? 'md' : 'sm';
        const style = {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.02 + Math.random() * 0.08 // Lower opacity for a more subtle effect
        };
        
        // Select a random color from our professional colors
        const color = colors[Math.floor(Math.random() * colors.length)];

        newStars.push(<Star key={i} size={size} style={style} color={color} />);
      }

      setStars(newStars);
    };

    generateStars();

    window.addEventListener('resize', generateStars);
    return () => {
      window.removeEventListener('resize', generateStars);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-b from-black via-black to-[#0a1929]">
      {stars}
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-[#071526]/20 to-transparent"></div>
    </div>
  );
};

export default StarsBackground;
