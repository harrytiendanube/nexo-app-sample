const { default: axios } = require("axios");
async function saveToken(store_id, access_token) {
    try {
      const token = await getTokenBy(store_id);
      if(token){
        await axios.patch(`http://localhost:3201/token/${token.id}`, { access_token });
        return true;
      }
  
      await axios.post("http://localhost:3201/token", { store_id, access_token });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  async function getTokenBy(storeId) {
    try {
      const { data } = await axios.get("http://localhost:3201/token", {
        params: { store_id: storeId },
      });
  
      if (data.length === 0) {
        return null;
      }
  
      return data[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  exports.saveToken = saveToken;
  exports.getTokenBy = getTokenBy;
  