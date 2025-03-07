import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '나는 왜 SOLO?',
  description: '나는 왜 SOLO?',
  openGraph: {
    title: '나는 왜 SOLO?',
    description: '내가 왜 SOLO인지 알려주는 유형검사',
    type: 'website',
    locale: 'ko_KR',
    siteName: '나는 왜 SOLO?',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
