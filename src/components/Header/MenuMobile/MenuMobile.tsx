import styles from './MenuMobile.module.scss';
import Link from '@/utils/LinkWrapper/LinkWrapper';
import Image from 'next/image';
import { BsChevronCompactDown } from 'react-icons/bs';

function Hamburger({ isMenuOpen, hamburgerRef, onClick, initialLoad }: { isMenuOpen: boolean, hamburgerRef: React.RefObject<HTMLDivElement>, onClick?: () => void, initialLoad: boolean }) {
  return (
    <div
      ref={hamburgerRef}
      className={`${styles.hamburger_wrapper} ${isMenuOpen ? styles.open : ""} ${initialLoad ? styles.initialLoad : ""}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <div className={styles.hamburger_first} />
      <div className={styles.hamburger_second} />
      <div className={styles.hamburger_third} />
    </div>
  );
}

interface MenuMobileProps {
  content: any;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpening: boolean;
  menuRef: React.RefObject<HTMLUListElement>;
  mainMenuIndex: number;
  setMainMenuIndex: (index: number) => void;
  subMenuIndex: number;
  setSubMenuIndex: React.Dispatch<React.SetStateAction<number>>;
  handleMenuClick: (event: React.MouseEvent, mainIndex: number, subIndex: number, url: string, hasSubMenus: boolean) => void;
  initialLoad: boolean;
  setInitialLoad: React.Dispatch<React.SetStateAction<boolean>>;
  hamburgerRef: React.RefObject<HTMLDivElement>;
  handleMenuToggle: () => void;
}

function MenuContent({
  content,
  isMenuOpen,
  setIsMenuOpen,
  isMenuOpening,
  menuRef,
  mainMenuIndex,
  setMainMenuIndex,
  subMenuIndex,
  setSubMenuIndex,
  handleMenuClick,
}: MenuMobileProps) {

  return (
    <div className={isMenuOpen ? styles.inner : styles.inner_close}>
      <ul className={styles.content} ref={menuRef}>
        <Link href="/" className={styles.logo_main}>
          <Image
            src="/Logo_LT_BW.svg"
            alt="Logo"
            width={250}
            height={175}
            priority={true}
            style={{ objectPosition: "center" }}
          />
        </Link>
        {content?.menu_list?.map((item: any, index: number) => (
          <li
            className={`${styles.link} ${isMenuOpen === true ? styles.open : ""}`}
            key={index}
            style={{ transitionDelay: isMenuOpening ? `${(index + 1) * 100}ms` : "0ms" }}
            onMouseEnter={() => setMainMenuIndex(index)}
            onMouseLeave={() => setMainMenuIndex(-1)}
          >
            <Link
              href={item.link.url}
              onClick={(event) => handleMenuClick(event, index, -1, item.url, !!item.sub_menus_1)}
            >
              {item.title}{item.sub_menus_1 && item.sub_menus_1.length > 0 && <div className={`${styles.dropdown} ${mainMenuIndex === index ? styles.active : ''}`}><BsChevronCompactDown /></div>}
            </Link>
            {item?.sub_menus_1 && (
              <ul className={`${styles.subMenu_wrapper} ${mainMenuIndex === index ? styles.active : ''}`}>
                {item?.sub_menus_1?.map((subMenus1: any, subIndex: number) => (
                  <li 
                    key={subIndex} 
                    className={`${styles.subMenu}`}
                    onMouseEnter={() => setSubMenuIndex(subIndex)}
                    onMouseLeave={() => setSubMenuIndex(-1)}
                    onClick={() => setSubMenuIndex(subIndex)}
                  >
                    <Link 
                      href={subMenus1?.link?.url} 
                      className={styles.subMenu_link}
                      onClick={(event) => handleMenuClick(event, index, subIndex, subMenus1.url, !!subMenus1.sub_menus_2)}
                    >
                      {subMenus1.title}
                      {subMenus1.sub_menus_2 && subMenus1.sub_menus_2.length > 0 && <div className={`${styles.dropdown} ${subMenuIndex === subIndex ? styles.active : ''}`}><BsChevronCompactDown /></div>}
                    </Link>
                    {subMenus1?.sub_menus_2 && (
                      <ul className={`${styles.subMenu_wrapper} ${subMenuIndex === subIndex ? styles.active : ''}`}>
                        {subMenus1?.sub_menus_2?.map((subMenus2: any, subIndex2: number) => (
                          <li 
                            key={subIndex2} 
                            className={styles.subMenu}
                          >
                            <Link 
                              href={subMenus2.link.url} 
                              className={styles.subMenu_link}
                            >
                              {subMenus2.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <li
          className={styles.menuButton_wrapper}
          style={{
            transitionDelay: isMenuOpening ? `${(content.menu_list?.length + 4) * 100}ms` : "0ms",
            transform: isMenuOpen ? "translateY(0px)" : "translateY(20px)",
            opacity: isMenuOpen ? 1 : 0
          }}
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <Link className={styles.menuButton} href={content?.menu_btn?.btn_url} target={content?.menu_btn?.is_external === true ? "_blank" : "_self"}>{content?.menu_btn?.btn_text}</Link>
        </li>
      </ul>
    </div>
  );
}

export default function MenuMobile({ 
  content,  
  mainMenuIndex, 
  setMainMenuIndex, 
  subMenuIndex, 
  setSubMenuIndex, 
  handleMenuClick,
  isMenuOpen,
  setIsMenuOpen,
  isMenuOpening,
  initialLoad,
  setInitialLoad,
  hamburgerRef,
  menuRef,
  handleMenuToggle
 }: MenuMobileProps) {


  return (
    <div
      className={`${styles.component} ${!isMenuOpen ? styles.component_close : ""}`}
    >
      <div
        className={`${styles.wrapper} ${isMenuOpen ? styles.open : ""}`}
      >
        <Hamburger isMenuOpen={isMenuOpen} hamburgerRef={hamburgerRef} onClick={handleMenuToggle} initialLoad={initialLoad} />
        <MenuContent {...{ content, isMenuOpen, setIsMenuOpen, isMenuOpening, menuRef, mainMenuIndex, setMainMenuIndex, subMenuIndex, setSubMenuIndex, handleMenuClick, initialLoad, setInitialLoad, hamburgerRef, handleMenuToggle }} />
      </div>
    </div>
  );
}