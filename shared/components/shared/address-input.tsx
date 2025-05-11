'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="b6f6f31910361dad1b21c0d3d06c1c2ed3822c12"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
