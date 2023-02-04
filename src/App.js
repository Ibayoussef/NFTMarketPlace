import { Outlet, Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { Home, Create, Explore, Profile } from "./pages";
import Navbar from "./components/Navbar";
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="explore" element={<Explore />} />
          <Route path="create" element={<Create />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
