import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthContextProvider } from "../contexts/Auth";
import { useAuth } from "../hooks/useAuth";
import { Cadastro } from "../pages/Cadastro";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { Upload } from "../pages/Upload";

interface PrivateProps {
  children: JSX.Element
}

export function WebRoutes() {
  const Private = ({ children }: PrivateProps) => {
    const { loading, user } = useAuth();

    if (loading) {
      return <div>Carregando ...</div>;
    }

    if (!user?.id) {
      return <Navigate to="/login" />;
    }

    return children;
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

          <Route path="/upload" element={
            <Private>
              <Upload />
            </Private>
          }
          />
          <Route path="/profile" element={
            <Private>
              <Profile />
            </Private>
          }
          />


          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  )
}