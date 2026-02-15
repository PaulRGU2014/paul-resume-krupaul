import React from "react";
import Link from "@/utils/LinkWrapper/LinkWrapper";
import Image from "next/image";
import styles from "./MenuDesktop.module.scss";

interface MenuDesktopProps {
  content: any;
  isVisible: boolean;
  handleMenuClick: (
    event: React.MouseEvent | React.KeyboardEvent,
    url?: string
  ) => void;
}

const MenuDesktop: React.FC<MenuDesktopProps> = ({
  content,
  isVisible,
  handleMenuClick,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const linkElement = event.currentTarget.querySelector("a");
      if (linkElement) {
        linkElement.click();
      }
    }
  };

  return (
    <header
      className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logo_main} tabIndex={0}>
            <Image
              src="/Logo_LT_BW.svg"
              alt="Logo"
              width={120}
              height={80}
              priority={true}
              style={{ objectPosition: "center" }}
            />
          </Link>
        </div>
        <ul className={styles.menuLink_wrapper} role="menu">
          {content?.menu_list?.map((menu: any, index: number) => (
            <li
              className={styles.menuLink}
              key={index}
              style={{
                animationDelay: `${index * 150 + 500}ms`,
                zIndex: 1000 - index,
              }}
              onKeyDown={handleKeyDown}
              role="menuitem"
            >
              <Link
                href={menu?.link?.url}
                target={menu?.link?.is_external === true ? "_blank" : "_self"}
                className={styles.menuLink_link}
                onClick={(event) => handleMenuClick(event, menu?.link?.url)}
                tabIndex={0}
                aria-label={menu.title}
              >
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.features}>
          <Link
            className={styles.menuButton}
            href={content?.menu_btn?.btn_url}
            target={content?.menu_btn?.is_external === true ? "_blank" : "_self"}
            style={{
              animationDelay: `${content?.menu_list?.length * 150 + 750}ms`,
            }}
            tabIndex={0}
          >
            {content?.menu_btn?.btn_text}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MenuDesktop;
