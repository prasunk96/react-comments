import React, { useState } from 'react';
import './style.css';
import Comment from './Comment.js';
import InputComment from './InputComment.js';
import Button from './Button.js';

const commentData = {
  title: 'Fake article title.',
  author: 'grzm',
  comments: [
    {
      id: 1,
      text: 'Example comment here.',
      author: 'user2',
      child: [
        {
          id: 2,
          text: 'Another example comment text.',
          author: 'user3',
          child: [
            {
              id: 3,
              text: 'Another example comment text.',
              author: 'user4',
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 4,
      text: 'Example comment here 2.',
      author: 'user5',
      child: []
    }
  ]
};

export default function App() {
  const [commentsList, setCommentsList] = useState([]);
  const [comment, setComment] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);

  const handleAddComment = () => {
    const id = new Date().toISOString();
    const newComment = {
      id,
      text: comment,
      child: []
    };
    setCommentsList([newComment, ...commentsList]);
  };

  const handleShowButton = () => {
    return isAddingComment ? (
      <Button
        text="Discard"
        callBack={() => {
          setIsAddingComment(false);
          setComment('');
        }}
      />
    ) : (
      <Button text="Comment" callBack={() => setIsAddingComment(true)} />
    );
  };

  return (
    <div>
      <div>
        {isAddingComment && (
          <InputComment
            value={comment}
            onChange={setComment}
            hadleAddComment={handleAddComment}
          />
        )}
        {handleShowButton()}
      </div>
      {commentsList.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          type="parent"
          commentsList={commentsList}
          setCommentsList={setCommentsList}
        />
      ))}
    </div>
  );
}
