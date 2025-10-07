import pizza from './assets/pizza.png'
import Navbar from './Navbar'
import MainPage from './MainPage'
import './responsive.css'; 

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Bg() {
    const { scrollYProgress } = useScroll();
    
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
    
    const x = useTransform(scrollYProgress, [0, 0.5], [0, 400]); 
    
    const y = useTransform(scrollYProgress, [5,0], [0, 300]); 
    
    const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    
    return (
        <div style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
            <motion.img
                src={pizza}
                alt="Delicious Pizza"
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 mt-10" 
                animate={{ rotate: 360 }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    width: '800px',
                    height: '800px',
                    objectFit: 'contain',
                    scale: scale,
                    x: x,
                    y: y,
                }}
            />

            <motion.div 
                className="relative z-20"
                style={{ opacity: contentOpacity }}
            > 
                <Navbar />
                <MainPage />
            </motion.div>
           
                
        </div>
    );
}