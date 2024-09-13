'use client';

import {
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useCallback,
} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useAppDispatch } from '../../../store/store';
import { setGraphiqlQuery } from '../../../store/graphiqlFeatures/graphiqlSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function QueryCodeEditor({
  updateUrl,
  value,
  setValue,
}: {
  updateUrl: () => void;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onChange = useCallback(
    (value: string) => {
      if (/^[\x00-\x7F]*$/.test(value)) {
        setValue(value);
        dispatch(setGraphiqlQuery(value));
      } else {
        toast.error(t('latin_warning'));
      }
    },
    [dispatch, setValue, t]
  );

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const isModifierKey = event.ctrlKey || event.metaKey || event.altKey;
      const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Tab',
        'Enter',
        'Escape',
        'Shift',
      ];

      if (
        isModifierKey ||
        allowedKeys.includes(event.key) ||
        /[\{\}\[\]\(\)]/.test(event.key)
      ) {
        return;
      }

      if (/^[\x00-\x7F]$/.test(event.key)) {
        return;
      }

      event.preventDefault();

      toast.error(t('latin_warning'));
    },
    [t]
  );

  return (
    <CodeMirror
      value={value}
      height="200px"
      extensions={[json()]}
      onChange={onChange}
      style={{
        fontSize: '20px',
        color: '#65558F',
      }}
      onBlur={updateUrl}
      onKeyDown={handleKeyDown}
    />
  );
}
export default QueryCodeEditor;
