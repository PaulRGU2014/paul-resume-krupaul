import React, { useState } from "react";
import Link from "@/utils/LinkWrapper/LinkWrapper";
import Image from "next/image";
import { BsChevronCompactDown, BsCart3 } from "react-icons/bs";
import styles from "./MenuDesktop.module.scss"; // Adjust the path as needed
// import { useCart } from '@/utils/CartContext/CartContext';

interface MenuDesktopProps {
  content: any;
  isVisible: boolean;
  mainMenuIndex: number;
  setMainMenuIndex: (index: number) => void;
  subMenuIndex: number;
  setSubMenuIndex: React.Dispatch<React.SetStateAction<number>>;
  handleMenuClick: (
    event: React.MouseEvent | React.KeyboardEvent,
    mainIndex: number,
    subIndex: number,
    url: string,
    hasSubMenus: boolean
  ) => void;
}

const MenuDesktop: React.FC<MenuDesktopProps> = ({
  content,
  isVisible,
  mainMenuIndex,
  setMainMenuIndex,
  subMenuIndex,
  setSubMenuIndex,
  handleMenuClick,
}) => {
  const handleKeyDown = (
    event: React.KeyboardEvent,
    index: number,
    subIndex: number,
    hasSubMenus: boolean
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (hasSubMenus) {
        setMainMenuIndex(index);
        setSubMenuIndex(subIndex);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setMainMenuIndex(-1);
      setSubMenuIndex(-1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (hasSubMenus) {
        setMainMenuIndex(index);
        setSubMenuIndex(subIndex);
      } else {
        const linkElement = event.currentTarget.querySelector("a");
        if (linkElement) {
          linkElement.click();
        }
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
              onMouseEnter={() => setMainMenuIndex(index)}
              onMouseLeave={() => setMainMenuIndex(-1)}
              style={{
                animationDelay: `${index * 150 + 500}ms`,
                zIndex: 1000 - index,
              }}
              onKeyDown={(event) =>
                handleKeyDown(event, index, -1, !!menu.sub_menus_1)
              }
              aria-hidden={
                menu.sub_menus_1 && menu.sub_menus_1.length > 0 ? "false" : "true"
              }
              aria-expanded={mainMenuIndex === index ? "true" : "false"}
              aria-controls={`submenu-${index}`}
              role="menuitem"
            >
              <Link
                href={menu?.link?.url}
                target={menu?.link?.is_external === true ? "_blank" : "_self"}
                className={styles.menuLink_link}
                onClick={
                  (event) =>
                    handleMenuClick(
                      event,
                      index,
                      -1,
                      menu.url,
                      !!menu.sub_menus_1
                    ) // Adjust the arguments as needed
                }
                tabIndex={0}
                aria-label={menu.title}
              >
                {menu.title}
                {menu.sub_menus_1 && menu.sub_menus_1.length > 0 && (
                  <div
                    className={`${styles.dropdown} ${mainMenuIndex === index ? styles.active : ""}`}
                  >
                    <BsChevronCompactDown />
                  </div>
                )}
              </Link>
              {menu?.sub_menus_1 && (
                <ul
                  id={`submenu-${index}`}
                  className={`${styles.subMenu_wrapper}  ${mainMenuIndex === index ? styles.active : ""}`}
                  style={{
                    height: menu.sub_menus_1.length * 40 + "px",
                  }}
                  role="menu"
                >
                  {menu?.sub_menus_1?.map(
                    (subMenus1: any, subIndex: number) => (
                      <li
                        key={subIndex}
                        className={`${styles.subMenu}`}
                        onMouseEnter={() => setSubMenuIndex(subIndex)}
                        onMouseLeave={() => setSubMenuIndex(-1)}
                        onClick={() => setSubMenuIndex(subIndex)}
                        style={{
                          zIndex: 5000 - subIndex,
                        }}
                        aria-hidden={
                          subMenus1.sub_menus_2 &&
                          subMenus1.sub_menus_2.length > 0
                            ? "false"
                            : "true"
                        }
                        aria-expanded={subMenuIndex === subIndex ? "true" : "false"}
                        aria-controls={`submenu2-${index}-${subIndex}`}
                        role="menuitem"
                        onKeyDown={(event) =>
                          handleKeyDown(
                            event,
                            index,
                            subIndex,
                            !!subMenus1.sub_menus_2
                          )
                        }
                      >
                        <Link
                          href={subMenus1?.link?.url}
                          target={
                            subMenus1?.link?.is_external === true
                              ? "_blank"
                              : "_self"
                          }
                          className={styles.subMenu_link}
                          // onClick={(event) =>
                          //   handleMenuClick(
                          //     event,
                          //     index,
                          //     subIndex,
                          //     subMenus1.url,
                          //     !!subMenus1.sub_menus_2
                          //   )
                          // }
                          tabIndex={0}
                          aria-label={subMenus1.title}
                        >
                          {subMenus1.title}
                          {subMenus1.sub_menus_2 &&
                            subMenus1.sub_menus_2.length > 0 && (
                              <div
                                className={`${styles.dropdown} ${subMenuIndex === subIndex ? styles.active : ""}`}
                              >
                                <BsChevronCompactDown />
                              </div>
                            )}
                        </Link>
                        {subMenus1?.sub_menus_2 && (
                          <ul
                            id={`submenu2-${index}-${subIndex}`}
                            className={`${styles.subMenu2_wrapper} ${subMenuIndex === subIndex ? styles.active : ""}`}
                            style={{
                              height: subMenus1.sub_menus_2.length * 40 + "px",
                            }}
                            role="menu"
                          >
                            {subMenus1?.sub_menus_2?.map(
                              (subMenus2: any, subIndex2: number) => (
                                <li
                                  key={subIndex2}
                                  className={styles.subMenu}
                                  onKeyDown={(event) =>
                                    handleKeyDown(
                                      event,
                                      index,
                                      subIndex2,
                                      false
                                    )
                                  }
                                  role="menuitem"
                                >
                                  <Link
                                    href={subMenus2?.link?.url}
                                    target={
                                      subMenus2?.link?.is_external === true
                                        ? "_blank"
                                        : "_self"
                                    }
                                    className={styles.subMenu_link}
                                    tabIndex={0}
                                  >
                                    {subMenus2.title}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className={styles.features}>
          <Link
            className={styles.menuButton}
            href={content?.menu_btn?.btn_url}
            target={
              content?.menu_btn?.is_external === true ? "_blank" : "_self"
            }
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
