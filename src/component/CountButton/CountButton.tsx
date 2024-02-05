import React from 'react';
import styles from "../../App.module.css";
import {Coupon} from "../../type/Coupon";

interface CountButtonProps {
	selectedCoupon: Coupon | null;
}

const CountButton: React.FC<CountButtonProps> = ({ selectedCoupon }) => {
	const getDiscountText = (coupon: Coupon | null) => {
		if (!coupon) {
			return '쿠폰을 선택해주세요.';
		} else {
			const discountType = coupon.type === 'amount' ? '금액 할인' : '비율 할인';
			const discountValue = coupon.price.toLocaleString();
			const unit = coupon.type === 'amount' ? '원' : '%';
			
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

export default CountButton;
