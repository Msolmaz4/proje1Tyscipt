import AutLayout from "./_auth/forms/AutLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/pages";
import "./globals.css"
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <main>
        <Routes>
          {/** Public Router */}
          <Route element={<AutLayout />}>
            <Route  path="/sign-in" element={<SigninForm />} />
            <Route  path="/sign-up" element={<SignupForm />} />
          </Route>

          {/** Private Router */}
          <Route element={<RootLayout/>}>
            <Route index element={<Home />} />
          </Route>
          
        </Routes>
      </main>
    </>
  );
}

export default App;
