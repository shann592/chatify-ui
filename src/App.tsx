import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChatPage from "./pages/ChatPage";
import { useCheckAuthQuery } from "./api/chatify.api";
import PageLoader from "./components/ui/loader";
type Props = {};

const App = (props: Props) => {
  const { isLoading, data: authUser, isError } = useCheckAuthQuery(undefined);
  console.log(authUser);
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-[#f7fafc]">
      {isLoading ? (
        <PageLoader />
      ) : (
        <Routes>
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={authUser ? <ChatPage /> : <Navigate to="/login" />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
