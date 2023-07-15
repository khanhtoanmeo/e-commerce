import { FlatList, StyleSheet, Text } from "react-native";
import MyPost from "./MyPost";
import useMyPostsStore from "../../stores/myPostsStore";
import useUserStore from "../../stores/userStore";
import { useEffect } from "react";
import FetchData from "../../utils/fetchData";
import COLORS from "../../utils/color";

function MyPosts() {
  const userId = useUserStore((state) => state.user.id);
  const setPosts = useMyPostsStore((state) => state.setPosts);
  const posts = useMyPostsStore((state) => state.posts);

  useEffect(() => {
    FetchData.getMyPosts(userId).then((data) => {
      setPosts(data.posts);
    });
  }, [setPosts, userId]);
  return (
    <>
      <Text style={styles.text}>Sản phẩm của tôi</Text>

      <FlatList
        data={posts}
        renderItem={(item) => <MyPost data={item.item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.text_2,
    fontSize: 24,
    marginLeft: 4,
  },
});

export default MyPosts;
