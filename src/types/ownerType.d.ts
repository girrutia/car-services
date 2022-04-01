interface IOwner {
  id?: number;
  name: string;
  surname: string;
}

type OwnerState = {
  owners: IOwner[];
  loading?: boolean;
  error?: ErrorCustomType;
};

interface OwnerAction {
  type: string;
  owner?: IOwner;
  error?: ErrorCustomType;
  owners?: IOwner[];
};

type OwnerDispatchType = (args: OwnerAction) => OwnerAction;
