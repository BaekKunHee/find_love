import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const jalnan = localFont({
  src: '../public/fonts/JalnanGothic.otf',
  variable: '--font-jalnan',
  display: 'swap',
});

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
    <html lang="ko" className={jalnan.variable}>
      <body className={`${jalnan.className} antialiased`}>{children}</body>
    </html>
  );
}
