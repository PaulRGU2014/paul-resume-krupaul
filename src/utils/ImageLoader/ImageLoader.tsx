import Image from "next/image";
import React from "react";

interface ImageLoaderProps extends React.HTMLProps<HTMLDivElement> {
  className: string;
  style?: object;
  objectFit?: string;
  objectPosition?: string;
  priority?: boolean;
  src: string;
  alt: string;
  // onLoad for consumers who want the native image load event
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const ImageLoader = React.forwardRef<HTMLImageElement, ImageLoaderProps>(
  ({ className, style, src, alt, objectFit = "cover", objectPosition, priority, onClick, onLoad, ...rest }, ref) => {
    if (!src) {
      return null;
    }

    return (
      <div
        className={className}
        style={style}
        onClick={onClick}
        {...rest}
      >
        <Image
          src={src}
          alt={alt ? alt : "image"}
          fill={true}
          sizes="100%"
          style={{
            objectFit: objectFit as React.CSSProperties['objectFit'],
            objectPosition: objectPosition as React.CSSProperties['objectPosition']
          }}
          priority={priority ? priority : false}
          // forward ref to the underlying <img> element so parents can measure it
          ref={ref as any}
          // forward onLoad to the underlying image element
          onLoad={onLoad}
        />
      </div>
    );
  }
);

ImageLoader.displayName = 'ImageLoader';

export default ImageLoader;
