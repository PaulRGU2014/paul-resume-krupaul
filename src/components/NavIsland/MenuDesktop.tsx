import React from "react";
import Link from "@/utils/LinkWrapper/LinkWrapper";
import styles from "./MenuDesktop.module.scss";

interface MenuDesktopProps {
  content: any;
  isVisible: boolean;
  isExpanded: boolean;
  onExpand: () => void;
  onInteract: () => void;
  onCollapse: () => void;
  onNavigate: (url: string) => void;
  headerRef: React.RefObject<HTMLElement | null>;
}

const MenuDesktop: React.FC<MenuDesktopProps> = ({
  content,
  isVisible,
  isExpanded,
  onExpand,
  onInteract,
  onCollapse,
  onNavigate,
  headerRef,
}): React.ReactElement => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    url: string,
    isExternal?: boolean
  ) => {
    if (isExternal) return;
    event.preventDefault();
    onNavigate(url);
  };

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}
      data-header="site"
    >
      <div className={styles.wrapper}>
        <div
          className={`${styles.island} ${isExpanded ? styles.expanded : styles.collapsed}`}
          onMouseEnter={onExpand}
          onMouseMove={onInteract}
          onFocus={onExpand}
        >
          <button
            className={styles.islandToggle}
            type="button"
            aria-label="Toggle menu"
            onClick={isExpanded ? onCollapse : onExpand}
          >
            <span className={styles.islandLabel}>Menu</span>
          </button>
          <nav className={styles.islandNav} aria-label="Primary">
            <ul className={styles.islandList} role="menu">
              {content?.menu_list?.map((menu: any, index: number) => (
                <li className={styles.islandItem} key={index} role="menuitem">
                  <Link
                    href={menu?.link?.url}
                    target={menu?.link?.is_external === true ? "_blank" : "_self"}
                    className={styles.islandLink}
                    onClick={(event) =>
                      handleLinkClick(event, menu?.link?.url, menu?.link?.is_external)
                    }
                    tabIndex={0}
                    aria-label={menu.title}
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default MenuDesktop;
