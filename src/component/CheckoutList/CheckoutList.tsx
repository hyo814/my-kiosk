import React from 'react';
import styles from "../../App.module.css";
import CouponManager from "../CouponManager/CouponManager";
import CartItemAdjustment from "../CartItemAdjustment/CartItemAdjustment";
import { useRecoilValue } from "recoil";
import { couponsState, selectedCouponIdState, selectedItemsState } from "../../state/atoms";

const CheckoutList: React.FC = () => {
	const coupons = useRecoilValue(couponsState);
	const selectedCouponId = useRecoilValue(selectedCouponIdState);
	const selectedItem = useRecoilValue(selectedItemsState);
	
	const selectedCoupon = coupons.find(coupon => coupon.id === selectedCouponId);
	
	return (
		<div>
			{selectedItem.length > 0 ?
				<>
					<div className={styles.filtered_products_result}>
						<CouponManager/>
						{selectedCoupon && <CartItemAdjustment />}
					</div>
				</>
				:
				<div className={styles.no_result}>
					메뉴를 선택해주세요.
				</div>
			}
		</div>
	);
}

export default CheckoutList;
