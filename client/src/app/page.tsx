'use client'
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { Footer } from "../components/Footer/Footer";

export default function Home() {
  return (
    <div style={{ maxHeight: "100%",  minHeight: "100%", overflowY: "hidden" }}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}