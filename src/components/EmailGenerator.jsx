import { useState } from "react"
import axios from "axios"
import { Sparkles, Loader2, Copy, ChevronDown, Check } from "lucide-react"

export default function EmailGenerator() {
  const [emailContent, setEmailContent] = useState("")
  const [tone, setTone] = useState("")
  const [generatedReply, setGeneratedReply] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)

  const TONES = [
    "Professional",
    "Casual",
    "Friendly",
    "Formal",
    "Persuasive",
  ]

  const handleSubmit = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await axios.post(
        "https://replyai.cfd/api/email/generate",
        { emailContent, tone }
      )

      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      )
    } catch (err) {
      setError("Error generating reply")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

      {/* ================= LEFT PANEL ================= */}
      <div className="card p-6 flex flex-col h-[450px]">

        <h2 className="mb-4 text-lg font-semibold">
          ✉️ Original Email
        </h2>

        <textarea
          className="flex-1 resize-none input"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          placeholder="Paste email here..."
        />

        {/* Tone Dropdown (IMPROVED UI) */}
        <label className="mt-2 text-sm font-semibold">Tone</label>

        <div className="relative mt-1">

          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-emerald-400 transition"
          >
            <span className="text-sm text-slate-700">
              {tone || "Select tone"}
            </span>

            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute z-20 w-full mt-1 overflow-hidden bg-white border shadow-xl border-slate-200 rounded-xl">

              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTone(t)
                    setOpen(false)
                  }}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm transition hover:bg-emerald-50"
                >
                  {t}

                  {tone === t && (
                    <Check className="w-4 h-4 text-emerald-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          className="flex items-center justify-center gap-2 mt-4 btn-primary"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Reply
            </>
          )}
        </button>

        {error && (
          <p className="mt-3 text-sm text-red-500">{error}</p>
        )}
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="card p-6 flex flex-col h-[450px]">

        <h2 className="mb-4 text-lg font-semibold">
          🤖 AI Generated Reply
        </h2>

        <div className="flex-1 p-4 overflow-y-auto border bg-emerald-50 border-emerald-100 rounded-xl">

          {loading ? (
            <div className="flex items-center justify-center h-full text-slate-500">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating response...
            </div>
          ) : generatedReply ? (
            <p className="text-sm whitespace-pre-wrap text-slate-700">
              {generatedReply}
            </p>
          ) : (
            <p className="text-sm italic text-slate-400">
              Your AI response will appear here...
            </p>
          )}
        </div>

        {generatedReply && (
          <button
            onClick={() => navigator.clipboard.writeText(generatedReply)}
            className="flex items-center justify-center gap-2 mt-4 btn-primary"
          >
            <Copy className="w-4 h-4" />
            Copy Response
          </button>
        )}
      </div>

    </div>
  )
}