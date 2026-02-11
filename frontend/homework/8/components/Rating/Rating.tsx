import "./Rating.scss";

interface Props {
  value:number;
}

const Rating=({value}:Props) => {
  return <span className="rating">⭐{value.toFixed(1)}</span>;
};

export default Rating;
