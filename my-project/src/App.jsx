import React from "react"
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Causes from "./components/Causes";
import Solutions from "./components/Solutions";
import Essay from "./components/Essay";
import Map from "./components/Map";
import Sources from "./components/Sources";
import Navbar from "./components/Navbar";
import Articles from "./components/Articles";
import ArticleDetail from "./components/ArticleDetail";
import CauseDetail from "./components/CauseDetail"
import SolutionDetail from "./components/SolutionDetail"
import Issues from "./components/Issues"
import Takeactions from "./components/Takeactions"
import CommunityDetail from "./components/CommunityDetail"
import Knowmore from "./components/Knowmore";
import Mission from "./components/Mission";
import Team from "./components/Team";
import Privacy from "./components/Privacy";
import Term from "./components/Term";
import Cookie from "./components/Cookie";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Volunteer from "./components/Volunteer";
import Donate from "./components/Donate";



function App() {
  return (
    <>
    <Navbar />
    <div className="pt-[70px]">
    <Routes>
     <Route path = "/" element = {<Home />} />
     <Route path = "/about" element = {<About />} />
     <Route path = "/About" element = {<About />} />
     <Route path = "/dashboard" element = {<Dashboard />} />
     <Route path = "/Dashboard" element = {<Dashboard />} />
     <Route path = "/causes" element = {<Causes />} />
     <Route path = "/Causes" element = {<Causes />} />
     <Route path = "/solutions" element = {<Solutions />} />
     <Route path = "/Solutions" element = {<Solutions />} />
     <Route path = "/essay" element = {<Essay />} />
     <Route path = "/Essay" element = {<Essay />} />
     <Route path = "/map" element = {<Map />} />
     <Route path = "/Map" element = {<Map />} />
     <Route path = "/sources" element = {<Sources />} />
     <Route path = "/Sources" element = {<Sources />} />
     <Route path = "/articles" element = {<Articles />} />
     <Route path = "/articles/:id" element = {<ArticleDetail />} />
     <Route path = "/causes/:id" element = {<CauseDetail />} />
     <Route path = "/solutions/:id" element = {<SolutionDetail />} />
     <Route path = "/issues" element = {<Issues />} />
     <Route path = "/issues/takeactions" element = {<Takeactions />} />
     <Route path = "/community/:id" element = {<CommunityDetail />} />
     <Route path="/issues/knowmore" element={<Knowmore />} />
     <Route path = "/mission" element = {<Mission />} />
     <Route path = "/team" element = {<Team />} />
     <Route path = "/privacy" element = {<Privacy />} />
     <Route path = "/term" element = {<Term />} />
     <Route path = "/cookie" element = {<Cookie />} />
     <Route path = "/contact" element = {<Contact />} />
     <Route path = "/faq" element = {<Faq />} />
     <Route path = "/volunteer" element = {<Volunteer />} />
     <Route path = "/donate" element = {<Donate />} />
     

    </Routes>
    </div>
    </>
  );
};

export default App