'use client'

import { useEffect } from 'react'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800">
      <h2 className="text-2xl font-bold mb-4">حدث خطأ ما!</h2>
      <p className="mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        حاول مرة أخرى
      </button>
    </div>
  )
}
