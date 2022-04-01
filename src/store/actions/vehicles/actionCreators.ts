import * as actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import vehicleService from "../../../services/vehicleService";
import ownerService from "../../../services/ownerService";

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
      const brandOptions = await vehicleService.fetchBrandsService();
      const modelOptions = await vehicleService.fetchModelsService();
      const vehicleTypeOptions =
        await vehicleService.fetchVehicleTypesService();
      const colorOptions = await vehicleService.fetchColorsService();
      const ownerOptions = await ownerService.fetchOwnersService();
      const actionSuccess: VehicleAction = {
        type: actionTypes.FETCH_VEHICLE_SUCCESS,
        vehicles,
        brandOptions,
        modelOptions,
        vehicleTypeOptions,
        colorOptions,
        ownerOptions,
      };
      dispatch(actionSuccess);
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
