'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
export default function Result() {
  const searchParams = useSearchParams();
  const result = searchParams.get('result');

  const formattedResult = result?.split('\n').map((line, index) => (
    <p
      key={index}
      className={`
      ${line.startsWith('📌') ? 'text-xl font-bold mb-4' : ''}
      ${line.startsWith('✅') ? 'text-lg mb-2' : ''}
      ${line.startsWith('📊') ? 'text-xl font-bold mt-6 mb-4' : ''}
      ${line.startsWith('          ') ? 'ml-8 mb-2' : ''}
      ${line.startsWith('💡') ? 'text-xl font-bold mt-6 mb-4' : ''}
      ${line.startsWith('•') ? 'ml-4 mb-2' : ''}
      ${line.startsWith('🔍') ? 'text-xl font-bold mt-6 mb-4' : ''}
    `}
    >
      {line}
    </p>
  ));

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-6 sm:p-8">
      <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8">
        <div className="space-y-6">
          {/* 이미지 */}
          <div className="flex justify-center">
            <Image src="/couple2.png" alt="MBTI" width={100} height={100} />
          </div>
          <div className="space-y-2">{formattedResult}</div>
          <div className="pt-4">
            <Link
              href="/"
              className="block w-full bg-[#F3E2D3] hover:bg-[#ebd3c0] text-[#584848] font-bold py-4 px-6 rounded-2xl 
                transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-lg
                text-center"
            >
              메인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
