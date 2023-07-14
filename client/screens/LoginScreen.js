import { useEffect } from "react";
import LoginForm from "../components/Forms/LoginForm";
import useNavigationStore from "../stores/navigationStore";

function LoginScreen({ navigation }) {
  const setNavigation = useNavigationStore((state) => state.setNavigation);
  useEffect(() => {
    setNavigation(navigation);
  }, []);
  return <LoginForm />;
}

export default LoginScreen;
