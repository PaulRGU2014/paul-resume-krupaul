import styles from './TextAndImage.module.scss';
import Image from '@/utils/ImageLoader/ImageLoader';
import RichTextUtil from '@/utils/RichText/RichText'
import InViewAnim from '@/utils/InViewAnim/InViewAnim'

interface TextAndImageProps {
  content?: any; // Replace 'any' with the appropriate type
}

export default function TextAndImage({content}: TextAndImageProps) {
  console.log(content);
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