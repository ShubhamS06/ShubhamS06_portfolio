import { useContext, useState } from "react";
import { brandName, navLinks, user } from "../../constants";
import styles from "./navbar.module.css";
import { SectionContext } from "../../utils/sectionContext";
import { debounce } from "utiljs-pro";

export default function Navbar() {
  const ctx = useContext(SectionContext);
  const [showNavlinks, setShowNavlinks] = useState(false);

  const toggleShowNavlinks = debounce(
    () => setShowNavlinks((prev) => !prev),
    200
  );
  const closeNavlinks = () => setShowNavlinks(false);

  const renderNavLink = ({ text, path, icon }: typeof navLinks[number]) => {
    console.log('pathpathpath', path)
    const isActive = path === ctx.activeSection;
    const commonProps = {
      className: `${styles.navLink} flex items-center cursor-pointer`,
      onClick: () => {
        ctx.setActiveSection(path);
        closeNavlinks();
      },
      "data-active": isActive,
      key: text,
    };

    const content = (
      <>
        <img src={icon} alt="" />
        <span className="capitalize">{text}</span>
      </>
    );

    if (path.startsWith("http")) {
      return (
        <a
          {...commonProps}
          href={path}
          // target="_blank"
          rel="noreferrer"
          className={`${commonProps.className} no-underline`}
          style={{color : isActive ? 'transparent' : 'white'}}
        >
          {content}
        </a>
      );
    }
    return <a {...commonProps}>{content}</a>;
  };

  return (
    <div className={`${styles.navbar} flex items-center justify-between`}>
      <div className={`${styles.left} flex items-center`}>
        <img
          className={`${styles.brandImg} ${styles.brand}`}
          src="/shubhamBgr.png"
          alt=""
        />
        <p className="desktopOnly">
          Welcome to{" "}
          <span className={`${styles.brandname} capitalize`}> {brandName}</span>
        </p>
        <p className="mobOnly">{user.name}</p>
      </div>
      <button
        data-is="toggler"
        data-toggled={showNavlinks}
        onClick={toggleShowNavlinks}
        aria-label={showNavlinks ? "Close navigation" : "Open navigation"}
      >
        <img src="/menu.svg" alt="menu icon" />
      </button>
      <div
        className={`${styles.navDesktop} items-center`}
        data-show={showNavlinks}
      >
        {navLinks.map((link) => renderNavLink(link))}
      </div>

      <div className={styles.mobileMenu} data-open={showNavlinks}>
        <button
          className={styles.mobileBackdrop}
          onClick={closeNavlinks}
          aria-hidden={!showNavlinks}
          tabIndex={-1}
        />
        <div className={styles.mobileSheet} role="dialog" aria-modal="true">
          <div className={styles.mobileHeader}>
            <div className={styles.mobileProfile}>
              <img src="/shubhamBgr.png" alt={`${user.name} avatar`} />
              <div>
                <p className="capitalize">{user.name}</p>
                <span>{user.role}</span>
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={closeNavlinks}
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>
          <nav className={styles.mobileNavLinks}>
            {navLinks.map((link) => {
              if (link?.path === 'designs') {
                return
              }
              return(
                renderNavLink(link)
              )
            }
          )}
          </nav>
        </div>
      </div>
    </div>
  );
}
