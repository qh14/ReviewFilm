import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ListRoutes } from "./routes/index";
import { DefaultLayout } from "./components/layout/DefaultLayout";
import NotFound from "./components/pages/NotFound";
import { useAuth } from "./hook";
import AdminNavigator from "./navigator/AdminNavigator";

function App() {
  const { authInfo } = useAuth();
  console.log(authInfo.isLogIn);
  if (authInfo?.isLogIn) {
    const isAdmin = authInfo.profile?.role === "admin";
    if (isAdmin) {
      return <AdminNavigator />;
    }
  }
  return (
    <div className="App">
      <Routes>
        {ListRoutes.map((route, index) => {
          const Layout = route.isShowHeader ? DefaultLayout : React.Fragment;
          return (
            <Route
              path={route.path}
              key={index}
              element={
                <Layout>
                  <route.component />
                </Layout>
              }
            />
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
