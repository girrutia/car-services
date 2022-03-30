import * as React from "react";

type Props = {
  formData: IOwner | undefined;
  saveOwnerHandler: (owner: IOwner | any) => (dispatch: OwnerDispatchType) => void;
};

const AddOwner: React.FC<Props> = ({ formData, saveOwnerHandler }) => {
  const initialState: IOwner = {
    name: "",
    surname: "",
  };
  const [owner, setOwner] = React.useState<IOwner>(initialState);

  React.useEffect(() => {
    if (formData) {
      setOwner(Object.assign(initialState, formData));
    }
  }, [formData]);

  const handleData = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOwner({
      ...owner,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const isFormValid = () => owner.name !== "" && owner.surname !== "";

  const addNewOwner = (e: React.FormEvent) => {
    e.preventDefault();
    saveOwnerHandler(owner);
    setOwner(initialState);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    e?.preventDefault();
    setOwner(initialState);
  };

  return (
    <form onSubmit={addNewOwner} autoComplete="off" className="Add-generic">
      <input
        type="text"
        id="name"
        placeholder="Name..."
        onChange={handleData}
        value={owner.name}
      />
      <input
        type="text"
        id="surname"
        placeholder="Surname..."
        onChange={handleData}
        value={owner.surname}
      />
      <button disabled={!isFormValid()} type="submit">
        {owner.id ? "Update" : "Add New"}
      </button>
      <button onClick={handleCancel} type="button" id="cancel-btn">
        Cancel
      </button>
    </form>
  );
};

export default AddOwner;
