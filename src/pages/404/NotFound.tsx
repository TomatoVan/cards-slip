import React from 'react';

import { useNavigate } from 'react-router-dom';

import error404 from '../../assets/img/404.svg';
import { Button } from '../../components/button/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate('/');
  };

  return (
    <div className="notFound">
      <div className="notFound__container">
        <div className="notFound__elems">
          <div className="notFound__title">Oops!</div>
          <div className="notFound__descr">Sorry! Page not found!</div>
          <Button callBack={goBackHandler} title="Back to home page" submit={false} />
        </div>
        <img src={error404} alt="error" />
      </div>
    </div>
  );
};
