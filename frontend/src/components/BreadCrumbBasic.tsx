import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";

function formatLabel(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export function BreadcrumbBasic() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home always first */}

        {pathnames.map((segment, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <Fragment key={to}>
              {index !== 0 && <BreadcrumbSeparator />}

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatLabel(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to}>{formatLabel(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
