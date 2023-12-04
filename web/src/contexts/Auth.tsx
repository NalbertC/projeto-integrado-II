import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../services/api";

interface UserProps {
  id: string;
  email: string;
  password: string;
  username: string
  name: string;
}

interface AuthContextType {
  user: UserProps | undefined;
  authenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
  refreshing: boolean
  setRefreshin: React.Dispatch<React.SetStateAction<boolean>>
}

interface AuthContextProviderProps {
  children: JSX.Element
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const navigate = useNavigate()
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshin] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await createSession(username, password);

      // criar session
      const loggedUser = response.data.user;
      const token = response.data.token;

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", token);
      api.defaults.headers.authorization = `Bearer ${token}`;


      setUser(loggedUser);
      navigate("/");

      return response.status;
    } catch (err) {
      if (err instanceof AxiosError) {
        return err.response;
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.authorization = null;
    setUser({} as UserProps);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, authenticated: !!user, loading, login, logout, refreshing, setRefreshin }}>{children}</AuthContext.Provider>
  )
}
