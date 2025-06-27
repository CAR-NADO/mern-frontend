import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";

export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logout());
  };
  return { handleLogout };
};
