import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const IP_ADDRESS = "192.168.1.86";
// const IP_ADDRESS = "10.90.228.186";
// const IP_ADDRESS = "10.90.17.183";

class FetchData {
  static async getUserById(id) {
    const token = await AsyncStorage.getItem("token");
    const data = await axios.get(`http://${IP_ADDRESS}:8888/api/users/${id}`, {
      headers: { Authorization: `Bearer ` + token },
    });

    return data.data;
  }

  static async login(email, password) {
    const data = await axios.post(`http://${IP_ADDRESS}:8888/api/auth/login`, {
      email,
      password,
    });
    return data.data;
  }

  static async signup(email, password, username, bankName, bankAccount) {
    const data = await axios.post(`http://${IP_ADDRESS}:8888/api/users`, {
      email,
      password,
      username,
      bankName,
      bankAccount,
    });
    return data.data;
  }

  static async uploadFile(formData) {
    const token = await AsyncStorage.getItem("token");

    const data = await axios.post(
      `http://${IP_ADDRESS}:8888/api/posts/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ` + token,
        },
      }
    );
    return data.data;
  }

  static async createPost(name, type, description, price, userId, image) {
    const token = await AsyncStorage.getItem("token");

    const data = await axios.post(
      `http://${IP_ADDRESS}:8888/api/posts`,
      {
        name,
        image,
        type,
        description,
        price,
        user_id: userId,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return data.data;
  }

  static async getMyPosts(userId) {
    const token = await AsyncStorage.getItem("token");

    const data = await axios.get(
      `http://${IP_ADDRESS}:8888/api/users/${userId}/myposts`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return data.data;
  }

  static async getOthersPosts(userId) {
    const token = await AsyncStorage.getItem("token");
    const data = await axios.get(
      `http://${IP_ADDRESS}:8888/api/users/${userId}/othersposts`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return data.data;
  }

  static async getMyInvoices(userId) {
    const token = await AsyncStorage.getItem("token");

    const data = await axios.get(
      `http://${IP_ADDRESS}:8888/api/users/${userId}/invoices`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return data.data;
  }

  static async createInvoice(
    seller_id,
    customer_id,
    product,
    quantity,
    totalPrice
  ) {
    const token = await AsyncStorage.getItem("token");

    const data = await axios.post(
      `http://${IP_ADDRESS}:8888/api/invoices`,
      {
        seller_id,
        customer_id,
        product,
        quantity,
        totalPrice,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return data.data;
  }
}

export default FetchData;
