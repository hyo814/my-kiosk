import React from 'react';
import styles from "../../App.module.css";
import { calculateFinalTotalWithDiscount, calculateItemTotal, discountText } from "../Utils/utils";
import { useRecoilValue } from "recoil";
import { couponsState, selectedCouponIdState, selectedItemsState } from "../../state/atoms";

const Specification: React.FC = () => {
	const selectedCouponId = useRecoilValue(selectedCouponIdState);
	const selectedItem = useRecoilValue(selectedItemsState);
	const coupons = useRecoilValue(couponsState);
	
	const selectedCoupon = coupons.find(coupon => coupon.id === selectedCouponId);
	
	return (
		<>
			<div className={styles.paper}>
				<div className={styles.paper_title}>주문 내역</div>
				<div>
					{selectedItem.map((item, itemIndex) => (
						<div key={itemIndex}>
							<h3 className={styles.selected_title}>{item.name} x {item.itemCount}</h3>
							{item.option && item.option.map((opt, optIndex) => (
								<div className={styles.option_title} key={optIndex}>
									<p>{opt.name} - {opt.count ? `x ${opt.count}` : ''} {opt.price ? `${opt.price}원` : ''}</p>
								</div>
							))}
							<div className={styles.total}> 총 {calculateItemTotal(item)}원</div>
						</div>
					))}
				</div>
				<div className={styles.apply_discount}>
					<div className={styles.apply_discount_text}>{selectedCoupon ? selectedCoupon.name : '할인 정보'}</div>
					<div className={styles.apply_discount_price}>{discountText(selectedCoupon)}</div>
				</div>
				<div className={styles.total_price}>{calculateFinalTotalWithDiscount(selectedCoupon, selectedItem)}원 결제</div>
			</div>
		</>
	);
}

export default Specification;
