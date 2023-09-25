import { AiOutlineHome } from "react-icons/Ai";

export default function ReturnButton() {
  return (
    <a href="/" className="box box1">
      <i className="fancylogo">
        <AiOutlineHome />
      </i>
      <span className="text">Return to Frontpage</span>
      <span className="number">Home</span>
    </a>
  );
}
