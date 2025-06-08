'use client';

import { useEffect, useState } from 'react';

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: '59d',
    hours: '23h',
    minutes: '59m',
    seconds: '59s',
  });

  useEffect(() => {
    // Calculate the target date (2 months from now)
    const currentDate = new Date();
    const targetDate = new Date(currentDate.setMonth(currentDate.getMonth() + 2)).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({
          days: '0d',
          hours: '0h',
          minutes: '0m',
          seconds: '0s',
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: `${days}d`,
        hours: `${hours}h`,
        minutes: `${minutes}m`,
        seconds: `${seconds}s`,
      });
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup
  }, []);


  return (
    <div className="bg-lightgrey w-full flex justify-center items-center px-2 bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500">
      <div className=" mx-auto my-48 rounded-lg shadow-lg bg-white  overflow-hidden">
        <div className="py-4 px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center py-4">Coming Soon!</h2>
          <p className="mt-2 text-lg text-gray-600 text-center">
            We are working hard to bring you an amazing website. Stay tuned!
          </p>
        </div>

        <div className="py-4 px-6">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {Object.entries(timeLeft).map(([key, value]) => (
              <div
                key={key}
                className="border rounded-lg px-4 py-2 min-w-[60px] text-center"
              >
                <div className="font-bold font-mono text-2xl text-gray-800">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
