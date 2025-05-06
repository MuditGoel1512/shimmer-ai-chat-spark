
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
      // Fewer stars for a more professional look
      const starCount = Math.floor(window.innerWidth / 15);
      const newStars = [];
      
      // More subtle colors for a professional look
      const colors = ['#5e35b1', '#7e3dbd', '#9c27b0', '#b92da6', '#d81b60'];

      for (let i = 0; i < starCount; i++) {
        // Make most stars small for a more subtle effect
        const size = Math.random() > 0.9 ? 'lg' : Math.random() > 0.7 ? 'md' : 'sm';
        const style = {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.05 + Math.random() * 0.2 // Lower opacity for a subtle effect
        };
        
        // Select a random color from our gradient colors
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

  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-black">{stars}</div>;
};

export default StarsBackground;
