import styles from "./MenuMobile.module.scss";
import Link from "@/utils/LinkWrapper/LinkWrapper";
import Image from "next/image";

function Hamburger({
  isMenuOpen,
  hamburgerRef,
  onClick,
  initialLoad,
}: {
  isMenuOpen: boolean;
  hamburgerRef: React.RefObject<HTMLDivElement | null>;
  onClick?: () => void;
  initialLoad: boolean;
}) {
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
  menuRef: React.RefObject<HTMLUListElement | null>;
  handleMenuClick: (
    event: React.MouseEvent,
    url?: string,
    closeMenu?: boolean
  ) => void;
  initialLoad: boolean;
  setInitialLoad: React.Dispatch<React.SetStateAction<boolean>>;
  hamburgerRef: React.RefObject<HTMLDivElement | null>;
  handleMenuToggle: () => void;
}

function MenuContent({
  content,
  isMenuOpen,
  setIsMenuOpen,
  isMenuOpening,
  menuRef,
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
            style={{
              transitionDelay: isMenuOpening ? `${(index + 1) * 100}ms` : "0ms",
            }}
          >
            <Link
              href={item.link.url}
              onClick={(event) =>
                handleMenuClick(
                  event,
                  item?.link?.url,
                  true
                )
              }
            >
              {item.title}
            </Link>
          </li>
        ))}
        <li
          className={styles.menuButton_wrapper}
          style={{
            transitionDelay: isMenuOpening
              ? `${(content.menu_list?.length + 4) * 100}ms`
              : "0ms",
            transform: isMenuOpen ? "translateY(0px)" : "translateY(20px)",
            opacity: isMenuOpen ? 1 : 0,
          }}
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <Link
            className={styles.menuButton}
            href={content?.menu_btn?.btn_url}
            target={content?.menu_btn?.is_external === true ? "_blank" : "_self"}
          >
            {content?.menu_btn?.btn_text}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default function MenuMobile({
  content,
  handleMenuClick,
  isMenuOpen,
  setIsMenuOpen,
  isMenuOpening,
  initialLoad,
  setInitialLoad,
  hamburgerRef,
  menuRef,
  handleMenuToggle,
}: MenuMobileProps) {
  return (
    <div className={`${styles.component} ${!isMenuOpen ? styles.component_close : ""}`}>
      <div className={`${styles.wrapper} ${isMenuOpen ? styles.open : ""}`}>
        <Hamburger
          isMenuOpen={isMenuOpen}
          hamburgerRef={hamburgerRef}
          onClick={handleMenuToggle}
          initialLoad={initialLoad}
        />
        <MenuContent
          {...{
            content,
            isMenuOpen,
            setIsMenuOpen,
            isMenuOpening,
            menuRef,
            handleMenuClick,
            initialLoad,
            setInitialLoad,
            hamburgerRef,
            handleMenuToggle,
          }}
        />
      </div>
    </div>
  );
}
