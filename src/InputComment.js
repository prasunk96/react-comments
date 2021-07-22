import React from 'react';
import Button from './Button';

const InputComment = ({ value, onChange, hadleAddComment }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder={'comment'}
        onChange={e => onChange(e.target.value)}
      />
      <Button text="Add" callBack={hadleAddComment} />
    </div>
  );
};

export default InputComment;
