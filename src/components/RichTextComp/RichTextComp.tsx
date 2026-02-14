import styles from './RichTextComp.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import RichTextUtil from './../../utils/RichText/RichText'

interface RichTextCompProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function RichTextComp({content}: RichTextCompProps) {

  return(
    <InViewAnim>
      <div className={`${styles.component} ${content.theme === 'dark' ? styles.dark : ""} ${styles[content.text_align]} ${content.isFullHeight===true ? styles.fullHeight : ""}`}>
        <div className={styles.wrapper}>
          { !!content.maxWidth ? 
            <div style={{maxWidth : `${content.maxWidth}px`, margin : '0 auto'}}>
              <RichTextUtil  html={content.content} className={`${styles.richtext}`}/>
            </div>
            :
            <div style={{maxWidth : 'unset'}}>
              <RichTextUtil  html={content.content} className={`${styles.richtext} ${content.text_align ? styles.textAlign : styles.left}`}/>
            </div>
          }
        </div>
      </div>
    </InViewAnim>
  );
}