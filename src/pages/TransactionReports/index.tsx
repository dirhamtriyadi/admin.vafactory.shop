import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useEffect } from "react";
import { getDataTransactionReport } from "../../store/actions/transactionReportAction";
import { ThunkDispatch } from "redux-thunk";
import { getDataTransactionReports } from "../../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Tables/Table";

const TransactionReports = () => {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const data = useSelector(getDataTransactionReports);

  useEffect(() => {
    dispatch(getDataTransactionReport());
  }, [dispatch]);

  const columns = [
    { key: "transaction_number", label: "No Transaksi", sortable: true, searchable: true },
    { key: "customer", label: "Nama Customer", sortable: true, searchable: true },
    { key: "date", label: "Tanggal Transaksi", sortable: true, searchable: true },
    { key: "total", label: "Total Harga", sortable: true, searchable: true },
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

  let tempData = data.map((item: any) => {
    let row = {
      ...item,
      customer: item.customer.name,
      date: new Date(item.date).toLocaleDateString(),
      total: new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(item.transactionDetail.map((item: any) => item.subtotal).reduce((a: number, b: number) => a + b, 0))
    }

    return row;
  });

  return (
    <>
      <Breadcrumb pageName="Transaction Reports" />

      <Table data={tempData} columns={columns} actions={actions} />
    </>
  );
};

export default TransactionReports;