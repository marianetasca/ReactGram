import "./Photo.css";

import { uploads } from "../../utils/config";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { LuSendHorizontal } from "react-icons/lu";

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// redux
import { getPhoto, like, comment } from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo,
  );

  const [showAllComments, setShowAllComments] = useState(false);

  const displayedComments = showAllComments
    ? photo.comments
    : photo.comments?.slice(0, 3);

  // comentarios
  const [commentText, setCommentText] = useState("");

  // load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  // like and comentario
  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  };

  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(commentData));

    setCommentText("");
    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <div className="post">
        <PhotoItem photo={photo} />
        <div id="post-details">
          <h3> {photo.title}</h3>
          <hr id="hr" />
          <LikeContainer photo={photo} user={user} handleLike={handleLike} />
        </div>
      </div>

      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
      <div className="comments">
        {photo.comments && (
          <>
            <h3>Comentários ({photo.comments.length})</h3>
            <form onSubmit={handleComment}>
              <div className="comment-form">
                <input
                  className="comment"
                  type="text"
                  placeholder="Insira o seu comentário..."
                  required
                  onChange={(e) => setCommentText(e.target.value)}
                  value={commentText || ""}
                />
                <button type="submit" className="button">
                  <LuSendHorizontal size={20} color="white" />
                </button>
              </div>
            </form>
            {photo.comments.length === 0 && <p>Não há comentarios...</p>}
            {displayedComments.map((comment, index) => (
              <div className="comment-list" key={index}>
                <div className="author">
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}
                  <div>
                    <Link to={`/users/${comment.userId}`}>
                      <p>{comment.userName}</p>
                    </Link>
                    <p id="p-size">
                      {comment.createdAt &&
                        formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                    </p>
                  </div>
                </div>
                <p className="text">{comment.comment}</p>
              </div>
            ))}
            <div className="see">
              {photo.comments.length > 3 && !showAllComments && (
                <button
                  className="see-more"
                  onClick={() => setShowAllComments(true)}
                >
                  Ver mais
                </button>
              )}
              {photo.comments.length > 3 && showAllComments && (
                <button
                  className="see-more"
                  onClick={() => setShowAllComments(false)}
                >
                  Ver menos
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
