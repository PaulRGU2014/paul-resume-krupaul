import Link from "next/link";
import { ReactNode, CSSProperties } from "react";

interface LinkWrapperProps {
  href?: string;
  target?: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
  style?: CSSProperties;
  tabIndex?: number;
}

export default function LinkWrapper({
  href,
  target = "_self",
  children,
  className = "",
  onClick,
  style,
  tabIndex,
  ...props
}: LinkWrapperProps) {
  if (!href) {
    return <a className={className} onClick={onClick} style={style} tabIndex={tabIndex} {...props}>{children}</a>
  }
  return (
    <Link className={className} target={target} onClick={onClick} style={style} href={href} passHref tabIndex={tabIndex} {...props}>
      {children}
    </Link>
  );
}