import { useRef, useState, useEffect } from 'react';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import styles from './styles.module.scss';

export const Editor: React.FC = () => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const defalutLanguage = 'typescript';
  const allowedLanguages = [defalutLanguage, 'javascript', 'json', 'html', 'css'];
  const [language, setLanguage] = useState(defalutLanguage);
  const monacoEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setEditor((editor) => {
      if (editor) return editor;

      if (monacoEl.current === null) {
        throw new Error('Monaco Editor element is null');
      }

      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [],
        enableSchemaRequest: true,
        allowComments: true,
      });

      return monaco.editor.create(monacoEl.current, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
        language,
        theme: 'vs-dark',
      });
    });

    return () => editor?.dispose();
  }, [editor, language]);

  return (
    <>
      <select
        value={language}
        onChange={(e) => {
          const value = e.target.value;
          if (allowedLanguages.includes(value)) {
            setLanguage(value);
          }
        }}
      >
        {allowedLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <div className={styles.Editor} ref={monacoEl}></div>;
    </>
  );
};
