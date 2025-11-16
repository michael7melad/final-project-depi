import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "../store/slices/authSlice";

export const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize auth state from localStorage when app starts
    dispatch(initializeAuth());
  }, [dispatch]);

  return null; // This component doesn't render anything
};
