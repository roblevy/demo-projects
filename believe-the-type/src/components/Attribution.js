import React from 'react';

const Attribution = () => {
  return (
    <span className = 'attribution' style={{ zIndex: 50, fontSize: '0.9em' }}>
      <img src="https://theysaidso.com/branding/theysaidso.png" height="20" width="20" alt="theysaidso.com"/>
      <a href="https://theysaidso.com" title="Powered by quotes from theysaidso.com"
        style={{ color: '#9fcc25', marginLeft: 4, verticalAlign: 'middle'}}>theysaidso.com</a>
    </span>
  );
};

export default Attribution;
