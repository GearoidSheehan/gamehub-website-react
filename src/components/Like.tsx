import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

interface Props {
  onClick: () => void;
}

const Like = ({ onClick }: Props) => {
  const [likeClicked, setLikeClicked] = useState(true);

  const toggle = () => {
    setLikeClicked(!likeClicked);
    onClick();
  };

  if (likeClicked) {
    return (
      <AiFillHeart color="#ff6b81" size={40} onClick={toggle}></AiFillHeart>
    );
  }
  return <AiFillHeart size={40} onClick={toggle}></AiFillHeart>;
};

export default Like;
