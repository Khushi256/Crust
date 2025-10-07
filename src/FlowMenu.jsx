import contact from './assets/contact.png'
import menu from './assets/menu.png'
import visit from './assets/visit.png'
import order from './assets/order.png'

import React, { useState } from 'react';

function MenuItem({ link, text, image }) {
  const [isHovered, setIsHovered] = useState(false);
  const [enterEdge, setEnterEdge] = useState('top');

  const findClosestEdge = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const topDist = mouseY;
    const bottomDist = rect.height - mouseY;
    return topDist < bottomDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (e) => {
    const edge = findClosestEdge(e);
    setEnterEdge(edge);
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    const edge = findClosestEdge(e);
    setEnterEdge(edge);
    setIsHovered(false);
  };

  const repeatedContent = Array.from({ length: 8 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span className="text-gray-900 uppercase font-medium text-3xl md:text-3xl px-4 whitespace-nowrap">{text}</span>
      <div
        className="w-32 h-20 mx-8 rounded-full bg-cover bg-center flex-shrink-0"
        style={{ backgroundImage: `url(${image})` }}
      />
    </React.Fragment>
  ));

  return (
    <div className="flex-1 relative overflow-hidden text-center border-t border-white">
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-medium text-white text-3xl md:text-3xl transition-colors duration-300 hover:text-gray-900"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      
      {/* Marquee overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white transition-transform duration-700 ease-out"
        style={{
          transform: isHovered 
            ? 'translateY(0%)' 
            : enterEdge === 'top' 
              ? 'translateY(-101%)' 
              : 'translateY(101%)'
        }}
      >
        <div 
          className="h-full w-[200%] flex transition-transform duration-700 ease-out"
          style={{
            transform: isHovered 
              ? 'translateY(0%)' 
              : enterEdge === 'top' 
                ? 'translateY(101%)' 
                : 'translateY(-101%)'
          }}
        >
          <div className="flex items-center relative h-full animate-marquee">
            {repeatedContent}
            {repeatedContent}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowingMenu({ items = [] }) {
  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function FlowMenu() {
  const demoItems = [
    { link: '#', text: 'Menu', image: menu},
    { link: '#', text: 'Contact', image: contact },
    { link: '#', text: 'Visit Us', image: visit },
    { link: '#', text: 'Order Now', image: order},
  ];

  return (
    <>
      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
      <div className="relative z-30 bg-black pt-10 pb-10 min-h-screen">
        <div 
          className="text-center w-full bg-black pb-10" 
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <h1 className="text-2xl md:text-5xl font-medium mb-4 text-white">
            WELCOME TO CRUST
          </h1>
          <p className="text-xl font-light text-red-500 mb-2 uppercase tracking-widest">
            Explore Our World
          </p>
        </div>
        <div style={{ height: '500px', position: 'relative' }}>
          <FlowingMenu items={demoItems} />
        </div>
      </div>
    </>
  );
}

export default FlowMenu;