import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles.css";

import Owner from "./Owner";
import AddOwner from "./AddOwner";
import {
  addOwner,
  updateOwner,
  removeOwner,
  fetchOwners,
} from "../../store/actions/owners/actionCreators";
import { Dispatch } from "redux";
import Spinner from "../../shared/components/spinner";

const OwnersPage: React.FC = () => {
  const ownerState: OwnerState = useSelector((state: RootState) => state.owner);
  const [owners, setOwners] = useState<IOwner[]>([]);
  const [formData, setFormData] = useState<IOwner | undefined>();

  const loading: boolean = !!ownerState.loading;

  const dispatch: Dispatch<any> = useDispatch();

  const saveOwnerHandler = React.useCallback(
    (owner: IOwner) =>
      dispatch(owner.id ? updateOwner(owner) : addOwner(owner)),
    [dispatch]
  );

  const editOwnerHandler = (owner: IOwner) => {
    setFormData((prevState) => ({ ...prevState, ...owner }));
  };

  const fetchOwnersHandler = React.useCallback(
    () => dispatch(fetchOwners()),
    [dispatch]
  );

  useEffect(() => {
    fetchOwnersHandler();
  }, []);

  useEffect(() => {
    if (ownerState.owners.length > 0) {
      setOwners(ownerState.owners);
    }
  }, [ownerState.owners]);

  return (
    <div className="ownersContainer">
      {loading && <Spinner />}
      <h1>Owners</h1>
      <AddOwner formData={formData} saveOwnerHandler={saveOwnerHandler} />
      {owners?.map((owner: IOwner) => (
        <Owner
          key={owner.id}
          owner={owner}
          removeOwnerHandler={removeOwner}
          editOwnerHandler={editOwnerHandler}
        />
      ))}
    </div>
  );
};

export default OwnersPage;
