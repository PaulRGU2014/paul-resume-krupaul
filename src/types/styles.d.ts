declare module "*.module.scss" {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module "*.module.css" {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module "*.scss";
declare module "*.css";
