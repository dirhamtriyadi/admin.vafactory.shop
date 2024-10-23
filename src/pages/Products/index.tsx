import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import { getDataProduct } from "../../store/actions/productAction";
import { ThunkDispatch } from "redux-thunk";
import { getDataProducts } from "../../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Tables/Table";

const Products = () => {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const data = useSelector(getDataProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getDataProduct());
      setLoading(false);
    }

    fetchData();
  }, [dispatch]);

  const columns = [
    { key: "code", label: "Kode Barang", sortable: true },
    { key: "name", label: "Nama Barang", sortable: true },
    { key: "description", label: "Deskripsi", sortable: true },
    { key: "price", label: "Harga", sortable: true },
    { key: "actions", label: "Aksi", sortable: false }
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

  let tempData = data.map((item: any) => {
    return {
      ...item,
      price: new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(item.price)
    };
  });

  return (
    <>
      <Breadcrumb pageName="Produk" />

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

export default Products;