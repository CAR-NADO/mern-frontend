import { RootState } from "@/redux/store";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { useGetUserDetails } from "@/hooks/useGetUserDetails";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const auth = useSelector((state: RootState) => state["auth"]);
  if (!auth?.token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default AuthProvider;
