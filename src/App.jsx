import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeaderScene from "./components/HeaderScene";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg) text-(--text)">
      <HeaderScene />
      <Header />
      <main className="flex-1 container mx-auto relative z-10 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}