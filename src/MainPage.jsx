import SplitText from "./components/SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function MainPage() {
   return (
    <main className="flex items-center justify-center flex-col p-6 bg-transparent">
    <SplitText
        text="YOUR SLICE OF HEAVEN"
        className="text-7xl font-bold text-center text-white mt-20 h-21 [text-shadow:0_0_8px_rgba(255,255,255,0.7)]"
        style={{ backgroundColor: 'transparent' }}
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
    />
     <SplitText
        text="Authentic, Wood-Fired Flavor. The Ultimate Comfort."
        className="text-2xl font-light text-center mt-4"
        style={{ backgroundColor: 'transparent' }}
        delay={30}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
    />
</main>
   );
}