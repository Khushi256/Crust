import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, 
                delayChildren: 0.2, 
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
            }
        },
    };

    const superGlowLineVariants = {
        hidden: { width: "0%", opacity: 0 },
        visible: {
            width: "100%", 
            opacity: 1,
            transition: {
                width: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3 },
                boxShadow: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: 0.5 
                }
            }
        }
    }
    
    const footerContentStyle = "relative w-full text-gray-300 px-6 md:px-20 py-10 flex flex-wrap justify-between z-10";
    const titleStyle = "font-extrabold text-white text-xl mb-4 tracking-wider";
    const linkStyle = "text-gray-400 hover:text-white transition-colors duration-200 block mb-2";

    return (
        <div 
            className="w-full relative" 
            style={{ 
                background: 'linear-gradient(180deg, rgba(15, 15, 15, 1) 0%, rgba(5, 5, 5, 1) 100%)',
            }}
        > 
            
            
           <div className="relative z-10 w-full pb-10"> 
            <div 
                className="w-full h-px" 
                style={{
                    backgroundColor: 'rgb(255, 255, 200)',
                    boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.8), 0 0 40px 10px rgba(255, 255, 255, 0.5), 0 0 80px 20px rgba(255, 255, 255, 0.2)',
                }}
            />
        </div>

            <motion.footer
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={footerContentStyle}
            >
                
                {/* 1. Services Column */}
                <motion.nav variants={itemVariants} className="mb-8 md:mb-0 w-full sm:w-1/4">
                    <h6 className={titleStyle}>Our World</h6>
                    <a href="#" className={linkStyle}>Our Pies</a>
                    <a href="#" className={linkStyle}>Sides & Drinks</a>
                    <a href="#" className="text-white font-bold block mb-2 hover:text-gray-300 transition-colors">Order Now</a>
                    <a href="#" className={linkStyle}>Our Story</a>
                </motion.nav>

                {/* 2. Company Column */}
                <motion.nav variants={itemVariants} className="mb-8 md:mb-0 w-full sm:w-1/4">
                    <h6 className={titleStyle}>Company</h6>
                    <a href="#" className={linkStyle}>Visit Us</a>
                    <a href="#" className={linkStyle}>Contact</a>
                    <a href="#" className={linkStyle}>Careers</a>
                    <a href="#" className={linkStyle}>Press Kit</a>
                </motion.nav>

                {/* 3. Legal Column */}
                <motion.nav variants={itemVariants} className="mb-8 md:mb-0 w-full sm:w-1/4">
                    <h6 className={titleStyle}>Legal</h6>
                    <a href="#" className={linkStyle}>Terms of Use</a>
                    <a href="#" className={linkStyle}>Privacy Policy</a>
                    <a href="#" className={linkStyle}>Cookie Policy</a>
                </motion.nav>

                {/* 4. Newsletter Form */}
                <motion.form variants={itemVariants} className="w-full sm:w-1/4 mt-4 sm:mt-0">
                    <h6 className={titleStyle}>Stay in the Loop</h6>
                    <fieldset className="w-full">
                        <label className="text-sm block mb-2">Get exclusive deals and updates!</label>
                        <div className="flex w-full">
                            <input
                                type="email"
                                placeholder="username@site.com"
                                className="p-3 w-full rounded-l-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-white focus:ring-1 focus:ring-white outline-none" 
                            />
                            <button 
                                type="submit"
                                className="p-3 bg-white text-gray-900 rounded-r-lg border border-white hover:bg-gray-200 font-bold shadow-white/50 shadow-md flex-shrink-0"
                            >
                                Subscribe
                            </button>
                        </div>
                    </fieldset>
                </motion.form>
            </motion.footer>
        </div>
    );
}

export default Footer;