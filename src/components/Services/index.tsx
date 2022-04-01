import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles.css";
import Service from "./Service";
import AddService from "./AddService";
import {
  addService,
  editService,
  cancelEditService,
  updateService,
  removeService,
  fetchServices,
} from "../../store/actions/services/actionCreators";
import { Dispatch } from "redux";
import Spinner from "../../shared/components/spinner";

const ServicesPage: React.FC = () => {
  const serviceState: ServiceState = useSelector(
    (state: RootState) => state.service
  );
  const vehicleState: VehicleState = useSelector(
    (state: RootState) => state.vehicle
  );
  const [services, setServices] = useState<IService[]>([]);
  const [serviceTypeOptions, setServiceTypeOptions] = useState<ComboType[]>([]);
  const [serviceOptions, setVehicleOptions] = useState<ComboType[]>([]);
  const [formData, setFormData] = useState<IService | undefined>();

  const loading: boolean = !!serviceState.loading;
  const editing: boolean = !!serviceState.editing;

  const dispatch: Dispatch<any> = useDispatch();

  const saveServiceHandler = React.useCallback(
    (service: IService) =>
      dispatch(service.id ? updateService(service) : addService(service)),
    [dispatch]
  );

  const editServiceHandler = React.useCallback(
    (service: IService) => {
      setFormData((prevState) => ({ ...prevState, ...service }));
      return dispatch(editService());
    },
    [dispatch]
  );

  const cancelEditServiceHandler = React.useCallback(
    () => dispatch(cancelEditService()),
    [dispatch]
  );

  const fetchServicesHandler = React.useCallback(
    () => dispatch(fetchServices()),
    [dispatch]
  );

  useEffect(() => {
    fetchServicesHandler();
  }, []);

  useEffect(() => {
    if (serviceState.services) {
      setServices(serviceState.services);
    }
    if (serviceState.serviceTypeOptions) {
      setServiceTypeOptions(
        serviceState.serviceTypeOptions.map((o) => ({
          value: o.id,
          label: o.name,
        }))
      );
    }
    if (serviceState.vehicleOptions) {
      setVehicleOptions(
        serviceState.vehicleOptions.map((o) => ({
          value: o.id || 0,
          label: `${o.brand?.label} ${o.model?.label} (${o.year}), Patent: ${o.patent}`,
        }))
      );
    }
  }, [serviceState]);

  return (
    <div className="vehiclesContainer">
      {loading && <Spinner />}
      <h1>Services</h1>
      <AddService
        formData={formData}
        saveServiceHandler={saveServiceHandler}
        cancelEditHandler={cancelEditServiceHandler}
        serviceTypeOptions={serviceTypeOptions}
        vehicleOptions={serviceOptions}
      />
      {services?.map((service: IService) => (
        <Service
          key={service.id}
          service={service}
          removeServiceHandler={removeService}
          editServiceHandler={editServiceHandler}
          editing={editing}
        />
      ))}
    </div>
  );
};

export default ServicesPage;
