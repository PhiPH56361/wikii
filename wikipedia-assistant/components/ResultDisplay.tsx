
import React from 'react';
import type { Source } from '../types';
import { LinkIcon } from './IconComponents';

interface ResultDisplayProps {
  summary: string;
  sources: Source[];
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ summary, sources }) => {
  const formattedSummary = summary.split('\n').map((paragraph, index) => (
    <p key={index} className="mb-4 last:mb-0">
      {paragraph}
    </p>
  ));

  return (
    <div className="animate-fade-in">
      <div className="prose prose-invert prose-lg max-w-none text-slate-300">
        {formattedSummary}
      </div>

      {sources.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-700">
          <h3 className="text-xl font-semibold text-slate-200 mb-4">Nguồn tham khảo:</h3>
          <ul className="space-y-3">
            {sources.map((source, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-400 mt-1"><LinkIcon /></span>
                <a
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
