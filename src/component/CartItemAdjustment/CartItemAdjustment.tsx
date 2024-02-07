import React from 'react';
import styles from "../../App.module.css";
import {Coupon} from "../type/Coupon";
import {useRecoilValue} from "recoil";
import {couponsState, selectedCouponIdState} from "../../state/atoms";

const CartItemAdjustment: React.FC = () => {
	const coupons = useRecoilValue(couponsState);
	const selectedCouponId = useRecoilValue(selectedCouponIdState);
	
	const selectedCoupon = coupons.find(coupon => coupon.name === selectedCouponId);
	
	const getDiscountText = (selectedCoupon: Coupon | undefined) => {
		if (!selectedCoupon) {
			return '쿠폰을 선택해주세요.';
		} else {
			const discountType = selectedCoupon.type === 'amount' ? '금액 할인' : '비율 할인';
			const discountValue = selectedCoupon.price.toLocaleString();
			const unit = selectedCoupon.type === 'amount' ? '원' : '%';
			
			return `${discountType}: -${discountValue}${unit}`;
		}
	};
	
	return (
		<>
			<div className={styles.apply_discount}>
				<div className={styles.apply_discount_text}>{selectedCoupon ? selectedCoupon.name : '할인 정보'}</div>
				<div className={styles.apply_discount_price}>{getDiscountText(selectedCoupon)}</div>
			</div>
		</>
	);
}

export default CartItemAdjustment;
