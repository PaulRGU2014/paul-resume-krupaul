import styles from './RichText.module.scss';

interface RichTextProps {
  children?: React.ReactNode;
  html: any;
  className?: string;
  [key: string]: any;
}

export default function RichText({ children, html, className = "", ...props }: RichTextProps) {
  // console.log(html);
  if (html) {
    return (
      <div className={`${styles.component} ${className}`} {...props} tabIndex={0}>
        <div dangerouslySetInnerHTML={{ __html: html }} className={`${styles.richtext} ${className}`} />
      </div>
    );
  } else {
    return (
      <div className={`${styles.component} ${className}`} {...props} tabIndex={0}>
        {children}
      </div>
    );
  }
}