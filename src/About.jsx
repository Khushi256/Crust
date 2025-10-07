import React from 'react'
import TiltedCard from './components/TiltedCard';
import restraunt from './assets/restraunt.png';
import TextEffect from './TextEffect';

const About = () => {
  return (
    <>
    <div className='relative z-50 flex flex-row items-center h-screen w-330 justify-center '>
        <div className=' p-20 pb-20 pr-50'>
           <TextEffect></TextEffect>
        </div>
         <TiltedCard
        imageSrc={restraunt}
        altText="restraunt"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="400px"
        imageWidth="400px"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        />
    </div>
   </>
  )
}

export default About
