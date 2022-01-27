const { default: axios } = require("axios");

async function getProducts(user) {
  try {
    const { data } = await axios.get(
      `https://api.tiendanube.com/v1/${user.store_id}/products`,
      {
        headers: { Authentication: `bearer ${user.access_token}` },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

exports.getProducts = getProducts;
