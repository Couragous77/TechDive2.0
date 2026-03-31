import React from 'react';
import { useEffect, useState } from 'react';

const quotes = [
  "In cybersecurity, it's not about if you will be attacked, but when",
  "The best defense is a good offense; anticipate the attacker",
  "Code is like humor. When you have to explain it, it’s bad",
  "The most dangerous person is the one who is both intelligent and knowledgeable",
  "Good code is its own best documentation",
  "Security is a process, not a product",
  "In programming, clarity is more important than brevity",
  "Never stop learning; the tech field is constantly evolving",
  "Your code should be like a well-written book; easy to read and understand",
  "A good programmer is not someone who knows every language; it's someone who knows how to learn",
  "Programming isn't about what you know; it's about what you can figure out",
  "It's not a bug; it's an undocumented feature",
  "To succeed in cybersecurity, think like an attacker",
  "Debugging is like being the detective in a crime movie where you are also the murderer",
  "The only secure system is one that is powered off, cast in a block of concrete, and sealed in a lead-lined box",
  "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it",
  "You can't be afraid of what people are going to say. You can't be afraid of the judgment of others",
  "Good programmers write code that humans can understand",
  "The best way to predict the future is to create it",
  "Every problem is a gift; without problems, we would not grow",
  "Simplicity is the soul of efficiency",
  "If you think good architecture is expensive, try bad architecture",
  "In cybersecurity, it's not the question of if you'll be hacked, but when",
  "Learning to write programs stretches your mind, and helps you think better",
  "The future belongs to those who believe in the beauty of their dreams",
  "Success usually comes to those who are too busy to be looking for it",
  "Don't watch the clock; do what it does. Keep going",
  "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work",
  "Success is not the key to happiness. Happiness is the key to success",
  "You miss 100% of the shots you don’t take",
  "Opportunities don't happen. You create them",
  "Hardships often prepare ordinary people for an extraordinary destiny",
  "The only limit to our realization of tomorrow will be our doubts of today",
  "Act as if what you do makes a difference. It does",
  "It does not matter how slowly you go as long as you do not stop",
  "Success is not in what you have, but who you are",
  "Believe you can and you're halfway there",
  "You don’t have to be great to start, but you have to start to be great",
  "Dream big and dare to fail",
  "Perseverance is not a long race; it is many short races one after the other",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us",
  "Do not wait to strike till the iron is hot, but make it hot by striking",
  "Success is walking from failure to failure with no loss of enthusiasm",
  "If you want to lift yourself up, lift up someone else",
  "What we fear doing most is usually what we most need to do",
  "You are never too old to set another goal or to dream a new dream",
  "Success is a journey, not a destination",
  "It always seems impossible until it’s done",
  "The future belongs to those who prepare for it today",
  "The way to get started is to quit talking and begin doing",
  "The best way to find yourself is to lose yourself in the service of others",
  "Your most unhappy customers are your greatest source of learning",
  "Collaboration is the key to success in any field",
  "If you want to go fast, go alone. If you want to go far, go together",
  "Great things in business are never done by one person. They're done by a team of people",
  "To add value, you must be willing to add time",
  "In every job that must be done, there is an element of fun",
  "To create a great product, you need a great team",
  "No one can whistle a symphony. It takes a whole orchestra to play it",
  "A single arrow is easily broken, but not ten in a bundle",
  "Teamwork is the ability to work together toward a common vision",
  "Innovation comes from people who take joy in their work",
  "The whole is greater than the sum of its parts",
  "You can’t build a reputation on what you are going to do",
  "Your job is to be yourself, while doing your best work",
  "The success of the team is dependent on each individual member",
  "Valuable contributions often come from those who dare to challenge the status quo",
  "Leadership is not about being in charge; it's about taking care of those in your charge",
  "The best leaders are those most interested in surrounding themselves with others who will help them achieve their objectives",
  "You can't change how people treat you or what they say about you. All you can do is change how you react to it",
  "Success is not the absence of failure; it's the persistence through failure",
  "Every accomplishment starts with the decision to try",
  "The only way to do great work is to love what you do",
  "Life is 10% what happens to us and 90% how we react to it",
  "Success is not for the chosen few, but for the few who choose",
  "The road to success is dotted with many tempting parking spaces",
  "Challenges are what make life interesting, and overcoming them is what makes life meaningful",
  "You don't have to be perfect to be a success",
  "What you get by achieving your goals is not as important as what you become by achieving your goals",
  "Success is the sum of small efforts, repeated day in and day out",
  "Your limitation—it's only your imagination",
  "Push yourself because no one else is going to do it for you",
  "Great things never come from comfort zones",
  "Dream it. Wish it. Do it",
  "Wake up with determination. Go to bed with satisfaction",
  "It’s a slow process, but quitting won’t speed it up",
  "Success doesn’t just find you. You have to go out and get it",
  "The harder you work for something, the greater you’ll feel when you achieve it",
  "Don’t stop when you’re tired. Stop when you’re done",
  "Wake up. Work hard. Stay humble.",
  "It’s never too late to be what you might have been",
  "The key to success is to focus on goals, not obstacles",
  "Dream it. Believe it. Build it",
  "Life is short. Do what makes you happy",
  "Turn your wounds into wisdom",
  "Failure is the opportunity to begin again more intelligently",
  "You don’t need to be great to start, but you need to start to be great",
  "Hard work beats talent when talent doesn’t work hard",
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
];

const LoadingScreen = () => {
  const [quote, setQuote] = useState(''); // State for random quote
  const [loadingProgress, setLoadingProgress] = useState(0); // Track loading progress
  const [showNextPage, setShowNextPage] = useState(false); // Track transition to next page

  useEffect(() => {
    // Set a random quote on component mount
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);

    // Progress bar simulation
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(loadingInterval);
          return 100;
        }
        return prevProgress + 1; // Increment progress by 1% every 100ms
      });
    }, 49); // Update every 100ms (10 seconds to complete)

    // Transition to next page after loading completes
    const nextPageTimer = setTimeout(() => {
      setShowNextPage(true);
    }, 5000); // 10 seconds delay to show next page

    // Cleanup intervals and timers when component unmounts
    return () => {
      clearInterval(loadingInterval);
      clearTimeout(nextPageTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-black to-gray-900 text-white">
      <div className="text-center">
        {showNextPage ? (
          <div className="transition-all ease-in-out text-2xl font-bold">
            <p>Welcome to the Next Page!</p>
          </div>
        ) : (
          <>
            {/* Dynamic Quote Section */}
            <p className="mb-6 text-xl font-semibold">{quote}</p>

            {/* Progress Bar - Centered */}
            <div className="flex justify-center">
              <div className="relative w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-blue-900 transition-all ease-in-out duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
            <p className="mt-2 text-sm">Loading {loadingProgress}%</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;