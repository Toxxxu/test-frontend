import React from 'react';

import './styles/button.css';
import { ButtonProps } from './interface/button-props';

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled = false, type = 'button' }) => {
  return (
    <button
      className='button'
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
}

export { Button };