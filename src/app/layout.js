import '../styles/globals.css'

export const metadata = {
  title: 'Search your car',
  description: 'interview challenge',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='m-1'>{children}</body>
    </html>
  )
}
