import { frontendCoupons } from "../../common"

const couponsData = {
  uri: "/coupons",
  handleResponse: () => {
    const data = frontendCoupons

    return {
      data,
    }
  },
}

export default couponsData
