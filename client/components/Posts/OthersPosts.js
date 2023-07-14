import { FlatList, View, Button, Text, StyleSheet } from "react-native";
import OtherPost from "./OtherPost";
import { useState, useEffect } from "react";
import FetchData from "../../utils/fetchData";
import useUserStore from "../../stores/userStore";
import useNavigationStore from "../../stores/navigationStore";
import COLORS from "../../utils/color";
function OthersPosts() {
  const [posts, setPosts] = useState([]);
  const id = useUserStore((state) => state.user.id);
  const navigation = useNavigationStore((state) => state.navigation);

  useEffect(() => {
    FetchData.getOthersPosts(id).then((data) => {
      setPosts(data.posts);
    });
  }, []);
  return (
    <View>
      <Button
        title={"Xem Hóa đơn của tôi"}
        onPress={() => {
          navigation.navigate("InvoicesStack");
        }}
      />

      {posts?.length > 0 ? (
        <View>
          <Text style={styles.label}>Tất cả sản phẩm</Text>
          <FlatList
            style={{ marginTop: 30 }}
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OtherPost data={item} />}
          />
        </View>
      ) : (
        <Text>Chưa có người dùng khác đăng bán</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    margin: 6,
    color: COLORS.action,
  },
});

export default OthersPosts;
