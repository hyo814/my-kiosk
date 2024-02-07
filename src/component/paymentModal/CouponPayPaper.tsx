import React from 'react';
import styles from "../../App.module.css";
import {discountText} from "../Utils/utils";
import {useRecoilValue} from "recoil";
import {couponsState, selectedCouponIdState} from "../../state/atoms";

const CouponPayPaper: React.FC = () => {
	const selectedCouponId = useRecoilValue(selectedCouponIdState);
	const coupons = useRecoilValue(couponsState);
	
	const selectedCoupon = coupons.find(coupon => coupon.name === selectedCouponId);
	
	return (
		<div className={styles.apply_discount}>
			<div className={styles.apply_discount_text}>{selectedCoupon ? selectedCoupon.name : '할인 정보'}</div>
			<div className={styles.apply_discount_price}>{discountText(selectedCoupon)}</div>
		</div>
	);
}

export default CouponPayPaper;
