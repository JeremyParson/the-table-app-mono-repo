import Draggable from "react-draggable";

type Props = {
  handout: Handout;
  handleClose: Function;
};

export default function HandoutSheet({ handout, handleClose }: Props) {
  return (
    <Draggable>
      <div className="w-64 bg-tea-green rounded-xl p-5">
        <h2><b>{handout.name}</b></h2>
        <img src={handout.image}></img>
        <p><b>{handout.description}</b></p>
        <button onClick={(_e) => handleClose()}>Close</button>
      </div>
    </Draggable>
  );
}
