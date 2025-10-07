import React, { useLayoutEffect, useRef, useCallback } from 'react';
import pizza1 from './assets/pizza1.png';
import pizza2 from './assets/pizza2.png';
import pizza3 from './assets/pizza3.png';


const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-[90vw] sm:w-[85vw] md:w-[80vw] max-w-4xl mx-auto h-60 sm:h-72 md:h-80 p-4 sm:p-6 md:p-8 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] box-border origin-top transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:z-50 cursor-pointer ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      WebkitBackfaceVisibility: 'hidden',
      WebkitTransformStyle: 'preserve-3d',
      transform: 'translate3d(0, 0, 0)',
      WebkitTransform: 'translate3d(0, 0, 0)',
      willChange: 'transform',
      transformOrigin: 'top center',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.2), 0 8px 30px rgba(0, 0, 0, 0.12)',
    }}>
    {children}
  </div>
);


const ScrollStack = ({
  children,
  className = '',
  itemDistance = 50,
  itemScale = 0.03,
  itemStackDistance = 20,
  stackPosition = '30%',
  scaleEndPosition = '10%',
  baseScale = 0.95,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete
}) => {
  const containerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const rafRef = useRef(null);
  const lastScrollTop = useRef(0);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = window.scrollY;
    const scrollDelta = Math.abs(scrollTop - lastScrollTop.current);
    lastScrollTop.current = scrollTop;

    if (scrollDelta < 0.5) {
      isUpdatingRef.current = false;
      return;
    }

    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = document.querySelector('.scroll-stack-end');
    const endElementTop = endElement ? endElement.getBoundingClientRect().top + window.scrollY : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const cardTop = rect.top + window.scrollY;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jRect = cardsRef.current[j].getBoundingClientRect();
          const jCardTop = jRect.top + window.scrollY;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY),
        scale: Math.round(scale * 10000) / 10000,
        rotation: Math.round(rotation * 10) / 10,
        blur: Math.round(blur * 10) / 10
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.5 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.0001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : 'none';

        card.style.transform = transform;
        card.style.WebkitTransform = transform;
        card.style.filter = filter;
        card.style.WebkitFilter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage
  ]);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(updateCardTransforms);
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.style.willChange = 'transform';
    container.style.transform = 'translate3d(0, 0, 0)';
    container.style.WebkitTransform = 'translate3d(0, 0, 0)';

    const cards = Array.from(container.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginTop = `-${itemDistance}px`;
      }
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    setTimeout(() => updateCardTransforms(), 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
      
      if (container) {
        container.style.willChange = '';
        container.style.transform = '';
        container.style.WebkitTransform = '';
      }
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    handleScroll,
    updateCardTransforms
  ]);

  return (
    <div className={`relative w-full ${className}`.trim()} ref={containerRef}>
      <div className="pt-[10vh] px-4 md:px-20 pb-10 min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};


// Main PizzaSlider Component
const PizzaSlider = () => {
  return (
    <div className="relative z-30 min-h-screen bg-white mt-[100vh]">
      <div className="min-h-screen">
        <div 
          className="py-5 text-center top-0 z-40 bg-black" 
          style={{ 
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)' 
          }}
        >
          <p className="text-xl font-light text-red-500 mb-2 uppercase tracking-widest">Our Signature Collection</p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 uppercase text-white">
            Taste the Legend.
          </h1>
        </div>

        <ScrollStack 
          itemDistance={50}
          itemStackDistance={20}
          baseScale={0.95}
          stackPosition="30%"
        >
          <ScrollStackItem itemClassName="bg-black">
            <div className="flex items-center justify-between h-full">
              <div className="flex-1 pr-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Margherita Classic</h2>
                <p className="text-l text-gray-600 leading-relaxed">
                  Fresh mozzarella, San Marzano tomatoes, and basil leaves on our 
                  hand-tossed dough. A timeless Italian masterpiece that celebrates simplicity.
                </p>
                <div className="mt-6">
                  <span className="inline-block text-white px-6 py-2 rounded-full font-semibold">
                    Starting at $12.99
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-64 h-64 bg-black rounded-2xl flex items-center justify-center shadow-4xl overflow-hidden">
                <img
                src={pizza1}
                alt="Authentic Italian Margherita Pizza"
                className="w-full h-full object-cover" 
                />
            </div>
            </div>
            </div>
          </ScrollStackItem>

          <ScrollStackItem itemClassName="bg-black">
            <div className="flex items-center justify-between h-full">
              <div className="flex-1 pr-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Pepperoni Paradise</h2>
                <p className="text-l text-gray-600 leading-relaxed">
                  Loaded with premium pepperoni slices, melted mozzarella, and our 
                  signature tomato sauce. The ultimate crowd-pleaser that never disappoints.
                </p>
                <div className="mt-6">
                  <span className="inline-block bg-black px-6 py-2 rounded-full font-semibold">
                    Starting at $14.99
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-64 h-64 bg-black rounded-2xl flex items-center justify-center shadow-4xl overflow-hidden">
                <img
                src={pizza2}
                alt="Authentic Italian Margherita Pizza"
                className="w-full h-full object-cover" 
                />
            </div>
            </div>
            </div>
          </ScrollStackItem>

          <ScrollStackItem itemClassName="bg-black">
            <div className="flex items-center justify-between h-full">
              <div className="flex-1 pr-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Veggie Supreme</h2>
                <p className="text-l text-gray-600 leading-relaxed">
                  A garden party on every slice! Bell peppers, mushrooms, olives, onions, 
                  and tomatoes with a blend of Italian cheeses. Fresh, healthy, and delicious.
                </p>
                <div className="mt-6">
                  <span className="inline-block bg-black px-6 py-2 rounded-full font-semibold">
                    Starting at $13.99
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-64 h-64 bg-black rounded-2xl flex items-center justify-center shadow-4xl overflow-hidden">
                <img
                src={pizza3}
                alt="Authentic Italian Margherita Pizza"
                className="w-full h-full object-cover" 
                />
            </div>
            </div>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </div>
  )
}

export default PizzaSlider