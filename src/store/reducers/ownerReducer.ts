import * as actionTypes from "../actions/owners/actionTypes";

const initialState: OwnerState = {
  owners: [],
};

const ownerReducer = (
  state: OwnerState = initialState,
  action: OwnerAction
): OwnerState => {
  switch (action.type) {
    case actionTypes.ADD_OWNER_INIT:
    case actionTypes.UPDATE_OWNER_INIT:
    case actionTypes.REMOVE_OWNER_INIT:
    case actionTypes.FETCH_OWNER_INIT:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case actionTypes.ADD_OWNER_FAILURE:
    case actionTypes.UPDATE_OWNER_FAILURE:
    case actionTypes.REMOVE_OWNER_FAILURE:
    case actionTypes.FETCH_OWNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.ADD_OWNER_SUCCESS:
      if (!action.owner) return state;
      const { name, surname } = action.owner;
      const newOwner: IOwner = {
        id: Math.random(), // not really unique
        name,
        surname,
      };
      return {
        ...state,
        owners: state.owners.concat(newOwner),
        loading: false,
        error: {},
      };
    case actionTypes.UPDATE_OWNER_SUCCESS:
      if (!action.owner) return state;
      const idx = state.owners.findIndex((x) => x.id === action.owner?.id);
      const newOwners: IOwner[] = [
        ...state.owners.slice(0, idx),
        action.owner,
        ...state.owners.slice(idx + 1),
      ];
      return {
        ...state,
        owners: newOwners,
        loading: false,
        error: {},
      };
    case actionTypes.REMOVE_OWNER_SUCCESS:
      if (!action.owner) return state;
      const { id } = action.owner;
      const updatedOwners: IOwner[] = state.owners.filter(
        (owner) => owner.id !== id
      );
      return {
        ...state,
        owners: updatedOwners,
        loading: false,
        error: {},
      };
    case actionTypes.FETCH_OWNER_SUCCESS:
      if (!action.owners) return state;
      return {
        ...state,
        owners: action.owners,
        loading: false,
        error: {},
      };
  }
  return state;
};

export default ownerReducer;
