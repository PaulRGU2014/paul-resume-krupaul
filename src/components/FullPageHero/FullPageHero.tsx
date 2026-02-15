"use client";

import styles from "./FullPageHero.module.scss";
import InViewAnim from "./../../utils/InViewAnim/InViewAnim";
import Image from "@/utils/ImageLoader/ImageLoader";
import dynamic from "next/dynamic";

// Dynamic import of the enhanced video player (client-side only)
const VimeoPlayerClient = dynamic(() => import('./VimeoPlayerClient'), {
  loading: () => null
});

interface FullPageHeroProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function FullPageHero({ content }: FullPageHeroProps) {

  return (
    <InViewAnim>
      <div
        className={`${styles.component} ${styles[content.gradient]} ${styles[content.text_align]} ${content.is_full_height === false ? styles.halfHeight : ""}`}
      >
        <div className={styles.media} aria-label="Media Content">
          {/* Clean string values to handle Unicode characters */}
          {(() => {
            const cleanMediaSource = content.media_source?.replace(/[^\w]/g, '') || '';
            const cleanMediaType = content.media_type?.replace(/[^\w]/g, '') || '';
            const cleanVdoID = content.vdoID?.replace(/[^\d]/g, '') || '';
            const cleanMediaUrl = content.media_url?.replace(/[^\w:\/.-]/g, '') || '';
          
            
            // Handle based on media_source field
            switch (cleanMediaSource) {
              case 'file':
                // Show image from file upload
                if (content.image?.asset) {
                  return (
                    <Image
                      src={content.image.asset._ref}
                      alt={content.title}
                      className={styles.image}
                      priority={true}
                    />
                  );
                }
                break;
                
              case 'vdoID':
                // Show video using video ID
                if (cleanVdoID) {
                  return <ServerVideoPlayer videoId={cleanVdoID} />;
                }
                break;
                
              case 'url':
                // Show content from URL based on media_type
                if (cleanMediaUrl) {
                  if (cleanMediaType === 'video') {
                    return <ServerVideoPlayer videoId={cleanMediaUrl} />;
                  } else if (cleanMediaType === 'image') {
                    return (
                      <Image
                        src={cleanMediaUrl}
                        alt={content.title}
                        className={styles.image}
                        priority={true}
                      />
                    );
                  }
                }
                break;
                
              default:
                console.warn('Unknown media_source:', cleanMediaSource);
                break;
            }
            
            return null;
          })()}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h2 tabIndex={0}>{content.title}</h2>
            <h5 tabIndex={0}>{content.subtitle}</h5>
          </div>
        </div>
      </div>
    </InViewAnim>
  );
}

// SSR-compatible video player component
function ServerVideoPlayer({ videoId }: { videoId: string }) {
  // Extract video ID from various Vimeo URL formats
  const extractVideoId = (id: string) => {
    if (!id) return '';
    
    // Handle various Vimeo URL formats
    if (id.includes('vimeo.com')) {
      // Handle manage URLs like https://vimeo.com/manage/videos/1096796987
      const manageMatch = id.match(/vimeo\.com\/manage\/videos\/(\d+)/);
      if (manageMatch) return manageMatch[1];
      
      // Handle regular URLs like https://vimeo.com/1096796987
      const regularMatch = id.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
      if (regularMatch) return regularMatch[1];
    }
    
    // Return as-is if it's already just the ID
    return id.replace(/[^0-9]/g, '');
  };

  const cleanVideoId = extractVideoId(videoId);
  
  if (!cleanVideoId) {
    console.error('Invalid video ID provided:', videoId);
    return (
      <div className={styles.reactPlayer} style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f0f0',
        color: '#666'
      }}>
        Invalid video ID
      </div>
    );
  }

  const videoUrl = `https://player.vimeo.com/video/${cleanVideoId}`;
  const thumbnailUrl = `https://vumbnail.com/${cleanVideoId}.jpg`;

  return (
    <div
      className={styles.reactPlayer}
      style={{
        backgroundImage: `url(${thumbnailUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
      }}
      aria-label="Video Player"
    >
      {/* Server-side rendered iframe for immediate functionality */}
      <iframe
        src={`${videoUrl}?autoplay=1&loop=1&muted=1&background=1&controls=0&byline=0&title=0&portrait=0&playsinline=1`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Vimeo Video Player"
      />
      
      {/* Client-side enhancement (only loads on client) */}
      <VimeoPlayerClient videoId={cleanVideoId} />
    </div>
  );
}