import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthContextProvider");
  }

  return context;
}

export default useAuth;
