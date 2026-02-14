"use client";

import { useEffect, useRef } from "react";
import Player from "@vimeo/player";

interface VimeoPlayerClientProps {
  videoId: string;
}

export default function VimeoPlayerClient({ videoId }: VimeoPlayerClientProps) {
  const enhancedRef = useRef<boolean>(false);

  useEffect(() => {
    if (enhancedRef.current) return;

    const timer = setTimeout(() => {
      // Find the iframe in the parent container
      const container = document.querySelector(`iframe[src*="${videoId}"]`)?.parentElement;
      const iframe = container?.querySelector('iframe');
      
      if (!iframe || !container) {
        console.warn('Could not find iframe to enhance for video', videoId);
        return;
      }

      try {
        // Mark as enhanced to prevent duplicate initialization
        enhancedRef.current = true;
        
        // Initialize Vimeo Player on the existing iframe
        const player = new Player(iframe);
        
        // Handle player events
        player.on('loaded', () => {
          console.log('Vimeo player enhanced for video', videoId);
        });

        player.on('error', (error: any) => {
          console.error('Vimeo player error for video', videoId, ':', error);
        });

        // Store player reference for cleanup
        (iframe as any)._vimeoPlayer = player;

      } catch (error) {
        console.warn('Failed to enhance Vimeo player for video', videoId, ':', error);
        enhancedRef.current = false;
      }
    }, 100); // Small delay to ensure iframe is rendered

    return () => {
      clearTimeout(timer);
      // Cleanup is handled by the iframe's _vimeoPlayer reference
    };
  }, [videoId]);

  // This component doesn't render anything - it just enhances the existing iframe
  return null;
}