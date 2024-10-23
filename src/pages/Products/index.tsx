import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useEffect } from "react";
import { getDataProduct } from "../../store/actions/productAction";
import { ThunkDispatch } from "redux-thunk";
import { getDataProducts } from "../../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Tables/Table";

const Products = () => {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const data = useSelector(getDataProducts);

  useEffect(() => {
    dispatch(getDataProduct());
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

      <Table data={tempData} columns={columns} actions={actions} />
    </>
  );
};

export default Products;