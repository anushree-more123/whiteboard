import { useDispatch } from "react-redux";
import { StyledIconBox } from "./style";
import { handleDeleteShape } from "./WhiteboardActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const DeleteShape = () => {
  const dispatch = useDispatch();

  const handleDeleteOperation = () => {
    dispatch(handleDeleteShape());
  };

  return (
    <StyledIconBox onClick={() => handleDeleteOperation()} id="delete-element">
      <FontAwesomeIcon icon={faTrashCan} fontSize={"1.2rem"} />
    </StyledIconBox>
  );
};

export default DeleteShape;
