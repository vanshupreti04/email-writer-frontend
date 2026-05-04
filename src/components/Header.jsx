import { Download } from "lucide-react"
import emailLogo from "../assets/email-logo.webp"

export default function Header() {

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/email-reply-extension.zip"
    link.setAttribute("download", "email-reply-extension.zip")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <header className="flex items-center justify-between h-16 px-8 bg-white border-b border-slate-200">
      
      {/* LEFT */}
      <div className="flex items-center gap-2">

        <div className="flex items-center justify-center w-15 h-15">
          <img
            src={emailLogo}
            alt="ReplyAI Logo"
            className="object-contain w-9 h-9 rounded-xl"
          />
        </div>

        <span className="font-bold text-slate-900">
          ReplyAI
        </span>
      </div>

      {/* RIGHT */}
      <button 
        onClick={handleDownload}
        className="flex items-center gap-2 btn-primary"
      >
        <Download className="w-4 h-4" />
        Download Extension
      </button>

    </header>
  )
}