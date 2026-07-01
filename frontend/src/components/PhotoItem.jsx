import "./PhotoItem.css";

import { uploads } from "../utils/config";
import { Link } from "react-router-dom";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const PhotoItem = ({ photo }) => {
  return (
    <div className="photo-item">
      <div id="profile-image">
        {photo.userImage && (
          <img
            src={`${uploads}/users/${photo.userImage}`}
            alt={photo.userName}
          />
        )}
        <div>
          <p className="photo-author">
            <Link to={`/users/${photo.userId}`} className="main-color">{photo.userName}</Link>
          </p>
          {photo.createdAt && (
            <p id="p-size">
              {formatDistanceToNow(new Date(photo.createdAt), {
                addSuffix: true,
                locale: ptBR,
              })}
            </p>
          )}
        </div>
      </div>
      <p></p>
      {photo.image && (
        <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
      )}
    </div>
  );
};

export default PhotoItem;
