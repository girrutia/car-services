import * as React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

type Props = {
  service: IService;
  editing: boolean;
  editServiceHandler: (service: IService) => ServiceAction;
  removeServiceHandler: (
    service: IService
  ) => (dispatch: ServiceDispatchType) => void;
};

const Service: React.FC<Props> = ({
  service,
  editing,
  editServiceHandler,
  removeServiceHandler,
}) => {
  const dispatch: Dispatch<any> = useDispatch();

  const remove = React.useCallback(
    (service: IService) => dispatch(removeServiceHandler(service)),
    [dispatch, removeServiceHandler]
  );

  const edit = (service: IService) => editServiceHandler(service);

  return (
    <div className="Generic">
      <div>
        <p>{service.creationDate.toLocaleDateString()}</p>
        <h1>{`${service.vehicle?.label}`}</h1>
        <ul>
          {service.serviceTypes?.map((s, index) => (
            <li key={index}>{`${s.label}`}</li>
          ))}
        </ul>
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
            edit(service);
          }}
          id="edit-btn"
          disabled={editing}
        >
          Edit
        </button>
        <button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            remove(service);
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

export default Service;
