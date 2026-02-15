"use client";

import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile/MenuMobile";

interface HeaderProps {
  content: any;
}

const Header: React.FC<HeaderProps> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpening, setIsMenuOpening] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const activeSectionRef = useRef<string | null>(null);

  const sectionIds = useMemo(() => {
    const ids = new Set<string>();
    const addFromUrl = (url?: string) => {
      if (url && url.startsWith("#")) {
        ids.add(url.slice(1));
      }
    };

    content?.menu_list?.forEach((item: any) => {
      addFromUrl(item?.link?.url);
    });

    return Array.from(ids);
  }, [content]);

  const controlHeader = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      setScrollTimeout(timeout);
    }
  }, [lastScrollY, scrollTimeout]);

  const handleMouseMove = (event: MouseEvent) => {
    if (event.clientY < 50) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.outerWidth);
    }
    const handleResize = () => setScreenWidth(window.outerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeader);
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("scroll", controlHeader);
        window.removeEventListener("mousemove", handleMouseMove);
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };
    }
  }, [controlHeader, scrollTimeout]);

  const menuRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, hamburgerRef]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [isMenuOpen]);

  const menuListNumber = content?.footer_links?.length || 0;

  function handleMenuToggle() {
    if (!isMenuOpen) {
      setIsMenuOpening(true);
      setIsMenuOpen(true);
      setTimeout(
        () => {
          setIsMenuOpening(false);
        },
        menuListNumber * 100 + 100
      );
    } else {
      setIsMenuOpen(false);
    }
  }

  const handleMenuClick = (
    _event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    _url?: string,
    closeMenu = true
  ) => {
    if (closeMenu) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) {
          return;
        }

        const section = visible[0].target as HTMLElement;
        const id = section.id;
        if (!id || activeSectionRef.current === id) {
          return;
        }

        activeSectionRef.current = id;
        const nextHash = `#${id}`;
        if (window.location.hash !== nextHash) {
          window.history.replaceState(null, "", nextHash);
        }
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (typeof window === "undefined" || !isMenuOpen) {
      return;
    }

    const handleHashChange = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(true);
      setLastScrollY(0);
      setScrollTimeout(null);
      setScreenWidth(window.outerWidth);
      setIsMenuOpen(false);
      setIsMenuOpening(false);
      setInitialLoad(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!content) {
    return null;
  }

  return (
    <>
      {screenWidth !== undefined && screenWidth > 920 ? (
        <MenuDesktop
          {...{
            content,
            isVisible,
            handleMenuClick,
          }}
        />
      ) : (
        <MenuMobile
          {...{
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
          }}
        />
      )}
    </>
  );
};

export default Header;
