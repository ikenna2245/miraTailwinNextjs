"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) {
      Crisp.configure(process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID);

      // 1. Immediate Hide (The most reliable initial command)
      try {
        Crisp.chat.hide();
      } catch (e) {
        // Safe fail
      }

      // 2. The Final Check: Use Crisp.on() for a reliable event, 
      // or simply rely on the immediate hide + CSS override.
      // Since the *CSS override* is the most robust fix for the visual flash, 
      // we can remove the problematic listeners entirely. 
    }
  }, []);

  // 3. CSS NUCLEAR OPTION (The only part that truly fixed the mobile takeover)
  return (
    <style jsx global>{`
      /* Force hide the default Crisp button everywhere */
      .crisp-client .cc-tgl {
        display: none !important;
        visibility: hidden !important;
      }
    `}</style>
  );
};