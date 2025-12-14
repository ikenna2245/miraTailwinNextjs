"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) {
      // 1. Initialize Crisp
      Crisp.configure(process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID);

      // 2. Immediate Hide (JS)
      try {
        Crisp.chat.hide();
      } catch (e) {
        // Silently fail if SDK isn't ready
      }

      // 3. Listener (Zero Performance Cost)
      // This waits passively for the 'loaded' event instead of checking repeatedly
      Crisp.chat.onLoaded(() => {
        Crisp.chat.hide();
      });
    }
  }, []);

  // 4. CSS "Nuclear Option" (Zero JavaScript Overhead)
  // This tells the browser to simply never render the element. 
  // It is instant and does not use CPU cycles like a JS interval does.
  return (
    <style jsx global>{`
      /* Force hide the default Crisp button everywhere */
      .crisp-client .cc-tgl {
        display: none !important;
        visibility: hidden !important;
      }
      
      /* Optional: Also hide the main window unless it's triggered by your code */
      /* Note: Be careful with this one if you open it via JS */
      /* .crisp-client .cc-kv6t {
         display: none !important; 
      } */
    `}</style>
  );
};