import React from 'react';

const Button = ({ text, callBack }) => {
  const handleClick = () => {
    callBack();
  };
  return <button onClick={handleClick}>{text}</button>;
};

export default Button;
