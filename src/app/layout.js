import './global.css'

export const metadata = {
  title: 'Search your car',
  description: 'interview challenge',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
