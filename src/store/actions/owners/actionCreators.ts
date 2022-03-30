import * as actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import ownerService from "../../../services/ownerService";

export function addOwner(owner: IOwner) {
  try {
    const actionInit: OwnerAction = {
      type: actionTypes.ADD_OWNER_INIT,
      owner,
    };
    const actionSuccess: OwnerAction = {
      type: actionTypes.ADD_OWNER_SUCCESS,
      owner,
    };
    return simulateHttpRequest(actionInit, actionSuccess);
  } catch (error) {
    const actionFailure: OwnerAction = {
      type: actionTypes.ADD_OWNER_FAILURE,
      owner,
      error: { message: `An error occured: ${error}` },
    };
    return (dispatch: OwnerDispatchType) => {
      dispatch(actionFailure);
      toast.error(actionFailure.error?.message);
    };
  }
}

export function updateOwner(owner: IOwner) {
  try {
    const actionInit: OwnerAction = {
      type: actionTypes.UPDATE_OWNER_INIT,
      owner,
    };
    const actionSuccess: OwnerAction = {
      type: actionTypes.UPDATE_OWNER_SUCCESS,
      owner,
    };
    return simulateHttpRequest(actionInit, actionSuccess);
  } catch (error) {
    const actionFailure: OwnerAction = {
      type: actionTypes.UPDATE_OWNER_FAILURE,
      owner,
      error: { message: `An error occured: ${error}` },
    };
    return (dispatch: OwnerDispatchType) => {
      dispatch(actionFailure);
      toast.error(actionFailure.error?.message);
    };
  }
}

export function removeOwner(owner: IOwner) {
  try {
    const actionInit: OwnerAction = {
      type: actionTypes.REMOVE_OWNER_INIT,
      owner,
    };
    const actionSuccess: OwnerAction = {
      type: actionTypes.REMOVE_OWNER_SUCCESS,
      owner,
    };
    return simulateHttpRequest(actionInit, actionSuccess);
  } catch (error) {
    const actionFailure: OwnerAction = {
      type: actionTypes.REMOVE_OWNER_FAILURE,
      owner,
      error: { message: `An error occured: ${error}` },
    };
    return (dispatch: OwnerDispatchType) => {
      dispatch(actionFailure);
      toast.error(actionFailure.error?.message);
    };
  }
}

export function fetchOwners() {
  return async (dispatch: OwnerDispatchType) => {
    try {
      const actionInit: OwnerAction = {
        type: actionTypes.FETCH_OWNER_INIT,
      };
      dispatch(actionInit);
      const owners = await ownerService.fetchOwnersService();
      if (owners) {
        const actionSuccess: OwnerAction = {
          type: actionTypes.FETCH_OWNER_SUCCESS,
          owners,
        };
        dispatch(actionSuccess);
      }
    } catch (error) {
      const actionFailure: OwnerAction = {
        type: actionTypes.FETCH_OWNER_FAILURE,
        error: { message: `An error occured: ${error}` },
      };
      return (dispatch: OwnerDispatchType) => {
        dispatch(actionFailure);
        toast.error(actionFailure.error?.message);
      };
    }
  };
}

export function simulateHttpRequest(
  actionInit: OwnerAction,
  actionSuccess: OwnerAction
) {
  return (dispatch: OwnerDispatchType) => {
    dispatch(actionInit);
    setTimeout(() => {
      dispatch(actionSuccess);
      toast.success(`Operation successfully!`);
    }, 1500);
  };
}
