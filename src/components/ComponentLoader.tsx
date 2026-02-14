//importHere
	import SubscriptionForm from './SubscriptionForm/SubscriptionForm';
	import TextAndImage from './TextAndImage/TextAndImage';
	import TwoColumnSlider from './TwoColumnSlider/TwoColumnSlider';
	import TextTwoImages from './TextTwoImages/TextTwoImages';
	import TextImageButton from './TextImageButton/TextImageButton';
	import RichTextComp from './RichTextComp/RichTextComp';
	import HeroBannerImg from './HeroBannerImg/HeroBannerImg';
	import GridLinksCarousel from './GridLinksCarousel/GridLinksCarousel';
	import FullPageZoom from './FullPageZoom/FullPageZoom';
	import FullPageHero from './FullPageHero/FullPageHero';
	import CtasCarousel from './CtasCarousel/CtasCarousel';
	import CtaTitleImg from './CtaTitleImg/CtaTitleImg';
import Hero from "./Hero/Hero";
import Footer from "./Footer/Footer";
import Resume from "./Resume/Resume";
import GalleryCollage from "./GalleryCollage/GalleryCollage";
import ContactForm from "./ContactForm/ContactForm";
import HomePageAnim from "./HomePageAnim/HomePageAnim";

const hardcodedComponents = {
  //hardCodedHere
	subscriptionForm: SubscriptionForm,
  contactForm: ContactForm,
  homePageAnim: HomePageAnim,
};

function HardcodedComponent({ block_title, ...props }: { block_title: string, [key: string]: any }) {
  const cleanBlockTitle = block_title ? block_title.replace(/[^a-zA-Z0-9]/g, '') : '';
  const Component = hardcodedComponents[cleanBlockTitle as keyof typeof hardcodedComponents];
  if (!Component) {
    return <div>Component not found</div>;
  }
  return <Component {...props} />
}

const componentMap: { [key: string]: React.ComponentType<any> } = {
  //associateHere
	textAndImage: TextAndImage,
	twoColumnSlider: TwoColumnSlider,
	textTwoImages: TextTwoImages,
	textImageButton: TextImageButton,
	richTextComp: RichTextComp,
	heroBannerImg: HeroBannerImg,
	gridLinksCarousel: GridLinksCarousel,
	fullPageZoom: FullPageZoom,
	fullPageHero: FullPageHero,
	ctasCarousel: CtasCarousel,
	ctaTitleImg: CtaTitleImg,
  hero: Hero,
  footer: Footer,
  resume: Resume,
  galleryCollage: GalleryCollage,
  hardcodedBlocks: HardcodedComponent, // Add HardcodedComponent to the componentMap
};

export default function ComponentLoader({ components }: { components: any }) {
  if (!components) {
    return null;
  }

  // console.log(components);

  return (
    <>
      {components.map((component: any, index: number) => {
        const Component = componentMap[component._type];
        if (!Component) {
          return <div key={index}>Component not found</div>;
        }
        const componentContent = components.find(
          (d: any) => d._type === component._type && d._id === component._id
        ); // Match data with component by type

        // Check if the component is a hardcoded component
        if (component._type === "hardcodedBlocks") {
          return (
            <HardcodedComponent
              key={index}
              block_title={component.block_title}
              {...component}
            />
          );
        }

        return (
          <Component
            key={component._id || `${component._type}-${index}`}
            {...component}
            content={componentContent}
          />
        );
      })}
    </>
  );
}