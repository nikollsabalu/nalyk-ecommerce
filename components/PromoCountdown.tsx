"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  endsAt: string;
  setExpired: any;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function TimeCard({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="min-w-[42px] rounded-md bg-white/15 px-2 py-1 text-center backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="text-xs font-semibold"
        >
          {String(value).padStart(2, "0")}
        </motion.div>
      </AnimatePresence>

      <span className="text-[8px] font-semibold uppercase opacity-80">
        {label}
      </span>
    </div>
  );
}

export default function PromoCountdown({ endsAt, setExpired }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
 
    if (!endsAt) return;

    const update = () => {
      if (!endsAt) return;

      const endTime = new Date(endsAt).getTime();
      if (isNaN(endTime)) return;

      const diff = endTime - Date.now();

      if (diff <= 0) {
        setExpired(true);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [endsAt]);

  return (
    <div className="flex items-center gap-2">
      <TimeCard value={timeLeft.days} label="DÍAS" />
      <TimeCard value={timeLeft.hours} label="HORAS" />
      <TimeCard value={timeLeft.minutes} label="MINUTOS" />
      <TimeCard value={timeLeft.seconds} label="SEGUNDOS" />
    </div>
  );
}