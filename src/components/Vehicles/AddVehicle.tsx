import * as React from "react";
import CustomSelect from "../../shared/components/Select";

type Props = {
  formData: IVehicle | undefined;
  saveVehicleHandler: (
    vehicle: IVehicle | any
  ) => (dispatch: VehicleDispatchType) => void;
  cancelEditHandler: () => VehicleAction;
  brandOptions: ComboType[];
  modelOptions: ComboType[];
  vehicleTypeOptions: ComboType[];
  colorOptions: ComboType[];
  yearOptions: ComboType[];
  ownerOptions: ComboType[];
  selectedOptions: SelectedOptions | undefined;
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<SelectedOptions | undefined>
  >;
};

const AddVehicle: React.FC<Props> = (props) => {
  const {
    formData,
    saveVehicleHandler,
    cancelEditHandler,
    brandOptions,
    modelOptions,
    vehicleTypeOptions,
    colorOptions,
    yearOptions,
    ownerOptions,
    selectedOptions,
    setSelectedOptions,
  } = props;
  const initialState: IVehicle = {
    brand: null,
    model: null,
    color: null,
    vehicleType: null,
    patent: "",
    year: 0,
    owner: null,
  };
  const [vehicle, setVehicle] = React.useState<IVehicle>(initialState);

  React.useEffect(() => {
    if (formData) {
      setVehicle(Object.assign(initialState, formData));
    }
  }, [formData]);

  const handleData = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVehicle({
      ...vehicle,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const option: ComboType = {
        value: e.target.value,
        label: e.target.options[e.target.selectedIndex].label,
      };
      const newTargetValue: any =
        e.target.id === "year" ? parseInt(option.label) : option;
      setSelectedOptions((prevState) => ({
        ...prevState,
        [e.target.id]: newTargetValue,
      }));
      setVehicle((prevState) => ({
        ...prevState,
        [e.target.id]: newTargetValue,
      }));
    }
  };

  const isFormValid = () =>
    !!vehicle.brand?.value &&
    !!vehicle.model?.value &&
    !!vehicle.vehicleType?.value &&
    !!vehicle.color?.value &&
    !!vehicle.patent &&
    !!vehicle.year &&
    !!vehicle.owner;

  const addNewVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    saveVehicleHandler(vehicle);
    setVehicle(initialState);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    e?.preventDefault();
    setVehicle(initialState);
    cancelEditHandler();
  };

  return (
    <form onSubmit={addNewVehicle} autoComplete="off" className="Add-generic">
      <table>
        <tbody>
          <tr>
            <td>
              <CustomSelect
                id="brand"
                options={brandOptions}
                placeholder="Select Brand..."
                addEmpty
                onChangeHandler={handleOnChange}
                selectedValue={vehicle?.brand?.value}
              />
            </td>
            <td>
              <CustomSelect
                id="model"
                options={modelOptions}
                placeholder="Select Model..."
                addEmpty
                onChangeHandler={handleOnChange}
                selectedValue={vehicle?.model?.value}
              />
            </td>
          </tr>
          <tr>
            <td>
              <CustomSelect
                id="vehicleType"
                options={vehicleTypeOptions}
                placeholder="Select Type..."
                addEmpty
                onChangeHandler={handleOnChange}
                selectedValue={vehicle?.vehicleType?.value}
              />
            </td>
            <td>
              <CustomSelect
                id="year"
                options={yearOptions}
                placeholder="Select Year..."
                addEmpty
                onChangeHandler={handleOnChange}
                selectedValue={vehicle?.year}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                id="patent"
                placeholder="Type Patent..."
                onChange={handleData}
                value={vehicle.patent}
                maxLength={8}
              />
            </td>
            <td>
              <CustomSelect
                id="color"
                options={colorOptions}
                placeholder="Select Color..."
                addEmpty
                onChangeHandler={handleOnChange}
                selectedValue={vehicle?.color?.value}
              />
            </td>
          </tr>
          <tr>
            <td>
              <CustomSelect
                id="owner"
                options={ownerOptions}
                placeholder="Select Owner..."
                addEmpty
                onChangeHandler={handleOnChange}
                selectedValue={vehicle.owner?.value}
              />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <button disabled={!isFormValid()} type="submit">
        {vehicle.id ? "Update" : "Add New"}
      </button>
      <button onClick={handleCancel} type="button" id="cancel-btn">
        Cancel
      </button>
    </form>
  );
};

export default AddVehicle;
