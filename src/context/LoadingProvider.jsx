import { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";

export const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.round(Math.random() * 8 + 3);
      if (percent >= 100) {
        setLoading(100);
        clearInterval(interval);
      } else {
        setLoading(percent);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const value = { isLoading, setIsLoading, setLoading };

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};
