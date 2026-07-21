import "./Home.css";

// components
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// redux
import { getPhotos, like } from "../../slices/photoSlice";

const Home = () => {
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);

  // load all photos
  const [page, setPage] = useState(1);
  const { photos, loading, hasMore } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getPhotos(page));
  }, [dispatch, page]);

  // detecta scroll perto do fim
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (nearBottom && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // like a photo
  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  return (
    <div id="home">
      {photos &&
        photos.map((photo, index) => (
          <div key={photo._id + index} className="posts">
            <PhotoItem photo={photo} />
            <div id="post-details">
              <h3>{photo.title}</h3>

              <div className="details">
                <div className="likes">
                  <LikeContainer
                    photo={photo}
                    user={user}
                    handleLike={handleLike}
                  />
                </div>
                <Link id="btn" to={`/photos/${photo._id}`}>
                  Ver mais
                </Link>
              </div>
            </div>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,{" "}
          <Link to={`/users/${user._id}`}>Clique aqui</Link>
        </h2>
      )}
      {loading && <p className="loading-more">Carregando...</p>}
      {!hasMore && <p className="no-more">Você chegou ao fim!</p>}
    </div>
  );
};

export default Home;
