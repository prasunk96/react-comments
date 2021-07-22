import React, { useState } from 'react';
import Button from './Button';
import InputComment from './InputComment.js';

const Comment = ({ comment, type, commentsList, setCommentsList }) => {
  const [replyComment, setReplyComment] = useState('');
  const [isReplyig, setIsReplying] = useState(false);

  const nestedChild = (comment.child || []).map(comment => {
    return (
      <Comment
        key={comment.id}
        comment={comment}
        type="child"
        commentsList={commentsList}
        setCommentsList={setCommentsList}
      />
    );
  });

  const handleReplyButton = () => {
    return isReplyig ? (
      <Button
        text="Discard"
        callBack={() => {
          setIsReplying(false);
          setReplyComment('');
        }}
      />
    ) : (
      <Button text="Reply" callBack={() => setIsReplying(true)} />
    );
  };

  const findAndReplaceKeyInObject = (item, find, newReply) => {
    for (let key in item) {
      if (item[key] instanceof Array || typeof item[key] == 'object') {
        findAndReplaceKeyInObject(item[key], find, newReply);
      } else if (key == 'id' && item[key] == find) {
        item.child = [newReply, ...item.child];
        break;
      }
    }
    return item;
  };

  const handleReplyToComment = id => {
    const newId = new Date().toISOString();
    const newReply = {
      id: newId,
      text: replyComment,
      child: []
    };
    const tempList = [...commentsList];
    const res = findAndReplaceKeyInObject(tempList, id, newReply);
    res && setCommentsList(res);
    setIsReplying(false);
  };

  return (
    <div style={{ marginLeft: '25px', marginTop: '10px' }}>
      <div>
        <p>{comment.text}</p>
        {isReplyig && (
          <InputComment
            value={replyComment}
            onChange={setReplyComment}
            hadleAddComment={() => handleReplyToComment(comment.id)}
          />
        )}
        {handleReplyButton()}
      </div>
      {nestedChild}
    </div>
  );
};

export default Comment;
