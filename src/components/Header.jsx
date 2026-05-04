import { Download } from "lucide-react"
import emailLogo from "../assets/email-logo.webp"

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      
      {/* LEFT */}
      <div className="flex items-center gap-2">

        {/* Logo Image */}
        <div className="w-15 h-15 flex items-center justify-center">
          <img
            src={emailLogo}
            alt="ReplyAI Logo"
            className="w-9 h-9 object-contain rounded-xl"
          />
        </div>

        <span className="font-bold text-slate-900">
          ReplyAI
        </span>
      </div>

      {/* RIGHT */}
      <button className="btn-primary flex items-center gap-2">
        <Download className="w-4 h-4" />
        Download Extension
      </button>
    </header>
  )
}