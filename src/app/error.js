'use client'
import Error from '@/components/Error/Error'

export default function ErrorBoundary({ reset }) {
  return <Error reset={reset} />
}