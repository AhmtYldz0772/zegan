export default function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-10 h-10 border-2 border-white/20 border-t-accent-500 rounded-full animate-spin" />
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <LoadingSpinner />
      <p className="text-gray-400 text-sm">Wird geladen...</p>
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-carbon-1000/80 backdrop-blur-sm flex items-center justify-center z-50">
      <LoadingSpinner />
    </div>
  );
}
