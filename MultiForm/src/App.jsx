import React from "react"
import { BrowserRouter,Routes, Route } from "react-router-dom"

import Layout from "./Components/Layout"
import StepOne from "./Steps/Step-1"
import StepTwo from './Steps/Step-2'
import StepThree from './Steps/Step-3'
import StepFour from './Steps/Step-4'
import ThankYou from './Steps/Thank-You'

import NotFound from './Pages/NotFound'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="step-1" element={<StepOne />} />
          <Route path="step-2" element={<StepTwo />} />
          <Route path="step-3" element={<StepThree />} />
          <Route path="step-4" element={<StepFour/>} />
          <Route path="thank-you" element={<ThankYou />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

