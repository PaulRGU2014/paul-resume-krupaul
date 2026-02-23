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
