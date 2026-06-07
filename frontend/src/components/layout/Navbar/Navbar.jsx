import { useLocation, Link } from "react-router-dom";
import { navigationLinks } from "../Header/navigation";

export default function Navbar({ mobile = false }) {

  const location = useLocation();

  const isHome = location.pathname === "/";

  const linkColor = isHome
    ? "lg:text-white text-h"
    : "text-h";

  const underlineColor = isHome
    ? "lg:bg-white bg-h"
    : "bg-h";

  return (
    <nav
      className={`
        flex
        ${mobile
          ? "flex-col items-center"
          : "lg:flex-row"
        }
        gap-10 lg:gap-20
      `}
    >

      {navigationLinks.map((link) => {

        return (
          <Link
            key={link.path}
            to={link.path}
            className={`
              group relative
              ${linkColor}
            `}
          >

            {link.label}

            <div
              className={`
                absolute
                h-px
                w-0
                transition-all
                duration-300
                group-hover:w-full
                ${underlineColor}
              `}
            />

          </Link>
        );
      })}

    </nav>
  );
}