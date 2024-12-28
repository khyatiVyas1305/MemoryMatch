import "./SingleCard.css";

export default function SingleCard({ card, handleChoices, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoices(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img
          src={"img/cover.jpeg"}
          className="back-card"
          onClick={handleClick}
          alt="Back card"
        />
        <img src={card.src} className="front-card" alt="Front card" />
      </div>
    </div>
  );
}
