import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MBTI 이상형 검사',
  description: 'MBTI 이상형 검사',
  openGraph: {
    title: 'MBTI 이상형 검사',
    description: 'MBTI 이상형 검사',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'MBTI 이상형 검사',
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
