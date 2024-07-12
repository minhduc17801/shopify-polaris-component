import type { ReactElement } from 'react';

export type DateTime = string;

export interface Field<TValue> {
  value: TValue;
  onChange(value: TValue): void;
  onBlur?: () => void;
  error?: string | ReactElement | (string | ReactElement)[];
}
