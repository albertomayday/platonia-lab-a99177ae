import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollAndFocus: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Smooth scroll to top for new pages
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      window.scrollTo(0, 0);
    }

    // Move keyboard focus to the main content for accessibility
    const main = document.querySelector("main");
    if (main instanceof HTMLElement) {
      const prevTab = main.getAttribute("tabindex");
      main.setAttribute("tabindex", "-1");
      main.focus();
      if (prevTab !== null) main.setAttribute("tabindex", prevTab);
      else main.removeAttribute("tabindex");
    }
  }, [location.pathname]);

  return null;
};

export default ScrollAndFocus;
