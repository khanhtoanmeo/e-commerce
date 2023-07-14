import { Picker } from "@react-native-picker/picker";
import { View, Text, TextInput, Image, StyleSheet, Alert } from "react-native";
import CustomButton from "../UI/CustomButton";
import { useCallback, useState } from "react";
import { getDocumentAsync } from "expo-document-picker";
import { Button } from "react-native";
import COLORS from "../../utils/color";
import FetchData from "../../utils/fetchData";
import useUserStore from "../../stores/userStore";
import useMyPostsStore from "../../stores/myPostsStore";

function PostForm() {
  const userId = useUserStore((state) => state.user.id);
  const addPost = useMyPostsStore((state) => state.addPost);

  const [imageInfo, setImageInfo] = useState(null);
  const [productName, setProductName] = useState("");
  const [type, setType] = useState("Thực phẩm");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filePickHandler = useCallback(async function () {
    const data = await getDocumentAsync({ type: "image/*" });
    if (data.type === "success") setImageInfo(data);
  });

  async function postHandler() {
    setIsLoading(true);

    if (!imageInfo || !productName || !type || !description || !price) {
      setIsLoading(false);
      return Alert.alert("Lỗi", "Vui lòng nhập đủ thông tin");
    }

    if (!+price) {
      setIsLoading(false);
      return Alert.alert("Lỗi", "Giá phải là số");
    }
    const formData = new FormData();
    formData.append("image", {
      uri: imageInfo.uri,
      name: imageInfo.name,
      type: "image/jpeg",
    });
    const uploadImageResponse = await FetchData.uploadFile(formData);
    if (uploadImageResponse.status === "Fail") {
      setIsLoading(false);

      return Alert.alert("Lỗi", uploadImageResponse.message);
    }
    if (uploadImageResponse.status === "Ok") {
      const postResponse = await FetchData.createPost(
        productName,
        type,
        description,
        price,
        userId,
        uploadImageResponse.imageURL
      );

      if (postResponse.status === "Ok") {
        setIsLoading(false);
        Alert.alert("Hoàn thành", "Đã đăng bài");
        addPost(postResponse.post);
      } else {
        setIsLoading(false);
        Alert.alert("Lỗi", "Không đăng bài thành công");
      }
    }

    setProductName("");
    setPrice("");
    setDescription("");
    setImageInfo(null);
    setType("Thực phẩm");
  }

  return (
    <View style={styles.container}>
      <View style={styles.fields}>
        <View style={styles.field}>
          <Text style={styles.label}>Tên sản phẩm</Text>
          <TextInput
            placeholderTextColor={COLORS.text_2}
            style={styles.input}
            placeholder="Nhập tên sản phẩm"
            onChangeText={(text) => setProductName(text)}
            value={productName}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phân loại</Text>
          <Picker
            selectedValue={type}
            onValueChange={(text) => setType(text)}
            style={styles.picker}
            dropdownIconColor={COLORS.text_2}
          >
            <Picker.Item
              color={COLORS.text_3}
              label="Thực phẩm"
              value={"Thực phẩm"}
            />
            <Picker.Item
              color={COLORS.text_3}
              label="Đồ điện tử"
              value={"Đồ điện tử"}
            />
            <Picker.Item
              color={COLORS.text_3}
              label="Đồ gia dụng"
              value={"Đồ gia dụng"}
            />
            <Picker.Item
              color={COLORS.text_3}
              label="Mỹ phẩm"
              value={"Mỹ phẩm"}
            />
            <Picker.Item
              color={COLORS.text_3}
              label="Đồ chơi"
              value={"Đồ chơi"}
            />
            <Picker.Item
              color={COLORS.text_3}
              label="Quần áo"
              value={"Quần áo"}
            />
          </Picker>
        </View>
      </View>

      <View style={styles.fields}>
        <View style={styles.field}>
          <Text style={styles.label}>Mô tả</Text>
          <TextInput
            onChangeText={(text) => setDescription(text)}
            placeholderTextColor={COLORS.text_2}
            style={styles.input}
            placeholder="Nhập mô tả"
            value={description}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Giá</Text>
          <TextInput
            onChangeText={(text) => setPrice(text)}
            placeholderTextColor={COLORS.text_2}
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Nhập giá"
            value={price}
          />
        </View>
      </View>

      <View style={styles.previewField}>
        <Button title={"Chọn ảnh"} onPress={filePickHandler} />
        {imageInfo && (
          <Image
            source={{ uri: imageInfo.uri }}
            alt="Ảnh"
            style={styles.previewImage}
          />
        )}
      </View>

      <CustomButton title={"Đăng bài"} onPress={postHandler} />

      <Text style={styles.loading}>{isLoading ? "Uploading...." : ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 10,
    flex: 1,
  },
  fields: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  field: {
    margin: "3%",
  },
  label: {
    color: COLORS.text_1,
    fontSize: 20,
    fontWeight: "600",
  },

  input: {
    width: 170,
    height: 50,
    borderBottomColor: COLORS.anchor,
    borderBottomWidth: 1,
    color: COLORS.text_2,
  },
  picker: {
    width: 170,
    height: 50,
    color: COLORS.text_2,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: COLORS.action,
  },
  previewField: {
    marginVertical: 20,
  },
  loading: {
    textAlign: "center",
    fontSize: 30,
    color: COLORS.text_1,
  },
});

export default PostForm;
