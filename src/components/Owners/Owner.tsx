import * as React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

type Props = {
  owner: IOwner;
  editOwnerHandler: (owner: IOwner) => void;
  removeOwnerHandler: (owner: IOwner) => (dispatch: OwnerDispatchType) => void;
};

const Owner: React.FC<Props> = ({
  owner,
  editOwnerHandler,
  removeOwnerHandler,
}) => {
  const dispatch: Dispatch<any> = useDispatch();

  const remove = React.useCallback(
    (owner: IOwner) => dispatch(removeOwnerHandler(owner)),
    [dispatch, removeOwnerHandler]
  );

  const edit = React.useCallback(
    (owner: IOwner) => editOwnerHandler(owner),
    [editOwnerHandler]
  );

  return (
    <div className="Generic">
      <div>
        <p>{owner.name}</p>
        <h1>{owner.surname}</h1>
      </div>
      <div>
        <button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            var rootElement = document.documentElement;
            rootElement.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            edit(owner);
          }}
          id="edit-btn"
        >
          Edit
        </button>
        <button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            remove(owner);
          }}
          id="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Owner;
