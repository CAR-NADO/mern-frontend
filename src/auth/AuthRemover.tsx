import { RootState } from "@/redux/store";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface AuthRemoverProps {
  children: ReactNode;
}
const AuthRemover: FC<AuthRemoverProps> = ({ children }) => {
  const auth = useSelector((state: RootState) => state["auth"]);

  if (!auth?.token) {
    return children;
  }
  return <Navigate to="home" />;
};

export default AuthRemover;
