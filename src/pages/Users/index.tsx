import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import { getDataUser } from "../../store/actions/userAction";
import { ThunkDispatch } from "redux-thunk";
import { getDataUsers } from "../../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Tables/Table";

const Users = () => {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const data = useSelector(getDataUsers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getDataUser());
      setLoading(false);
    }

    fetchData();
  }, [dispatch]);

  const columns = [
    { key: "name", label: "Nama", sortable: true, searchable: true },
    { key: "email", label: "Email", sortable: true, searchable: true },
    { key: "roles", label: "Role", sortable: true, searchable: true },
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

  const tempData = data.map((item: any) => {
    return {
      ...item,
      roles: item.roles.map((role: any) => role.name).join(", ")
    };
  });

  return (
    <>
      <Breadcrumb pageName="Users" />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <Table data={tempData} columns={columns} actions={actions} />
      )}
    </>
  );
};

export default Users;