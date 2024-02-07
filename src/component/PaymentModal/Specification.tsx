import React from 'react';
import styles from "../../App.module.css";
import {calculateFinalTotalWithDiscount, getPriceDisplayStr} from "../Utils/utils";
import { useRecoilValue } from "recoil";
import { couponsState, selectedCouponIdState, selectedItemsState } from "../../state/atoms";
import PayPaper from "./PayPaper";
import CouponPayPaper from "./CouponPayPaper";

const Specification: React.FC = () => {
	const selectedCouponId = useRecoilValue(selectedCouponIdState);
	const selectedItem = useRecoilValue(selectedItemsState);
	const coupons = useRecoilValue(couponsState);
	
	const selectedCoupon = coupons.find(coupon => coupon.name === selectedCouponId);
	
	return (
		<>
			<div className={styles.paper}>
				<div className={styles.paper_title}>주문 내역</div>
				<PayPaper/>
				<CouponPayPaper/>
				<div className={styles.total_price}>{getPriceDisplayStr(calculateFinalTotalWithDiscount(selectedCoupon, selectedItem))}원 결제</div>
			</div>
		</>
	);
}

export default Specification;
