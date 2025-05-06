
import React, { useEffect, useState } from 'react';

interface StarProps {
  size: 'sm' | 'md' | 'lg';
  style: React.CSSProperties;
}

const Star: React.FC<StarProps> = ({ size, style }) => {
  const [animation, setAnimation] = useState<React.CSSProperties>({});

  useEffect(() => {
    // Random pulsing animation
    const duration = 2 + Math.random() * 4;
    setAnimation({
      animation: `pulse ${duration}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 5}s`
    });
  }, []);

  return <div className={`star star-${size}`} style={{ ...style, ...animation }} />;
};

const StarsBackground: React.FC = () => {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const starCount = Math.floor(window.innerWidth / 10); // Responsive star count
      const newStars = [];

      for (let i = 0; i < starCount; i++) {
        const size = Math.random() > 0.8 ? 'lg' : Math.random() > 0.5 ? 'md' : 'sm';
        const style = {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.1 + Math.random() * 0.9
        };

        newStars.push(<Star key={i} size={size} style={style} />);
      }

      setStars(newStars);
    };

    generateStars();

    window.addEventListener('resize', generateStars);
    return () => {
      window.removeEventListener('resize', generateStars);
    };
  }, []);

  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">{stars}</div>;
};

export default StarsBackground;
