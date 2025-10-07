import React from 'react'
import { useRef } from 'react';
import VariableProximity from './components/VariableProximity';
import SplitText from './components/SplitText';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const TextEffect = () => {
  const containerRef = useRef(null);
  return (
    <div
    ref={containerRef}
    style={{position: 'relative'}}
    className='flex flex-col'
    >
    
    <VariableProximity
        label={'ABOUT OUR AESTHETICS'}
        className={'variable-proximity-demo font-semibold text-5xl pb-10'}
        fromFontVariationSettings="'wght' 400, 'opsz' 9"
        toFontVariationSettings="'wght' 1000, 'opsz' 40"
        containerRef={containerRef}
        radius={100}
        falloff='linear'
    />
    <SplitText
    text=" Welcome to our slice of the digital world, where our passion for authentic, sizzling pizza meets modern design. Our restaurant is built on the belief that great food should be matched by a great experience, and this website is an extension of that philosophy. From the cozy, aesthetic ambiance of our restaurant to the effortless scroll animations here, every detail is designed to make you feel right at home. We are dedicated to serving up quality ingredients, both on your plate and on your screen."
    className="text-xl font-light text-center"
    delay={8}
    duration={0.6}
    ease="power3.out"
    splitType="chars"
    from={{ opacity: 0, y: 40 }}
    to={{ opacity: 1, y: 0 }}
    threshold={0.1}
    rootMargin="-100px"
    textAlign="left"
    onLetterAnimationComplete={handleAnimationComplete}
    />
    </div>
  )
}

export default TextEffect
