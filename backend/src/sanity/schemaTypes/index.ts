
import { type SchemaTypeDefinition } from 'sanity'
//importHere
	import { textAndImage } from '../../components/TextAndImage/textAndImage.schema';
	import { twoColumnSlider } from '../../components/TwoColumnSlider/twoColumnSlider.schema';
	import { textTwoImages } from '../../components/TextTwoImages/textTwoImages.schema';
	import { textImageButton } from '../../components/TextImageButton/textImageButton.schema';
	import { richTextComp } from '../../components/RichTextComp/richTextComp.schema';
	import { heroBannerImg } from '../../components/HeroBannerImg/heroBannerImg.schema';
	import { gridLinksCarousel } from '../../components/GridLinksCarousel/gridLinksCarousel.schema';
	import { fullPageZoom } from '../../components/FullPageZoom/fullPageZoom.schema';
	import { fullPageHero } from '../../components/FullPageHero/fullPageHero.schema';
	import { ctasCarousel } from '../../components/CtasCarousel/ctasCarousel.schema';
	import { ctaTitleImg } from '../../components/CtaTitleImg/ctaTitleImg.schema';
import {galleryCollage} from '../../components/GalleryCollage/galleryCollage.schema'
import {pages} from './pages'
import {footer} from '../../components/Footer/footer.schema'
import {hero} from '../../components/Hero/hero.schema'
import {resume} from '../../components/Resume/resume.schema'
import {header} from '../../components/Header/header.schema'
import {hardcodedBlocks} from './hardcodedBlocks'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //associateHere
textAndImage,
twoColumnSlider,
textTwoImages,
textImageButton,
richTextComp,
heroBannerImg,
gridLinksCarousel,
fullPageZoom,
fullPageHero,
ctasCarousel,
ctaTitleImg,
    hardcodedBlocks,
     footer, 
     header, 
     hero, 
     pages, 
     galleryCollage, 
     resume,
    ],
}
