'use client';
import LZString from 'lz-string';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

// ResultData 컴포넌트를 새로 만들어 useSearchParams를 사용하는 로직을 분리
function ResultData() {
  const searchParams = useSearchParams();
  const result = searchParams.get('result');
  const score = searchParams.get('score');
  let scoreData = {
    communication: 0,
    independence: 0,
    preference: 0,
    interests: 0,
    compatibility: 0,
    emotional: 0,
  };

  // 결과 데이터 파싱
  if (score) {
    try {
      const parsedData = JSON.parse(decodeURIComponent(score));
      scoreData = {
        communication: parsedData.communication || 0,
        independence: parsedData.independence || 0,
        preference: parsedData.preference || 0,
        interests: parsedData.interests || 0,
        compatibility: parsedData.compatibility || 0,
        emotional: parsedData.emotional || 0,
      };
    } catch (error) {
      console.error('Failed to parse score data:', error);
    }
  }

  const data = [
    { name: '의사소통 스타일', value: scoreData.communication },
    { name: '자유 vs 안정', value: scoreData.independence },
    { name: '데이트 선호도', value: scoreData.preference },
    { name: '관심사 일치도', value: scoreData.interests },
    { name: '연애 지속 가능성', value: scoreData.compatibility },
    { name: '감성 표현력', value: scoreData.emotional },
  ];

  const handleShare = async () => {
    try {
      if (!result) throw new Error('No result to share');
      const compressed = LZString.compressToEncodedURIComponent(result);
      const shareUrl = `${window.location.origin}/result?r=${compressed}`;
      await navigator.clipboard.writeText(shareUrl);
      alert('링크가 복사되었습니다!');
    } catch (err) {
      alert(`링크 복사에 실패했습니다. ${err}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Image src="/couple2.png" alt="MBTI" width={100} height={100} />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ResultContent />
      </Suspense>
      <div className="w-full h-[400px] my-8">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fill: '#666', fontSize: 14 }}
            />
            <PolarRadiusAxis angle={90} domain={[0, 5]} tickCount={6} />
            <Radar
              name="점수"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="pt-4 space-y-4">
        <Link
          href="/"
          className="block w-full bg-[#F3E2D3] hover:bg-[#ebd3c0] text-[#584848] font-bold py-4 px-6 rounded-2xl 
            transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-lg
            text-center"
        >
          메인으로 돌아가기
        </Link>
        <button
          onClick={handleShare}
          className="block w-full bg-[#584848] hover:bg-[#463939] text-white font-bold py-4 px-6 rounded-2xl 
            transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-lg
            text-center"
        >
          결과 공유하기
        </button>
      </div>
    </div>
  );
}

// 메인 Result 컴포넌트를 Suspense로 감싸서 반환
export default function Result() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto p-6 sm:p-8">
      <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ResultData />
        </Suspense>
      </div>
    </div>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const result = searchParams.get('result');
  const compressed = searchParams.get('r');

  let finalResult = result;

  // 압축된 데이터가 있으면 압축 해제
  if (compressed) {
    try {
      finalResult = LZString.decompressFromEncodedURIComponent(compressed);
    } catch (e) {
      console.error('Failed to decompress result', e);
    }
  }

  const formattedResult = (finalResult || '')
    ?.split('\n')
    .map((line, index) => (
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

  return <div className="space-y-2">{formattedResult}</div>;
}
