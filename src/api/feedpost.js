import axios from "axios";

const fetchData = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5001/api/post/feed/${id}`
    );

    const { data } = response;

    console.log("Data from server:", { data }); // Log the response from the server
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchData;
