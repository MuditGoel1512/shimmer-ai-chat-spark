
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
      const starCount = Math.floor(window.innerWidth / 20);
      const newStars = [];
      
      // Professional blue color palette
      const colors = ['#2e5cb8', '#3d6ac5', '#4f78cc', '#5b86d9', '#6a94df'];

      for (let i = 0; i < starCount; i++) {
        // Make most stars small for a more subtle effect
        const size = Math.random() > 0.95 ? 'lg' : Math.random() > 0.8 ? 'md' : 'sm';
        const style = {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.03 + Math.random() * 0.1 // Lower opacity for a subtle effect
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

  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-black">{stars}</div>;
};

export default StarsBackground;
