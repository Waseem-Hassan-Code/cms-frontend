// src/routes/RequireAuth.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { getApplicationSettings } from "../../redux/settings/settings-thunk";

const RequireAuth = () => {
  const { isAuthenticated, loading } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const fetchedOnceRef = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !fetchedOnceRef.current) {
      fetchedOnceRef.current = true;
      dispatch(getApplicationSettings());
    }
  }, [isAuthenticated, dispatch]);

  if (loading) return <div>Checking your session…</div>;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
