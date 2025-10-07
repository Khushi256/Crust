"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";


const cn = (...classes) => classes.filter(Boolean).join(" ");


const Carousel = ({ items }) => (
  <div className="flex overflow-x-scroll snap-x snap-mandatory py-10 space-x-6 px-4 md:px-10 custom-scrollbar-hide">
    {items.map((item, index) => (
      <div key={index} className="flex-shrink-0 snap-center w-[350px] md:w-[400px]">
        {item}
      </div>
    ))}
  </div>
);

const ReviewCard = ({ userName, rating, reviewContent, image }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-white fill-white" : "text-gray-600"}`}
        />
      );
    }
    return <div className="flex space-x-0.5 mb-4">{stars}</div>;
  };

  const glowVariants = {
    initial: {
      scale: 1,
      boxShadow: "0 0px 8px 2px rgba(255, 255, 255, 0.2)",
      borderColor: "rgba(255, 255, 255, 0.3)",
      transition: {
        boxShadow: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2.5,
          ease: "easeInOut",
        },
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: [
        "0 0px 10px 0px rgba(255, 255, 255, 0.4), 0 0px 20px 0px rgba(255, 255, 255, 0.2)",
        "0 0px 25px 0px rgba(255, 255, 255, 0.8), 0 0px 50px 15px rgba(255, 255, 255, 0.4)",
        "0 0px 10px 0px rgba(255, 255, 255, 0.4), 0 0px 20px 0px rgba(255, 255, 255, 0.2)",
      ],
      borderColor: "rgba(255, 255, 255, 1)",
      transition: {
        boxShadow: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.5,
          ease: "easeInOut",
        },
        scale: { type: "spring", stiffness: 300, damping: 20 },
        borderColor: { type: "spring", stiffness: 300, damping: 20 },
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col justify-between p-6 rounded-xl border-2 transition-all duration-300 transform-gpu bg-black/70 backdrop-blur-sm shadow-xl h-full"
      variants={glowVariants}
      initial="initial"
      whileHover="hover"
      style={{ minHeight: "360px" }}
    >
      {/* Stars at the top */}
      <div className="flex justify-start items-center">{renderStars()}</div>

      {/* Middle Part: Review Content */}
      <p className="text-sm text-gray-300 flex-grow italic leading-relaxed">
        "{reviewContent}"
      </p>

      {/* Bottom Part: User Image + Name */}
      <div className="flex items-center gap-3 mt-6">
        <img
          src={image}
          alt={userName}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
        />
        <h3 className="text-lg font-semibold text-white tracking-wider">{userName}</h3>
      </div>
    </motion.div>
  );
};

// --- Custom Card Wrapper Component ---
const Card = ({ card, index }) => {
  const rating = parseInt(card.category.split(" ")[0]);
  return (
    <div className="h-full">
      <ReviewCard
        userName={card.title}
        rating={rating}
        reviewContent={card.content}
        image={card.image}
      />
    </div>
  );
};

// =======================================================================

function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.title} card={card} index={index} layout={true} />
  ));

  return (
    <div className="relative w-full h-screen bg-black z-40 pt-15 min-h-[500px] overflow-x-hidden">
      <style>{`
        .custom-scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .custom-scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>

      <h1 className="text-2xl md:text-5xl font-medium mt-10 mb-4 ml-10 text-white">
        WHAT OUR CUSTOMERS SAY
      </h1>
      <p className="text-xl font-light text-red-500 mb-2 ml-10 uppercase tracking-widest">
        Honest reviews from our valued guests.
      </p>
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    category: "5 Stars",
    title: "Sarah Johnson",
    content:
      "Absolutely the best pizza I've ever had! The crust was perfectly crispy, the sauce had just the right amount of tang, and the toppings were incredibly fresh. I've ordered from here three times this week alone. The Margherita pizza is to die for, and their pepperoni is perfectly seasoned. Delivery was quick and the pizza arrived hot. Can't recommend this place enough!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    category: "5 Stars",
    title: "Michael Chen",
    content:
      "Consistently amazing! Every time I order, the pizza arrives hot and delicious. Their customer service is also top-notch. It's become my go-to for pizza night.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    category: "5 Stars",
    title: "Emily Rodriguez",
    content:
      "The ambiance is fantastic, and the pizza is even better! Their unique topping combinations are a game-changer. A truly aesthetic and tasty experience. Highly recommend the 'Kinetic Crust'!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    category: "4 Stars",
    title: "David Thompson",
    content:
      "Really good pizza, especially the vegan options they offer. Lost one star because delivery took a bit longer than expected, but the quality made up for it. Will order again.",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    category: "5 Stars",
    title: "Jessica Williams",
    content:
      "Pure perfection! The cheese pull on their pepperoni pizza is legendary. It always hits the spot. Plus, the online ordering system is super easy to use.",
    image: "https://randomuser.me/api/portraits/women/56.jpg",
  },
  {
    category: "5 Stars",
    title: "Robert Martinez",
    content:
      "This place sets the bar for pizza. The ingredients are so fresh, and you can tell they put a lot of care into each pie. The 'Glow Pie' card really captures how good it feels to eat here!",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
];

export default AppleCardsCarouselDemo;
