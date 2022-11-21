import { Heart } from "react-feather";

interface HealthBarProps {
  lives: {
    max: number;
    left: number;
  };
}

const HealthBar = ({ lives }: HealthBarProps) => {
  const arrayLives = [];
  for (let i = 0; i < lives.max; i++) {
    arrayLives.push(i < lives.left ? "red" : "none");
  }

  return (
    <div className="flex space-x-2 mb-8">
      {arrayLives.map((live) => (
        <Heart fill={live} />
      ))}
    </div>
  );
};

export default HealthBar;
