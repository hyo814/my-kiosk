import { frontendProducts } from "../../common"

const productsData = {
  uri: "/products",
  handleResponse: () => {
    const data = frontendProducts

    return {
      data,
    }
  },
}

export default productsData
