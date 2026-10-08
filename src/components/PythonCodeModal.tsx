import React, { useState } from 'react';
import { PYTHON_SCRIPTS } from '../utils/pythonCodeSnippets';
import { X, Copy, Check, Code2, Terminal } from 'lucide-react';

interface PythonCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PythonCodeModal: React.FC<PythonCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeScriptIndex, setActiveScriptIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentScript = PYTHON_SCRIPTS[activeScriptIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentScript.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Beginner-Friendly Python Scripts for Data Science Project</h3>
              <p className="text-[11px] text-slate-500">Clean, copyable code using pandas, scikit-learn, and matplotlib</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Script Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 px-4 py-2 gap-2 text-xs">
          {PYTHON_SCRIPTS.map((script, idx) => (
            <button
              key={script.id}
              onClick={() => setActiveScriptIndex(idx)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                activeScriptIndex === idx
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {script.title.split('.')[0]}. {script.title.split('.')[1]?.trim().slice(0, 24)}...
            </button>
          ))}
        </div>

        {/* Code Content Viewport */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">{currentScript.title}</span>
              <span className="text-xs text-slate-400">{currentScript.description}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shrink-0 shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-white" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed select-all">
            <code>{currentScript.code}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Ready to execute in Jupyter Notebook, Google Colab, or VS Code</span>
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
