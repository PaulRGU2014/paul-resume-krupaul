"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile/MenuMobile";

interface NavIslandProps {
  content: any;
}

const NavIsland: React.FC<NavIslandProps> = ({ content }) => {
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
  const [isExpanded, setIsExpanded] = useState(false);
  const inactivityRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.outerWidth);
    }
    const handleResize = () => setScreenWidth(window.outerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityRef.current) {
      clearTimeout(inactivityRef.current);
    }
    inactivityRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 5000);
  }, []);

  const handleExpand = useCallback(() => {
    setIsExpanded(true);
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleInteract = useCallback(() => {
    if (!isExpanded) return;
    resetInactivityTimer();
  }, [isExpanded, resetInactivityTimer]);

  const handleCollapse = useCallback(() => {
    if (inactivityRef.current) {
      clearTimeout(inactivityRef.current);
    }
    setIsExpanded(false);
  }, []);

  const handleNavigate = useCallback(
    (url: string) => {
      if (!url) return;

      if (url.startsWith("#")) {
        const targetId = url.replace("#", "");
        const target = targetId ? document.getElementById(targetId) : null;
        const headerHeight = headerRef.current?.offsetHeight ?? 80;

        if (targetId === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.replaceState(null, "", url);
          setIsExpanded(false);
          return;
        }

        if (target) {
          const elementTop = target.getBoundingClientRect().top + window.scrollY;
          const offsetTop = Math.max(0, elementTop - headerHeight - 16);
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
          window.history.replaceState(null, "", url);
        }

        setIsExpanded(false);
        return;
      }

      router.push(url);
      setIsExpanded(false);
    },
    [router]
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.outerWidth);
      setIsExpanded(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityRef.current) {
        clearTimeout(inactivityRef.current);
      }
    };
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
            isVisible: true,
            isExpanded,
            onExpand: handleExpand,
            onInteract: handleInteract,
            onCollapse: handleCollapse,
            onNavigate: handleNavigate,
            headerRef,
          }}
        />
      ) : (
        <MenuMobile
          {...{
            content,
            isExpanded,
            onExpand: handleExpand,
            onInteract: handleInteract,
            onCollapse: handleCollapse,
            onNavigate: handleNavigate,
            headerRef,
          }}
        />
      )}
    </>
  );
};

export default NavIsland;
