import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#D97757] mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl text-[#9CA3AF] max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="bg-[#D97757] text-[#0D0D0D] px-6 py-3 rounded-xl font-semibold hover:bg-[#E08967] transition-all flex items-center gap-2"
          >
            <Home size={20} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="border-2 border-[#D97757] text-[#D97757] px-6 py-3 rounded-xl font-semibold hover:bg-[#D97757] hover:text-[#0D0D0D] transition-all flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Decorative element */}
        <div className="mt-16 text-[#2A2A2A] text-6xl">
          ¯\_(ツ)_/¯
        </div>
      </div>
    </div>
  );
}
