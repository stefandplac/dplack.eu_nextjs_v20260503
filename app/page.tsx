'use client'

import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
} 