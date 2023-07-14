import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import FetchData from "../../utils/fetchData";
import useUserStore from "../../stores/userStore";
import Invoice from "./Invoice";
function Invoices() {
  const id = useUserStore((state) => state.user.id);
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    FetchData.getMyInvoices(id).then((data) => {
      if (data.status === "Ok") setInvoices(data.invoices);
      else Alert.alert("Lỗi", data.message);
    });
  }, []);
  return (
    <FlatList
      data={invoices}
      renderItem={(item) => <Invoice data={item.item} />}
      keyExtractor={() => Math.random()}
    />
  );
}

export default Invoices;
