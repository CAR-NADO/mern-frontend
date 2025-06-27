import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs";
import { useLocation } from "react-router-dom";

const obj = {
  did: "DID",
  dids: "DIDs",
  cdr: "CDR",
  cdrs: "CDRs",
  ips: "IPs",
};
const formatSegment = (segment: string) => {
  return segment
    .split("-")
    .map((word) => obj[word.toLowerCase() as keyof typeof obj] ?? word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const pathSegments = pathname?.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments?.map((segment, index) => {
          // const href = "/" + pathSegments?.slice(0, index + 1).join("/");
          const isLast = index === pathSegments?.length - 1;
          const formattedSegment = formatSegment(segment);
          return (
            <React.Fragment key={index}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-lg font-semibold">{formattedSegment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink className="text-lg">
                    {/* <Link to={href}></Link> */}
                    {formattedSegment}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
