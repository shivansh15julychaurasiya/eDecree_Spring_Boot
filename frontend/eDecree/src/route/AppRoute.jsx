import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { useSelector } from "react-redux";

import MainLayout from "../layout/MainLayout";
import Login from "../features/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import { RouteConfig } from "./RouteConfig";
import { getDefaultRoute } from "../utils/getDefaultRoute";

const AppRoutes = () => {
  const { token, user } = useSelector((s) => s.auth);
  const roles = user?.roles || [];

  // ✅ FLATTEN CHILD ROUTES
  const allRoutes = RouteConfig.flatMap((menu) => menu.children || []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        {/* Public */}
        <Route
          path="/login"
          element={
            token
              ? <Navigate to={getDefaultRoute(roles)} replace />
              : <Login />
          }
        />

        {/* Protected Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Default redirect */}
          <Route
            index
            element={<Navigate to={getDefaultRoute(roles)} replace />}
          />

          {/* ✅ Use flattened routes */}
          {allRoutes.map(({ path, component: Component, roles }) => {
            const cleanPath = path.replace(/^\//, "");

            return (
              <Route
                key={path}
                path={cleanPath}
                element={
                  <ProtectedRoute roles={roles}>
                    <Component />
                  </ProtectedRoute>
                }
              />
            );
          })}

          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;