"use client";

import { sendGAEvent } from '@next/third-parties/google';

export const useAnalytics = () => {
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    try {
      sendGAEvent('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });

      // Log in dev mode so you know it works
      if (process.env.NODE_ENV === 'development') {
        console.log(`[GA] ${action} | ${category} | ${label}`);
      }
    } catch (error) {
      console.error("Analytics Error:", error);
    }
  };

  return { trackEvent };
};