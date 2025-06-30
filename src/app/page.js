'use client';

import { getSortedQuestionsData } from '@/lib/questions';
import Link from 'next/link';
import { useState, useMemo } from 'react';

const allQuestionsData = getSortedQuestionsData();

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredQuestions = useMemo(() => {
    return allQuestionsData
      .filter((question) => {
        const searchLower = searchQuery.toLowerCase();
        const titleLower = question.title.toLowerCase();
        const tagsMatch = question.tags.some(tag => tag.toLowerCase().includes(searchLower));
        return titleLower.includes(searchLower) || tagsMatch;
      })
      .filter((question) => {
        return selectedCategory === 'all' || question.category === selectedCategory;
      })
      .filter((question) => {
        return selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
      });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const allCategories = ['all', ...new Set(allQuestionsData.map(q => q.category))];
  const allDifficulties = ['all', ...new Set(allQuestionsData.map(q => q.difficulty))];


  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Interview Questions</h1>

        <div className="flex justify-center gap-4 mb-8">
            <input
                type="text"
                placeholder="Search by title or tag"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-xs p-2 border rounded"
            />
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded"
            >
                {allCategories.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
            </select>
            <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="p-2 border rounded"
            >
                {allDifficulties.map(d => <option key={d} value={d} className="capitalize">{d}</option>)}
            </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuestions.map(({ slug, title, tags, difficulty, category }) => (
            <div key={slug} className="bg-white rounded-lg shadow-md p-6">
              <Link href={`/questions/${slug}`}>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
              </Link>
              <div className="text-gray-600 mb-4">
                <span className="capitalize">{category}</span> - <span className="capitalize">{difficulty}</span>
              </div>
              <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <span key={tag} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 