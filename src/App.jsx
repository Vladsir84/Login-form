import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <div className="app">
      <main className="form_wrapper">
        <h1 className="form_title">Qencode</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/reset_password" element={<ResetPassword />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
