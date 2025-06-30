import './globals.css';

export const metadata = {
  title: 'Interview Questions Repository',
  description: 'A collection of interview questions for various technologies.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
} 