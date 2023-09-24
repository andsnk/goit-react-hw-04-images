import React from 'react';
import { MdImageNotSupported } from 'react-icons/md';
import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={css.errorWrap}>
      <MdImageNotSupported className={css.errorIcon} />
      <div className={css.errorTextWrap}>
        <h2>Oops, something is wrong</h2>
        <p>Check your internet connection and we'll check ours.</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
