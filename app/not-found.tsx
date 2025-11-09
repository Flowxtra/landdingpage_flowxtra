import Link from 'next/link';

// This root not-found.tsx handles unmatched URLs at the root level
// It displays a simple 404 page and redirects users to the English homepage
export default function RootNotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found | Flowxtra</title>
        <meta name="robots" content="noindex" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #003f4d 0%, #006b7d 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .container {
            text-align: center;
            max-width: 600px;
          }
          h1 {
            font-size: 120px;
            font-weight: bold;
            margin-bottom: 20px;
            line-height: 1;
            color: #fbbf24;
          }
          h2 {
            font-size: 32px;
            font-weight: 600;
            margin-bottom: 16px;
          }
          p {
            font-size: 18px;
            margin-bottom: 32px;
            opacity: 0.9;
          }
          .button {
            display: inline-block;
            background: white;
            color: #003f4d;
            padding: 14px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }
          @media (max-width: 640px) {
            h1 {
              font-size: 80px;
            }
            h2 {
              font-size: 24px;
            }
            p {
              font-size: 16px;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <h1>404</h1>
          <h2>Oops! Page Not Found</h2>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <Link href="/en" className="button">
            Back to Homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
