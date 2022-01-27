const { default: axios } = require("axios");
const config = require("./config.json");

async function getStoreAndAccessTokeByCode(code) {
  try {
    const headers = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    const params = new URLSearchParams();
    params.append("client_id", config.clientId);
    params.append("client_secret", config.secret);
    params.append("code", code);
    params.append("grant_type", "authorization_code");
    const url = "https://www.tiendanube.com/apps/authorize/token";

    const { data } = await axios.post(url, params, headers);
    if ("error" in data) {
      return null;
    }
    return { storeId: data.user_id, accessToken: data.access_token };
  } catch (error) {
    console.error(error);
    return null;
  }
}

exports.getStoreAndAccessTokeByCode = getStoreAndAccessTokeByCode;
