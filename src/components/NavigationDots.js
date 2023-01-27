import React from 'react';

const NavigationDots = () => {
  const top = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="app__navigation">
      <i
        className="fas fa-long-arrow-alt-up app__navigation-dot"
        onClick={top}
      />
    </div>
  );
};

export default NavigationDots;
