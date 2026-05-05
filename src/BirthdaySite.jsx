import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "С днём рождения ✨",
  "Сегодня твой день",
  "Пусть всё получится",
  "Счастья и лёгкости",
  "Ты сияешь",
  "Make a wish",
  "Новый яркий год",
  "Любви и вдохновения",
];

function CharacterVideo() {
  return (
    <motion.div
      className="relative z-20 h-[340px] w-[340px] overflow-hidden rounded-[2.5rem] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.2 }}
    >
      <video
        className="h-full w-full object-cover"
        src="https://app-uploads.krea.ai/public/73faff13-1604-4047-acdc-5a35d13f68b3-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </motion.div>
  );
}

function Bubble({ text, index }) {
  const layout = useMemo(() => {
    const cols = 3;
    const row = Math.floor(index / cols);
    const col = index % cols;

    const spacingX = 220;
    const spacingY = 120;

    return {
      x: (col - 1) * spacingX,
      y: (row - 1) * spacingY,
      delay: 0.6 + index * 0.1,
    };
  }, [index]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 max-w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-[1.4rem] border border-black/10 bg-white px-4 py-3 text-center text-sm font-medium text-black shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
      initial={{ opacity: 0, scale: 0.7, x: 0, y: 0 }}
      animate={{ opacity: 1, scale: 1, x: layout.x, y: layout.y }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay: layout.delay }}
    >
      {text}
    </motion.div>
  );
}

function SoftBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-blue-200 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-[-10%] top-[20%] h-72 w-72 rounded-full bg-pink-200 blur-3xl"
        animate={{ scale: [1, 0.9, 1] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
    </div>
  );
}

function Dog() {
  return (
    <motion.div
      className="absolute bottom-[-40px] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      <motion.div className="relative flex h-[140px] w-[140px] items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        <div className="absolute -left-6 top-6 h-12 w-12 rotate-[-20deg] rounded-full bg-white" />
        <div className="absolute -right-6 top-6 h-12 w-12 rotate-[20deg] rounded-full bg-white" />

        <motion.div
          className="absolute left-8 top-14 h-4 w-4 rounded-full bg-black"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-8 top-14 h-4 w-4 rounded-full bg-black"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="absolute top-20 h-4 w-4 rounded-full bg-black" />
      </motion.div>
    </motion.div>
  );
}

export default function BirthdaySite() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-white text-black">
      <SoftBackground />

      <AnimatePresence mode="wait">
        {!loaded ? (
          <motion.div key="loader" exit={{ opacity: 0 }}>
            <p className="text-sm text-black/40">loading</p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.h1
              className="text-center text-[4rem] font-black leading-[0.8] tracking-[-0.08em] sm:text-[7rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="block bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                Happy
              </span>
              <span className="block bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                Birthday
              </span>
            </motion.h1>

            <div className="relative mt-6 flex h-[600px] w-[600px] items-center justify-center">
              {messages.map((m, i) => (
                <Bubble key={i} text={m} index={i} />
              ))}
              <CharacterVideo />
              <Dog />
            </div>

            <p className="mt-6 text-black/50">Пусть этот день будет особенным</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
