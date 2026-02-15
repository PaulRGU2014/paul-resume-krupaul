import styles from "./MenuMobile.module.scss";
import Link from "@/utils/LinkWrapper/LinkWrapper";

interface MenuMobileProps {
  content: any;
  isExpanded: boolean;
  onExpand: () => void;
  onInteract: () => void;
  onCollapse: () => void;
  onNavigate: (url: string) => void;
  headerRef: React.RefObject<HTMLElement | null>;
}

export default function MenuMobile({
  content,
  isExpanded,
  onExpand,
  onInteract,
  onCollapse,
  onNavigate,
  headerRef,
}: MenuMobileProps) {
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
      className={`${styles.header} ${isExpanded ? styles.expanded : styles.collapsed}`}
      data-header="site"
    >
      <div className={styles.wrapper}>
        <div
          className={`${styles.island} ${isExpanded ? styles.expanded : styles.collapsed}`}
          onClick={isExpanded ? onCollapse : onExpand}
          onTouchStart={onExpand}
          onMouseMove={onInteract}
        >
          <button
            className={styles.islandToggle}
            type="button"
            aria-label="Toggle menu"
          >
            <span className={styles.islandDots} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
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
}
