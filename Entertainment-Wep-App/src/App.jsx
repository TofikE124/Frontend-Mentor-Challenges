import { BrowserRouter,Routes,Route,Outlet } from "react-router-dom"
import DesignSystem from "./Pages/DesignSystem"


import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'

import HomeLayout from './Componenets/Home/HomeLayout'
import ProtectedRoute from './Componenets/Home/ProtectedRoute'

import MainPage from "./Pages/Home/MainPage"
import MoviesPage from "./Pages/Home/MoviesPage"
import TvPage from "./Pages/Home/TvPage"
import BookmarkedPage from "./Pages/Home/BookmarkesPage"


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Outlet />}>
          <Route index element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route element={<ProtectedRoute />} >
            <Route path="home" element={<HomeLayout />}>
              <Route index  element={<MainPage />} />
              <Route path="movies"  element={<MoviesPage />} />
              <Route path="tv-series"  element={<TvPage />} />
              <Route path="bookmarked"  element={<BookmarkedPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

    // <DesignSystem />
  )
}

