import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const animations = [
      "animate-tsundere-shake",
      "animate-tsundere-bounce",
      "animate-tsundere-spin",
      "animate-tsundere-blush"
    ];

    const elementSelectors = "p, h1, h2, h3, a, img, button, li, span";

    const triggerRandomEvent = () => {
      const elements = document.querySelectorAll(elementSelectors);
      if (elements.length === 0) return;

      // Pick a random element
      const randomElementIndex = Math.floor(Math.random() * elements.length);
      const element = elements[randomElementIndex];

      // Pick a random animation
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

      // Apply animation class
      element.classList.add(randomAnimation);

      // Remove class after animation finishes (assuming max 1s duration)
      setTimeout(() => {
        element.classList.remove(randomAnimation);
      }, 1000);
    };

    // Trigger an event every 2 to 5 seconds
    const intervalId = setInterval(() => {
      triggerRandomEvent();
    }, Math.random() * 3000 + 2000); // Between 2000ms and 5000ms

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-(--bg) text-(--text)">
      <Header />

      <main className="flex-1 container mx-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}