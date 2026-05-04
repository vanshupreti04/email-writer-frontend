import Header from "./components/Header"
import EmailGenerator from "./components/EmailGenerator"
import './index.css'   

export default function App() {
  return (
    <div>
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-5">
        {/* HERO */}
        <div className="text-center mb-5">
          <h1 className="text-4xl font-extrabold text-slate-900">
            AI Email Reply <span className="text-emerald-600">Generator</span>
          </h1>

          <p className="text-slate-500 mt-2">
            Paste email → choose tone → generate reply instantly
          </p>
        </div>

        {/* CORE COMPONENT */}
        <EmailGenerator />
      </main>
    </div>
  )
}