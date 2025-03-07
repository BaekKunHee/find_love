'use client';
import loadingAnimation from '@/public/loading.json';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    gender: '여성',
    age: '',
    mbti: '',
    datingStyle: '',
    values: '',
    hobbies: '',
    email: '',
  });

  const mbtiOptions = [
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
    'ISTP',
    'ISFP',
    'INFP',
    'INTP',
    'ESTP',
    'ESFP',
    'ENFP',
    'ENTP',
    'ESTJ',
    'ESFJ',
    'ENFJ',
    'ENTJ',
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Loading modal component
  const LoadingModal = () => (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="w-24 h-24 mx-auto mb-4">
          <Suspense fallback={<div className="w-24 h-24" />}>
            <Lottie
              animationData={loadingAnimation}
              loop={true}
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
        </div>
        <p className="text-lg font-medium text-[#584848]">
          나는 왜 SOLO인지 분석중입니다...
        </p>
        <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요</p>
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 유효성 검사
    if (
      !formData.age ||
      !formData.mbti ||
      !formData.datingStyle ||
      !formData.values ||
      !formData.hobbies
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    // 이메일 유효성 검사 (이메일이 입력된 경우에만)
    if (formData.email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(formData.email)) {
        alert('올바른 이메일 주소를 입력해주세요.');
        return;
      }
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        'https://hook.eu2.make.com/4rbg3m9rh3cgllvq2u8ng644sactbo0h',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // URL encode the result and redirect to result page
        const encodedResult = encodeURIComponent(data.result);
        const encodedScore = encodeURIComponent(JSON.stringify(data.score));
        router.push(`/result?result=${encodedResult}&score=${encodedScore}`);
      } else {
        throw new Error('제출에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3E2D3] p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        {isLoading && <LoadingModal />}

        <form className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
          <div className="space-y-4 md:space-y-6">
            <h1 className="font-jalnan text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-[#584848]">
              ✨ 나는 왜 SOLO? 🧐
            </h1>

            {/* 이미지 */}
            <div className="flex justify-center">
              <Image
                src="/couple.png"
                alt="MBTI"
                width={80}
                height={80}
                className="w-[80px] sm:w-[90px] md:w-[100px]"
              />
            </div>

            {/* 성별 토글 */}
            <div className="flex flex-col gap-2 sm:gap-3">
              <label className="font-jalnan font-medium text-[#584848] text-sm sm:text-base">
                성별
              </label>
              <div className="flex gap-3 sm:gap-4">
                {['여성', '남성'].map((gender) => (
                  <label
                    key={gender}
                    className={`
                      flex items-center justify-center w-20 sm:w-24 h-10 sm:h-12 rounded-full cursor-pointer
                      transition-all duration-200 ease-in-out text-sm sm:text-base
                      ${
                        formData.gender === gender
                          ? 'bg-[#F3E2D3] text-[#584848] shadow-inner font-medium scale-105'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                      className="hidden"
                    />
                    {gender === '여성' ? '👧 여성' : '👦 남성'}
                  </label>
                ))}
              </div>
            </div>

            {/* Input fields */}
            {[
              '나이',
              'MBTI',
              '연애스타일',
              '연애 가치관',
              '취미 & 관심사',
              '이메일',
            ].map((field) => (
              <div key={field} className="flex flex-col gap-2 sm:gap-3">
                <label className="font-jalnan font-medium text-[#584848] text-sm sm:text-base">
                  {field}{' '}
                  {field !== '이메일' && (
                    <span className="text-red-500">*</span>
                  )}
                  {field === '이메일' && (
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      (선택사항 - 입력시 결과를 이메일로도 전송해드립니다)
                    </span>
                  )}
                </label>
                {field === '나이' ? (
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="p-2.5 sm:p-3 rounded-xl border border-gray-200 focus:border-[#F3E2D3] focus:ring-[#F3E2D3] focus:ring-2 outline-none transition-all text-sm sm:text-base"
                    placeholder="나이를 입력하세요"
                    required
                    min="1"
                    max="100"
                  />
                ) : field === 'MBTI' ? (
                  <select
                    name="mbti"
                    value={formData.mbti}
                    onChange={handleChange}
                    className="p-2.5 sm:p-3 rounded-xl border border-gray-200 focus:border-[#F3E2D3] focus:ring-[#F3E2D3] focus:ring-2 outline-none transition-all text-sm sm:text-base"
                    required
                  >
                    <option value="">MBTI 선택</option>
                    {mbtiOptions.map((mbti) => (
                      <option key={mbti} value={mbti}>
                        {mbti}
                      </option>
                    ))}
                  </select>
                ) : field === '이메일' ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2.5 sm:p-3 rounded-xl border border-gray-200 focus:border-[#F3E2D3] focus:ring-[#F3E2D3] focus:ring-2 outline-none transition-all text-sm sm:text-base"
                    placeholder="결과를 받아보실 이메일을 입력하세요"
                  />
                ) : (
                  <textarea
                    name={
                      field === '연애스타일'
                        ? 'datingStyle'
                        : field === '연애 가치관'
                        ? 'values'
                        : 'hobbies'
                    }
                    value={
                      field === '연애스타일'
                        ? formData.datingStyle
                        : field === '연애 가치관'
                        ? formData.values
                        : formData.hobbies
                    }
                    onChange={handleChange}
                    className="p-2.5 sm:p-3 rounded-xl border border-gray-200 focus:border-[#F3E2D3] focus:ring-[#F3E2D3] focus:ring-2 outline-none transition-all resize-none text-sm sm:text-base"
                    placeholder={`${field}을(를) 입력하세요`}
                    rows={3}
                    required
                    minLength={2}
                  />
                )}
              </div>
            ))}

            {/* 제출 버튼 */}
            <div className="pt-2 sm:pt-4">
              <button
                type="submit"
                className="w-full bg-[#F3E2D3] hover:bg-[#ebd3c0] text-[#584848] font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl 
                  transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-lg
                  flex items-center justify-center gap-2 text-sm sm:text-base"
                onClick={handleSubmit}
              >
                <span>내가 왜 솔로인지 알아보기</span>
                <span className="text-lg sm:text-xl">💘</span>
              </button>
              <div className="text-center text-xs text-gray-500 mt-10">
                Copyright 2025. Han. All rights reserved.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
