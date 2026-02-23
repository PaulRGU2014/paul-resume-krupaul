import styles from './TextAndImage.module.scss';
import Image from '@/utils/ImageLoader/ImageLoader';
import RichTextUtil from '@/utils/RichText/RichText'
import InViewAnim from '@/utils/InViewAnim/InViewAnim'

interface TextAndImageProps {
  content?: {
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
}

export default function TextAndImage({content}: TextAndImageProps) {
  console.log(content);
  if (!content) {
    return null;
  }
  return(
    <InViewAnim><div className={`${styles.component} ${content.theme === 'dark' ? styles.dark : ""} ${content.imgPosition === 'right' ? styles.imgRight : ""}`}>
      <div className={styles.wrapper}>
        {content.image.asset && <Image
          src={content.image.asset._ref}
          alt={content.image.title}
          className={styles.image}
          objectFit='contain'
        />}
        <section className={styles.text}>
          <RichTextUtil  html={content.body} className={styles.richtext}/>
        </section>
      </div>
    </div></InViewAnim>
  );
}