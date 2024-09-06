import { frontendCategories } from "../../common"

const categoriesData = {
  uri: "/categories",
  handleResponse: () => {
    const data = frontendCategories

    return {
      data,
    }
  },
}

export default categoriesData
