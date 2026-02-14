import styles from "./Hero.module.scss";

interface HeroLink {
  href: string;
  label: string;
  text: string;
}

interface HeroProps {
  name: string;
  role: string;
  links: HeroLink[];
}

export default function Hero({ name, role, links }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.iconRow}>
        {links.map((link) => (
          <a key={link.label} href={link.href} aria-label={link.label}>
            {link.text}
          </a>
        ))}
      </div>

      <h1 className={styles.name}>{name}</h1>
      <p className={styles.role}>{role}</p>
    </section>
  );
}
