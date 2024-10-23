import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useEffect } from "react";
import { getDataCustomer } from "../../store/actions/customerAction";
import { ThunkDispatch } from "redux-thunk";
import { getDataCustomers } from "../../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Tables/Table";

const Customers = () => {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const data = useSelector(getDataCustomers);

  useEffect(() => {
    dispatch(getDataCustomer());
  }, [dispatch]);

  const columns = [
    { key: "name", label: "Nama", sortable: true, searchable: true },
    { key: "phone", label: "Telepon", sortable: true, searchable: true },
    { key: "email", label: "Email", sortable: true, searchable: true },
    { key: "address", label: "Alamat", sortable: true, searchable: true },
    { key: "actions", label: "Aksi", sortable: false, searchable: false }
  ];

  const actions = [
    {
      label: "Edit",
      className: "bg-primary hover:bg-primary-dark",
      onClick: (id: string) => {
        console.log(`Edit user with id: ${id}`);
        // Implement edit functionality here
      }
    },
    {
      label: "Delete",
      className: "bg-red-500 hover:bg-red-600",
      onClick: (id: string) => {
        console.log(`Delete user with id: ${id}`);
        // Implement delete functionality here
      }
    }
  ];

  return (
    <>
      <Breadcrumb pageName="Customers" />

      <Table data={data} columns={columns} actions={actions} />
    </>
  );
};

export default Customers;