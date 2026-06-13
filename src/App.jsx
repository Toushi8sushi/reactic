import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Events from './pages/Events'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import Astrophotography from './pages/Astrophotography'
import Guild from './pages/Guild'
import Team from './pages/Team'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/astrophotography" element={<Astrophotography />} />
        <Route path="/guild" element={<Guild />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}
