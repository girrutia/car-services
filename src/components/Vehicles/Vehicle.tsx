import * as React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

type Props = {
  vehicle: IVehicle;
  editing: boolean;
  editVehicleHandler: (vehicle: IVehicle) => VehicleAction;
  removeVehicleHandler: (
    vehicle: IVehicle
  ) => (dispatch: VehicleDispatchType) => void;
};

const Vehicle: React.FC<Props> = ({
  vehicle,
  editing,
  editVehicleHandler,
  removeVehicleHandler,
}) => {
  const dispatch: Dispatch<any> = useDispatch();

  const remove = React.useCallback(
    (vehicle: IVehicle) => dispatch(removeVehicleHandler(vehicle)),
    [dispatch, removeVehicleHandler]
  );

  const edit = (vehicle: IVehicle) => editVehicleHandler(vehicle);

  return (
    <div className="Generic">
      <div>
        <h1>{`${vehicle.brand?.label} - ${vehicle.model?.label} (${vehicle.year})`}</h1>
        <p>{`${vehicle.vehicleType?.label} - ${vehicle.color?.label} - ${vehicle.patent}`}</p>
      </div>
      <div>
        <button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            var rootElement = document.documentElement;
            rootElement.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            edit(vehicle);
          }}
          id="edit-btn"
          disabled={editing}
        >
          Edit
        </button>
        <button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            remove(vehicle);
          }}
          id="delete-btn"
          disabled={editing}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Vehicle;
