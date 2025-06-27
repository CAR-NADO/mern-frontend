import { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Login, Signup, Home, Products, AboutUs } from "../pages";

// *************** Error
// import { Unauthorized, PageNotFound, Error500Page } from "../pages";

const PrivateLayout = lazy(() => import("@/layouts/PrivateLayout"));
const AuthProvider = lazy(() => import("@/auth/AuthProvider"));
const AuthRemover = lazy(() => import("@/auth/AuthRemover"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <PrivateLayout />
      </AuthProvider>
    ),
    // errorElement: <Error500Page />,
    children: [
      {
        path: "home",
        element: <Home />,
        id: "dashboard",
      },
      {
        path: "our-products",
        element: <Products />,
        id: "our-products",
      },
      {
        path: "about-us",
        element: <AboutUs />,
        id: "about-us",
      },

      // {
      //   path: "identity",
      //   element: (
      //     <Access allowedRoles={[USER]}>
      //       <IdentitiesAdd />
      //     </Access>
      //   ),
      //   children: [
      //     {
      //       index: true,
      //       element: <Identities />,
      //       id: "identity",
      //     },
      //     {
      //       path: "address",
      //       element: <Addresses />,
      //       id: "address",
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "/",
    element: (
      <AuthRemover>
        <Outlet />
      </AuthRemover>
    ),
    errorElement: "Error 500",
    // errorElement: <Error500Page />,
    children: [
      {
        index: true,
        element: <Login />,
        id: "login",
      },

      {
        path: "/signup",
        element: <Signup />,
        id: "signup",
      },

      // {
      //   path: "unauthorized",
      //   element: <Unauthorized />,
      // },
    ],
  },
  {
    path: "unauthorized",
    element: "Unauthorized",
  },
  {
    path: "*",
    element: "Page Not Found",
  },
]);

//  {
//       path: "voice",
//       element: (
//         <Access allowedRoles={[USER]}>
//           <Voice />
//         </Access>
//       ),
//       id: "voice",
//       children: [
//         { index: true, element: <Navigate to="current-rates" replace /> },
//         {
//           path: "current-rates",
//           element: <CurrentRate />,
//           id: "current-rates",
//         },
//         {
//           path: "switches",
//           element: <Switches />,
//           id: "switches",
//         },
//         {
//           path: "cdrs",
//           element: <CDRs />,
//           id: "cdrs",
//           children: [
//             { index: true, element: <Navigate to="inbound" replace /> },
//             {
//               path: "inbound",
//               element: <Contents />,
//               id: "inbound",
//             },
//             {
//               path: "outbound",
//               element: <Contents />,
//               id: "outbound",
//             },
//           ],
//         },
//         // {
//         //   path: "outbound-trunk",
//         //   element: <OutboundTrunk />,
//         //   id: "outbound-trunk",
//         // },
//       ],
//     },
