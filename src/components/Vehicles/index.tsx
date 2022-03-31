import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles.css";
import { getYearOptions } from "../../utils";
import Vehicle from "./Vehicle";
import AddVehicle from "./AddVehicle";
import {
  addVehicle,
  editVehicle,
  cancelEditVehicle,
  updateVehicle,
  removeVehicle,
  fetchVehicles,
} from "../../store/actions/vehicles/actionCreators";
import { Dispatch } from "redux";
import Spinner from "../../shared/components/spinner";

const VehiclesPage: React.FC = () => {
  const vehicleState: VehicleState = useSelector(
    (state: RootState) => state.vehicle
  );
  const ownerState: OwnerState = useSelector(
    (state: RootState) => state.owner
  );
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [brandOptions, setBrandOptions] = useState<ComboType[]>([]);
  const [allModelOptions, setAllModelOptions] = useState<ComboType[]>([]);
  const [modelOptions, setModelOptions] = useState<ComboType[]>([]);
  const [colorOptions, setColorOptions] = useState<ComboType[]>([]);
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState<ComboType[]>([]);
  const [ownerOptions, setOwnerOptions] = useState<ComboType[]>([]);
  const [formData, setFormData] = useState<IVehicle | undefined>();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>();

  const loading: boolean = !!vehicleState.loading;
  const editing: boolean = !!vehicleState.editing;

  const dispatch: Dispatch<any> = useDispatch();

  const saveVehicleHandler = React.useCallback(
    (vehicle: IVehicle) =>
      dispatch(vehicle.id ? updateVehicle(vehicle) : addVehicle(vehicle)),
    [dispatch]
  );

  const editVehicleHandler = React.useCallback(
    (vehicle: IVehicle) => {
      setFormData((prevState) => ({ ...prevState, ...vehicle }));
      return dispatch(editVehicle());
    },
    [dispatch]
  );

  const cancelEditVehicleHandler = React.useCallback(
    () => dispatch(cancelEditVehicle()),
    [dispatch]
  );

  const fetchVehiclesHandler = React.useCallback(
    () => dispatch(fetchVehicles()),
    [dispatch]
  );

  useEffect(() => {
    fetchVehiclesHandler();
  }, []);

  useEffect(() => {
    if (vehicleState.vehicles) {
      setVehicles(vehicleState.vehicles);
    }
    if (vehicleState.brands) {
      setBrandOptions(
        vehicleState.brands.map((o) => ({
          value: o.id,
          label: o.name,
        }))
      );
    }
    if (vehicleState.models) {
      setAllModelOptions(
        vehicleState.models.map((o) => ({
          value: o.id,
          label: o.name,
        }))
      );
    }
    if (vehicleState.colors) {
      setColorOptions(
        vehicleState.colors.map((o) => ({
          value: o.id,
          label: o.label,
        }))
      );
    }
    if (vehicleState.vehicleTypes) {
      setVehicleTypeOptions(
        vehicleState.vehicleTypes.map((o) => ({
          value: o.id,
          label: o.name,
        }))
      );
    }
    if (vehicleState.owners) {
      setOwnerOptions(
        vehicleState.owners.map((o) => ({
          value: o.id || `${o.name} ${o.surname}`,
          label: `${o.name} ${o.surname}`,
        }))
      );
    }
  }, [vehicleState]);

  useEffect(() => {
    let filteredModelOptions: ComboType[] = [];
    if (selectedOptions?.brand) {
      const filteredModels: IModel[] =
        vehicleState.models.filter(
          (m) =>
            m.id_brand ===
            parseInt((selectedOptions.brand?.value || "").toString())
        ) || [];
      filteredModelOptions = filteredModels.map((m) => ({
        value: m.id,
        label: m.name,
      }));
    }
    setModelOptions(filteredModelOptions);
  }, [selectedOptions?.brand]);

  return (
    <div className="vehiclesContainer">
      {loading && <Spinner />}
      <h1>Vehicles</h1>
      <AddVehicle
        formData={formData}
        saveVehicleHandler={saveVehicleHandler}
        cancelEditHandler={cancelEditVehicleHandler}
        brandOptions={brandOptions}
        colorOptions={colorOptions}
        modelOptions={modelOptions}
        vehicleTypeOptions={vehicleTypeOptions}
        yearOptions={getYearOptions()}
        ownerOptions={ownerOptions}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      {vehicles?.map((vehicle: IVehicle) => (
        <Vehicle
          key={vehicle.id}
          vehicle={vehicle}
          removeVehicleHandler={removeVehicle}
          editVehicleHandler={editVehicleHandler}
          editing={editing}
        />
      ))}
    </div>
  );
};

export default VehiclesPage;
