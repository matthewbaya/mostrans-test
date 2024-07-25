import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function CharacterCard({ character }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/character/" + character.id);
  };
  return (
    <div
      className="bg-image hover-overlay ripple col-3 "
      style={{ cursor: "pointer" }}
      onClick={handleNavigate}
    >
      <img src={character.image} alt={character.name} className="img-fluid" />
    </div>
  );
}

CharacterCard.propTypes = {
  character: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
