import * as actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import serviceService from "../../../services/serviceService";
import vehicleService from "../../../services/vehicleService";

export function addService(service: IService) {
  try {
    const actionInit: ServiceAction = {
      type: actionTypes.ADD_SERVICE_INIT,
      service,
    };
    const actionSuccess: ServiceAction = {
      type: actionTypes.ADD_SERVICE_SUCCESS,
      service,
    };
    return simulateHttpRequest(actionInit, actionSuccess);
  } catch (error) {
    const actionFailure: ServiceAction = {
      type: actionTypes.ADD_SERVICE_FAILURE,
      service,
      error: { message: `An error occured: ${error}` },
    };
    return (dispatch: ServiceDispatchType) => {
      dispatch(actionFailure);
      toast.error(actionFailure.error?.message);
    };
  }
}

export function updateService(service: IService) {
  try {
    const actionInit: ServiceAction = {
      type: actionTypes.UPDATE_SERVICE_INIT,
      service,
    };
    const actionSuccess: ServiceAction = {
      type: actionTypes.UPDATE_SERVICE_SUCCESS,
      service,
    };
    return simulateHttpRequest(actionInit, actionSuccess);
  } catch (error) {
    const actionFailure: ServiceAction = {
      type: actionTypes.UPDATE_SERVICE_FAILURE,
      service,
      error: { message: `An error occured: ${error}` },
    };
    return (dispatch: ServiceDispatchType) => {
      dispatch(actionFailure);
      toast.error(actionFailure.error?.message);
    };
  }
}

export function editService() {
  const action: ServiceAction = {
    type: actionTypes.EDIT_SERVICE,
  };
  return action;
}

export function cancelEditService() {
  const action: ServiceAction = {
    type: actionTypes.CANCEL_EDIT_SERVICE,
  };
  return action;
}

export function removeService(service: IService) {
  try {
    const actionInit: ServiceAction = {
      type: actionTypes.REMOVE_SERVICE_INIT,
      service,
    };
    const actionSuccess: ServiceAction = {
      type: actionTypes.REMOVE_SERVICE_SUCCESS,
      service,
    };
    return simulateHttpRequest(actionInit, actionSuccess);
  } catch (error) {
    const actionFailure: ServiceAction = {
      type: actionTypes.REMOVE_SERVICE_FAILURE,
      service,
      error: { message: `An error occured: ${error}` },
    };
    return (dispatch: ServiceDispatchType) => {
      dispatch(actionFailure);
      toast.error(actionFailure.error?.message);
    };
  }
}

export function fetchServices() {
  return async (dispatch: ServiceDispatchType) => {
    try {
      const actionInit: ServiceAction = {
        type: actionTypes.FETCH_SERVICE_INIT,
      };
      dispatch(actionInit);
      const services = await serviceService.fetchServicesService();
      const serviceTypeOptions = await serviceService.fetchServiceTypeService();
      const vehicleOptions = await vehicleService.fetchVehiclesService();
      const actionSuccess: ServiceAction = {
        type: actionTypes.FETCH_SERVICE_SUCCESS,
        services,
        serviceTypeOptions,
        vehicleOptions,
      };
      dispatch(actionSuccess);
    } catch (error) {
      const actionFailure: ServiceAction = {
        type: actionTypes.FETCH_SERVICE_FAILURE,
        error: { message: `An error occured: ${error}` },
      };
      dispatch(actionFailure);
    }
  };
}

export function simulateHttpRequest(
  actionInit: ServiceAction,
  actionSuccess: ServiceAction
) {
  return (dispatch: ServiceDispatchType) => {
    dispatch(actionInit);
    setTimeout(() => {
      dispatch(actionSuccess);
      toast.success(`Operation successfully!`);
    }, 1500);
  };
}
