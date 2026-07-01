import "./LikeContainer.css";

import { BsHeart, BsHeartFill } from "react-icons/bs";

const LikeContainer = ({ photo, user, handleLike }) => {
  return (
    <div className="like">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill
              className="heart-color"
              onClick={() => handleLike(photo)}
            />
          ) : (
            <BsHeart color="#e0d7ff" onClick={() => handleLike(photo)} />
          )}
          <p>
            {photo.likes.length === 0 && "0 curtidas"}
            {photo.likes.length === 1 && "1 curtida"}
            {photo.likes.length > 1 && `${photo.likes.length} curtidas`}
          </p>
        </>
      )}
    </div>
  );
};

export default LikeContainer;
