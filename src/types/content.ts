export type TwoColumnSliderContent = {
  colors: string[];
  title: string;
  body: string;
  image_position: "left" | "right";
  slides: {
    title: string;
    subtitle: string;
    desc: string;
    image: {
      asset: {
        _ref: string;
      };
      alt: string;
    };
  }[];
};

export type TextAndImageContent = {
  theme?: 'light' | 'dark';
  imgPosition?: 'left' | 'right';
  image: {
    asset: {
      _ref: string;
    };
    title: string;
  };
  body: any; // Adjust the type based on your RichText content structure
}