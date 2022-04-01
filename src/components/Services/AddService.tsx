import * as React from "react";
import CustomSelect from "../../shared/components/Select";

type Props = {
  formData: IService | undefined;
  saveServiceHandler: (
    service: IService | any
  ) => (dispatch: ServiceDispatchType) => void;
  cancelEditHandler: () => ServiceAction;
  serviceTypeOptions: ComboType[];
  vehicleOptions: ComboType[];
};

const AddService: React.FC<Props> = (props) => {
  const {
    formData,
    saveServiceHandler,
    cancelEditHandler,
    serviceTypeOptions,
    vehicleOptions,
  } = props;
  const initialState: IService = {
    serviceTypes: null,
    vehicle: null,
    creationDate: new Date(),
  };
  const [service, setService] = React.useState<IService>(initialState);

  React.useEffect(() => {
    if (formData) {
      setService(Object.assign(initialState, formData));
    }
  }, [formData]);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const option: ComboType = {
        value: e.target.value,
        label: e.target.options[e.target.selectedIndex].label,
      };
      setService((prevState) => ({
        ...prevState,
        [e.target.id]: option,
      }));
    }
  };

  const handleOnChangeServiceType = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value) {
      const option: ComboType = {
        value: e.target.value,
        label: e.target.options[e.target.selectedIndex].label,
      };
      let newMultipleOptionValue: ComboType[] = service.serviceTypes || [];
      if (!newMultipleOptionValue.some((o) => o.value === option.value)) {
        newMultipleOptionValue.push(option);
      }
      setService((prevState) => ({
        ...prevState,
        serviceTypes: newMultipleOptionValue,
      }));
    }
  };

  const handleDeleteServiceType = (e: React.MouseEvent) => {
    if (e.currentTarget.id) {
      const valueDelete = e.currentTarget.id;
      const newValues =
        service.serviceTypes?.filter(
          (t) => t.value.toString() !== valueDelete
        ) || null;
      setService((prevState) => ({
        ...prevState,
        serviceTypes: newValues,
      }));
    }
  };

  const isFormValid = () =>
    (service.serviceTypes?.length || 0) > 0 && !!service.vehicle?.value;

  const addNewService = (e: React.FormEvent) => {
    e.preventDefault();
    saveServiceHandler(service);
    setService(initialState);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    e?.preventDefault();
    setService(initialState);
    cancelEditHandler();
  };

  return (
    <form onSubmit={addNewService} autoComplete="off" className="Add-generic">
      <table>
        <tbody>
          <tr>
            <td colSpan={2} className="tdAlignLeft">
              <CustomSelect
                id="vehicle"
                options={vehicleOptions}
                placeholder="Select Vehicle..."
                addEmpty
                onChangeHandler={handleOnChange}
                selectedValue={service?.vehicle?.value}
              />
            </td>
          </tr>
          <tr>
            <td>
              <CustomSelect
                id="serviceType"
                key={Date.now()}
                options={serviceTypeOptions}
                placeholder="Select Service..."
                addEmpty
                onChangeHandler={handleOnChangeServiceType}
              />
            </td>
            <td className="tdw50">
              {service.serviceTypes?.map((s, index) => (
                <div className="Generic" key={index}>
                  <div>
                    <p>{`${s.label}`}</p>
                  </div>
                  <div
                    onClick={handleDeleteServiceType}
                    style={{ cursor: "pointer" }}
                    id={s.value.toString()}
                  >
                    X
                  </div>
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
      <button disabled={!isFormValid()} type="submit">
        {service.id ? "Update" : "Add New"}
      </button>
      <button onClick={handleCancel} type="button" id="cancel-btn">
        Cancel
      </button>
    </form>
  );
};

export default AddService;
