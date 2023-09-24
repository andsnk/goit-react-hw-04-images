import React from 'react';
import { MdPermMedia } from 'react-icons/md';
import css from './StartPage.module.css';

const StartPage = () => {
  return (
    <div className={css.startWrap}>
      <MdPermMedia className={css.startIcon} />
      <div className={css.startTextWrap}>
        <h2>Welcome to Pixabay Image Search</h2>
        <p>Get started by searching for beautiful images!</p>
      </div>
    </div>
  );
};

export default StartPage;
