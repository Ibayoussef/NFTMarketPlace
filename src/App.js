import { Outlet, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { Home, Create, Explore, Profile, Swap } from "./pages";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import isMobile from "ismobilejs";
const Layout = () => (
  <>
    {isMobile().phone ? <MobileNav /> : <Navbar />}
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
          <Route path="swap" element={<Swap />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
