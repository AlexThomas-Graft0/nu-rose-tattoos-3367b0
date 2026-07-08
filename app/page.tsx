import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/hero";
import { TattooGallery } from "@/components/TattooGallery";
import { PiercingGallery } from "@/components/PiercingGallery";
import { TattooRemoval } from "@/components/TattooRemoval";
import { AftercareGuides } from "@/components/AftercareGuides";
import { AboutAndFaq } from "@/components/AboutAndFaq";
import { ContactAndBooking } from "@/components/ContactAndBooking";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\",\"name\":\"Nu Rose Tattoos\",\"description\":\"Tattoo & piercing studio — custom tattoos all styles, body/ear/nose piercing, tattoo removal.\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"7 Clive Street, Caerphilly, CF83 1GE\"},\"url\":\"https://nu-rose-tattoos-3367b0.duckbyte.co\"}" }} />
      <Navbar />
      <section id="hero" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <Hero />
        </Suspense>
      </section>
      <section id="tattoo-gallery" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <TattooGallery />
        </Suspense>
      </section>
      <section id="piercing-gallery" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <PiercingGallery />
        </Suspense>
      </section>
      <section id="tattoo-removal" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <TattooRemoval />
        </Suspense>
      </section>
      <section id="aftercare-guides" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <AftercareGuides />
        </Suspense>
      </section>
      <section id="about-and-faq" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <AboutAndFaq />
        </Suspense>
      </section>
      <section id="contact-and-booking" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <ContactAndBooking />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}
