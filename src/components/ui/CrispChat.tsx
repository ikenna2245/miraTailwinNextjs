"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) {
      Crisp.configure(process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID);
      
      // 1. Hide the default bubble
      Crisp.chat.hide(); 
      
      // 2. STOP naming everyone "MIRA Visitor". 
      // Let Crisp assign unique IDs (Visitor #1492) based on their cookies.
      // This ensures you see separate threads for separate people.
    }
  }, []);

  return null;
};