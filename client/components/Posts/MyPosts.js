import { FlatList, StyleSheet } from "react-native";
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
    <FlatList
      data={posts}
      renderItem={(item) => <MyPost data={item.item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

export default MyPosts;
