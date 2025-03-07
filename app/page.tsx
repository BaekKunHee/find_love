'use client';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    gender: '여성',
    age: '',
    mbti: '',
    datingStyle: '',
    values: '',
    hobbies: '',
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

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen max-w-2xl mx-auto p-6 sm:p-8">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 text-[#584848]">
        ✨ MBTI기반 AI 이상형 검사 💝
      </h1>

      <form className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 space-y-8">
        <div className="space-y-6">
          {/* 이미지 */}
          <div className="flex justify-center">
            <img src="/couple.png" alt="MBTI" className="w-32" />
          </div>
          {/* 성별 토글 */}
          <div className="flex flex-col gap-3">
            <label className="font-medium text-[#584848]">성별</label>
            <div className="flex gap-4 justify-center">
              {['여성', '남성'].map((gender) => (
                <label
                  key={gender}
                  className={`
                    flex items-center justify-center w-24 h-12 rounded-full cursor-pointer
                    transition-all duration-200 ease-in-out
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

          {/* 나이 */}
          <div className="flex flex-col gap-3">
            <label className="font-medium text-[#584848]">나이</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-200 focus:border-[#F3E2D3] focus:ring-[#F3E2D3] focus:ring-2 outline-none transition-all"
              placeholder="나이를 입력하세요"
            />
          </div>

          {/* MBTI 선택 */}
          <div className="flex flex-col gap-3">
            <label className="font-medium text-[#584848]">MBTI</label>
            <select
              name="mbti"
              value={formData.mbti}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-200 focus:border-[#F3E2D3] focus:ring-[#F3E2D3] focus:ring-2 outline-none transition-all"
            >
              <option value="">MBTI 선택</option>
              {mbtiOptions.map((mbti) => (
                <option key={mbti} value={mbti}>
                  {mbti}
                </option>
              ))}
            </select>
          </div>

          {/* 연애스타일 */}
          <div className="flex flex-col gap-3">
            <label className="font-medium text-[#584848]">연애스타일</label>
            <textarea
              name="datingStyle"
              value={formData.datingStyle}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-200 focus:border-[#F3E2D3] focus:ring-[#F3E2D3] focus:ring-2 outline-none transition-all resize-none"
              placeholder="당신의 연애스타일을 설명해주세요"
              rows={3}
            />
          </div>

          {/* 연애 가치관 */}
          <div className="flex flex-col gap-3">
            <label className="font-medium text-[#584848]">연애 가치관</label>
            <textarea
              name="values"
              value={formData.values}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-200 focus:border-[#F3E2D3] focus:ring-[#F3E2D3] focus:ring-2 outline-none transition-all resize-none"
              placeholder="연애에서 중요하게 생각하는 가치관을 적어주세요"
              rows={3}
            />
          </div>

          {/* 취미 & 관심사 */}
          <div className="flex flex-col gap-3">
            <label className="font-medium text-[#584848]">취미 & 관심사</label>
            <textarea
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-200 focus:border-[#F3E2D3] focus:ring-[#F3E2D3] focus:ring-2 outline-none transition-all resize-none"
              placeholder="취미와 관심사를 적어주세요"
              rows={3}
            />
          </div>

          {/* 제출 버튼 */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#F3E2D3] hover:bg-[#ebd3c0] text-[#584848] font-bold py-4 px-6 rounded-2xl 
                transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-lg
                flex items-center justify-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                // TODO: 제출 로직 추가
                console.log('Form submitted:', formData);
              }}
            >
              <span>나의 이상형 찾기</span>
              <span className="text-xl">💘</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
