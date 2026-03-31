"use client";  // Add this line at the top

import React, { useEffect, useState } from 'react';
import Loading from '../components/loading';

export default function Programming() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay (e.g., 2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);  // Stop loading after 2 seconds
    }, 5000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  // Scroll to the top when loading is complete
  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);  // Scroll to the top of the page
    }
  }, [isLoading]); // Run this effect when isLoading changes

  // Render the loading component if still loading
  if (isLoading) {
    return <Loading />;
  }

  // Return the programming content when loading is finished
  return (
    <div>
     <footer className="flex justify-center items-center text-white py-4 text-sm">
        <p>&copy; 2024 TechTreck</p>
      </footer>
    </div>
  );
}
