"use client"

import styles from './CtasCarousel.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import Link from '@/utils/LinkWrapper/LinkWrapper';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RichTextUtil from '@/utils/RichText/RichText'

interface CtasCarouselProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function CtasCarousel({content}: CtasCarouselProps) {
  const settings = {
    className: styles.carousel,
    dots: false,
    arrows: false,
    infinite: content.ctas.length > 3 ? true : false,
    speed: 750,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          infinite: content.ctas.length > 2 ? true : false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          infinite: content.ctas.length > 1 ? true : false,
        }
      }
    ]
  };

  return(
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        <h3>{content.title}</h3>
        <div className={styles.cta_wrapper}>
          <Slider {...settings}>
            {content.ctas.map((cta: any, index: number) => {
              return (
                <div key={index} className={styles.cta}>
                  <h5>{cta.title}</h5>
                  {!!cta.subtitle && <div className={styles.cta_eyebrow}>{cta.subtitle}</div>}
                  {!!cta.date && <div className={styles.cta_eyebrow}>{cta.date}</div>}
                  {!!cta.body && <RichTextUtil html={cta.body} className={`${styles.cta_content}`}/>}
                  {!!cta?.link?.title && <Link className={styles.cta_link} href={cta.link.url} target={cta.link.newTab === false ? "_self" : "_blank"}>{cta.link.title}</Link>}
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </div></InViewAnim>
  );
}