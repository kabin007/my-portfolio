import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PixelNav from './components/pixel/PixelNav'
import { PaperTexture } from './components/pixel/scenery'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Loader from './components/Loader'

import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import CaseStudy from './pages/CaseStudy'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'

// Admin panel is code-split — it's only ever fetched by the ~1% of
// visitors who navigate to /admin, keeping the public bundle lean.
const Login = lazy(() => import('./pages/admin/Login'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const ManageProjects = lazy(() => import('./pages/admin/ManageProjects'))
const ManageExperience = lazy(() => import('./pages/admin/ManageExperience'))
const ManageBlog = lazy(() => import('./pages/admin/ManageBlog'))
const Messages = lazy(() => import('./pages/admin/Messages'))
const EditProfile = lazy(() => import('./pages/admin/EditProfile'))

function SiteRoutes() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <PaperTexture />}
      {!isAdmin && <PixelNav />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <ManageProjects />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/experience"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <ManageExperience />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <ManageBlog />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <Messages />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <EditProfile />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return <SiteRoutes />
}
