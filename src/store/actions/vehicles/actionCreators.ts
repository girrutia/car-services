import * as actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import vehicleService from "../../../services/vehicleService";

export function addVehicle(vehicle: IVehicle) {
  try {
    const actionInit: VehicleAction = {
      type: actionTypes.ADD_VEHICLE_INIT,
      vehicle,
    };
    const actionSuccess: VehicleAction = {
      type: actionTypes.ADD_VEHICLE_SUCCESS,
      vehicle,
    };
    return simulateHttpRequest(actionInit, actionSuccess);
  } catch (error) {
    const actionFailure: VehicleAction = {
      type: actionTypes.ADD_VEHICLE_FAILURE,
      vehicle,
      error: { message: `An error occured: ${error}` },
    };
    return (dispatch: VehicleDispatchType) => {
      dispatch(actionFailure);
      toast.error(actionFailure.error?.message);
    };
  }
}

export function updateVehicle(vehicle: IVehicle) {
  try {
    const actionInit: VehicleAction = {
      type: actionTypes.UPDATE_VEHICLE_INIT,
      vehicle,
    };
    const actionSuccess: VehicleAction = {
      type: actionTypes.UPDATE_VEHICLE_SUCCESS,
      vehicle,
    };
    return simulateHttpRequest(actionInit, actionSuccess);
  } catch (error) {
    const actionFailure: VehicleAction = {
      type: actionTypes.UPDATE_VEHICLE_FAILURE,
      vehicle,
      error: { message: `An error occured: ${error}` },
    };
    return (dispatch: VehicleDispatchType) => {
      dispatch(actionFailure);
      toast.error(actionFailure.error?.message);
    };
  }
}

export function editVehicle() {
  const action: VehicleAction = {
    type: actionTypes.EDIT_VEHICLE,
  };
  return action;
}

export function cancelEditVehicle() {
  const action: VehicleAction = {
    type: actionTypes.CANCEL_EDIT_VEHICLE,
  };
  return action;
}

export function removeVehicle(vehicle: IVehicle) {
  try {
    const actionInit: VehicleAction = {
      type: actionTypes.REMOVE_VEHICLE_INIT,
      vehicle,
    };
    const actionSuccess: VehicleAction = {
      type: actionTypes.REMOVE_VEHICLE_SUCCESS,
      vehicle,
    };
    return simulateHttpRequest(actionInit, actionSuccess);
  } catch (error) {
    const actionFailure: VehicleAction = {
      type: actionTypes.REMOVE_VEHICLE_FAILURE,
      vehicle,
      error: { message: `An error occured: ${error}` },
    };
    return (dispatch: VehicleDispatchType) => {
      dispatch(actionFailure);
      toast.error(actionFailure.error?.message);
    };
  }
}

export function fetchVehicles() {
  return async (dispatch: VehicleDispatchType) => {
    try {
      const actionInit: VehicleAction = {
        type: actionTypes.FETCH_VEHICLE_INIT,
      };
      dispatch(actionInit);
      const vehicles = await vehicleService.fetchVehiclesService();
      const brands = await vehicleService.fetchBrandsService();
      const models = await vehicleService.fetchModelsService();
      const vehicleTypes = await vehicleService.fetchVehicleTypesService();
      const colors = await vehicleService.fetchColorsService();
      if (vehicles && brands && models && vehicleTypes && colors) {
        const actionSuccess: VehicleAction = {
          type: actionTypes.FETCH_VEHICLE_SUCCESS,
          vehicles,
          brands,
          models,
          vehicleTypes,
          colors,
        };
        dispatch(actionSuccess);
      }
    } catch (error) {
      const actionFailure: VehicleAction = {
        type: actionTypes.FETCH_VEHICLE_FAILURE,
        error: { message: `An error occured: ${error}` },
      };
      dispatch(actionFailure);
    }
  };
}

export function simulateHttpRequest(
  actionInit: VehicleAction,
  actionSuccess: VehicleAction
) {
  return (dispatch: VehicleDispatchType) => {
    dispatch(actionInit);
    setTimeout(() => {
      dispatch(actionSuccess);
      toast.success(`Operation successfully!`);
    }, 1500);
  };
}
