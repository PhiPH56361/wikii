
import React, { useState, useCallback } from 'react';
import { searchWikipedia } from './services/geminiService';
import type { Source } from './types';
import SearchInput from './components/SearchInput';
import ResultDisplay from './components/ResultDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { WikipediaIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialState, setIsInitialState] = useState<boolean>(true);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setError('Vui lòng nhập chủ đề bạn muốn tìm kiếm.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary('');
    setSources([]);
    setIsInitialState(false);

    try {
      const result = await searchWikipedia(query);
      if (result.summary) {
        setSummary(result.summary);
      } else {
        setError('Không thể tạo bản tóm tắt. Vui lòng thử lại.');
      }
      setSources(result.sources);
    } catch (e) {
      console.error(e);
      setError('Đã có lỗi xảy ra khi giao tiếp với AI. Vui lòng kiểm tra lại API key và thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <main className="bg-slate-900 min-h-screen w-full flex flex-col items-center text-slate-200 p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        <header className="text-center mt-8 sm:mt-12">
          <div className="flex items-center justify-center gap-4">
             <WikipediaIcon />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
              Trợ lý Wikipedia
            </h1>
          </div>
          <p className="mt-4 text-slate-400 text-lg">
            Nhận tóm tắt nhanh chóng về bất kỳ chủ đề nào từ Wikipedia, được cung cấp bởi AI.
          </p>
        </header>

        <SearchInput
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        <div className="bg-slate-800/50 rounded-xl p-6 min-h-[300px] w-full flex flex-col justify-center border border-slate-700 shadow-lg">
          {isInitialState && (
            <div className="text-center text-slate-500">
              <p>Nhập một chủ đề vào ô tìm kiếm ở trên để bắt đầu.</p>
              <p className="mt-2">Ví dụ: "Lịch sử của Trí tuệ nhân tạo"</p>
            </div>
          )}
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-400 text-center">{error}</p>}
          {!isLoading && !error && summary && (
            <ResultDisplay summary={summary} sources={sources} />
          )}
        </div>
        
        <footer className="text-center text-slate-500 text-sm py-4">
          <p>Cung cấp bởi Google Gemini API. Kết quả có thể không chính xác.</p>
        </footer>
      </div>
    </main>
  );
};

export default App;
