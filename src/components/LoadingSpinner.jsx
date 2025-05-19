import { Loader } from 'lucide-react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Loader className="animate-spin h-16 w-16 text-[hsl(231,53%,55%)] dark:text-[hsl(231,33%,55%)]" />
      <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Loading, please wait...</p>
    </div>
  )
}

export default LoadingSpinner