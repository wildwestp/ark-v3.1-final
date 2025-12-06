import './globals.css'

export const metadata = {
  title: 'Ark Bundle Hub',
  description: 'AI-Powered Bundle Intelligence for E-commerce',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
