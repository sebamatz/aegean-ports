"use client";

import { useState, useEffect } from "react";
// Removed MessageCircle import
import { client, contactQuery } from "@/lib/sanity";

export default function FloatingWhatsApp() {
  const [whatsappNumber, setWhatsappNumber] = useState("306955736505");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchNumber = async () => {
      if (!client) return; // Skip if Sanity is not configured
      try {
        const data = await client.fetch(contactQuery);
        const waObj = data.find(
          (item: any) =>
            item.numberType === "whatsappBot" ||
            item.title?.toLowerCase().includes("whatsapp")
        );
        if (waObj?.phoneNumber) {
          setWhatsappNumber(waObj.phoneNumber.replace(/[^0-9]/g, ""));
        }
      } catch (error) {
        console.error("Sanity fetch error:", error);
      }
    };

    fetchNumber();

    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const WHATSAPP_LINK = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="nofollow noreferrer"
      className={`
        fixed bottom-6 right-6 z-9999
        flex items-center justify-center
        w-14 h-14 md:w-16 md:h-16
        bg-[#25D366] text-white
        rounded-full shadow-2xl
        transition-all duration-500 transform
        hover:scale-110 hover:bg-[#20bd5a] active:scale-95
        ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }
      `}
      aria-label="Chat on WhatsApp"
    >
      {/* Pinging Effect - Root color #25D366 */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

      {/* Official WhatsApp Icon from /public */}
      <img
        src="/images/whatsapp.svg"
        alt="WhatsApp"
        className="w-8 h-8 md:w-9 md:h-9 object-contain relative z-10"
      />

      {/* Yellow Badge Block Removed */}
    </a>
  );
}
