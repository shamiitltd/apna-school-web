import { NavBar } from "./components/NavBar"
import { Home } from "./pages/Home"
import { Features } from "./pages/Features"
import { HowItWorks } from "./pages/HowItWorks"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function Placeholder({title}) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
    </main>
  )
}
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
