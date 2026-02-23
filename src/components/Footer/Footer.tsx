import Link from "next/link";
import styles from "./Footer.module.scss";
import InViewAnim from "./../../utils/InViewAnim/InViewAnim";
import { Icon } from '@/utils/IconLibrary/IconLibrary';

export default function Footer({
  content
}: {
  content?: any;
}) {
  const currentYear = new Date().getFullYear();

  if (!content) {
    return null;
  }
  
  return (
    <InViewAnim>
      <footer className={styles.component} aria-label="Footer">
        <div className={styles.wrapper}>
          <div className={styles.inner}>
            {/* <nav aria-label="Footer Links">
              <ul className={styles.link_wrapper}>
                {!!content &&
                  content.footer_links?.map((item: any, index: number) => (
                    <li key={index}>
                      <Link className={styles.link} href={item.link_url}>
                        {item.link_title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav> */}
            <div className={styles.social_wrapper} aria-label="Social Media Links">
              <Link
                href="https://github.com/PaulRGU2014"
                className={styles.social}
                target="_blank"
                aria-label="GitHub"
              >
                <Icon icon_name="github" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/paulrgu2014/"
                className={styles.social}
                target="_blank"
                aria-label="LinkedIn"
              >
                <Icon icon_name="linkedin" />
              </Link>
              <Link
                href="https://www.facebook.com/krupaul.official/"
                className={styles.social}
                target="_blank"
                aria-label="Facebook"
              >
                <Icon icon_name="facebook" />
              </Link>
              {/* <Link
                href="https://www.instagram.com/krupaul.official"
                className={styles.social}
                target="_blank"
                aria-label="Instagram"
              >
                <Icon icon_name="instagram" />
              </Link> */}
              <Link
                href="https://www.youtube.com/c/PaulsChemistryThailand"
                className={styles.social}
                target="_blank"
                aria-label="YouTube"
              >
                <Icon icon_name="youtube" />
              </Link>
            </div>
            <p tabIndex={0}>© {currentYear} KruPaul.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </InViewAnim>
  );
}
