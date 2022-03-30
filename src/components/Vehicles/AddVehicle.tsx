import * as React from "react";
import CustomSelect from "../../shared/components/Select";

type Props = {
  formData: IVehicle | undefined;
  saveVehicleHandler: (vehicle: IVehicle | any) => (dispatch: VehicleDispatchType) => void;
  cancelEditHandler: () => VehicleAction;
  brandOptions: ComboType[];
  modelOptions: ComboType[];
  vehicleTypeOptions: ComboType[];
  colorOptions: ComboType[];
  yearOptions: ComboType[];
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

  const handleOnChangeBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const option: ComboType = {
        value: e.target.value,
        label: e.target.options[e.target.selectedIndex].label,
      };
      setSelectedOptions((prevState) => ({
        ...prevState,
        brand: option,
      }));
      setVehicle((prevState) => ({ ...prevState, brand: option }));
    }
  };

  const handleOnChangeModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const option: ComboType = {
        value: e.target.value,
        label: e.target.options[e.target.selectedIndex].label,
      };
      setSelectedOptions((prevState) => ({
        ...prevState,
        model: option,
      }));
      setVehicle((prevState) => ({ ...prevState, model: option }));
    }
  };

  const handleOnChangeVehicleType = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value) {
      const option: ComboType = {
        value: e.target.value,
        label: e.target.options[e.target.selectedIndex].label,
      };
      setSelectedOptions((prevState) => ({
        ...prevState,
        vehicleType: option,
      }));
      setVehicle((prevState) => ({ ...prevState, vehicleType: option }));
    }
  };

  const handleOnChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const option: ComboType = {
        value: e.target.value,
        label: e.target.options[e.target.selectedIndex].label,
      };
      setSelectedOptions((prevState) => ({
        ...prevState,
        color: option,
      }));
      setVehicle((prevState) => ({ ...prevState, color: option }));
    }
  };

  const handleOnChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const option: ComboType = {
        value: e.target.value,
        label: e.target.options[e.target.selectedIndex].label,
      };
      setSelectedOptions((prevState) => ({
        ...prevState,
        year: option,
      }));
      setVehicle((prevState) => ({
        ...prevState,
        year: parseInt(option.label),
      }));
    }
  };

  const isFormValid = () =>
    !!vehicle.brand?.value &&
    !!vehicle.model?.value &&
    !!vehicle.vehicleType?.value &&
    !!vehicle.color?.value &&
    !!vehicle.patent &&
    !!vehicle.year;

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
      <CustomSelect
        options={brandOptions}
        placeholder="Select Brand..."
        addEmpty
        onChangeHandler={handleOnChangeBrand}
        selectedValue={vehicle?.brand?.value}
      />
      <CustomSelect
        options={modelOptions}
        placeholder="Select Model..."
        addEmpty
        onChangeHandler={handleOnChangeModel}
        selectedValue={vehicle?.model?.value}
      />
      <CustomSelect
        options={vehicleTypeOptions}
        placeholder="Select Type..."
        addEmpty
        onChangeHandler={handleOnChangeVehicleType}
        selectedValue={vehicle?.vehicleType?.value}
      />
      <CustomSelect
        options={yearOptions}
        placeholder="Select Year..."
        addEmpty
        onChangeHandler={handleOnChangeYear}
        selectedValue={vehicle?.year}
      />
      <input
        type="text"
        id="patent"
        placeholder="Patent..."
        onChange={handleData}
        value={vehicle.patent}
        maxLength={8}
      />
      <CustomSelect
        options={colorOptions}
        placeholder="Select Color..."
        addEmpty
        onChangeHandler={handleOnChangeColor}
        selectedValue={vehicle?.color?.value}
      />
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
