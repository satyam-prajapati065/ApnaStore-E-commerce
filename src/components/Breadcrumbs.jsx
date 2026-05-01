import { Link, useLocation } from "react-router";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <Link to="/" style={{ textDecoration: "none", color: "red" }}>
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <span key={to}> / {value}</span>
        ) : (
          <span key={to}>
            {" "}
            /{" "}
            <Link to={to} style={{ textDecoration: "none", color: "red" }}>
              {value}
            </Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
