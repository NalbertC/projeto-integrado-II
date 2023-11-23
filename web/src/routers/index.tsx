import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthContextProvider } from "../contexts/Auth";
import { useAuth } from "../hooks/useAuth";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export function WebRoutes() {

  const Private = (props: any) => {
    const { loading, user } = useAuth();

    if (loading) {
      return <div>Carregando ...</div>;
    }

    if (!user?.id) {
      return <Navigate to="/login" />;
    }

    return props.children;
  };

  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={
            <Private>
              <Home />
            </Private>
          }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  )
}