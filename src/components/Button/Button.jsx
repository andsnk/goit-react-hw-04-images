import React from 'react';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <div className={css.loadMoreBtnCont}>
      <button onClick={onClick} type="button" className={css.loadMoreBtn}>
        Load More
      </button>
    </div>
  );
};

export default Button;
