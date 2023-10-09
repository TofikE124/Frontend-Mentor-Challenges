import { BrowserRouter, Route, Routes,Outlet } from 'react-router-dom'
import Layout from './Components/Layout'


import HomePage from './Pages/HomePage'
import DestinationPage from './Pages/DestinationPage'
import CrewPage from './Pages/CrewPage'
import TechnologyPage from './Pages/TechnologyPage'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='destination/' element={<Outlet />} >
            <Route index element={<DestinationPage />} />
            <Route path=':planet' element={<DestinationPage />} />
          </Route>

          <Route path='crew/' element={<Outlet />} >
            <Route index element={<CrewPage />} />
            <Route path=':crewIndex' element={<CrewPage />} />
          </Route>

          <Route path='technology/' element={<Outlet />} >
            <Route index element={<TechnologyPage />} />
            <Route path=':craftIndex' element={<TechnologyPage />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

