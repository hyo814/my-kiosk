import React from 'react';
import styles from "../../App.module.css";
import CouponSelect from "../Coupon/CouponSelect";
import CountButton from "../CountButton/CountButton";
import {SelectedProduct} from "../../type/Product";
import {Coupon} from "../../type/Coupon";

interface PaymentProps {
	coupon: Coupon[];
	selectedCoupon: Coupon | null;
	selectedItem: SelectedProduct[];
	setSelectedItem: React.Dispatch<React.SetStateAction<SelectedProduct[]>>;
	selectedCouponId: string;
	setSelectedCouponId: React.Dispatch<React.SetStateAction<string>>;
}

const Payment: React.FC<PaymentProps> = ({
	                                         coupon,
	                                         selectedCoupon,
	                                         selectedItem,
	                                         setSelectedItem,
	                                         selectedCouponId,
	                                         setSelectedCouponId,
                                         }) => {
	
	return (
		<div className="">
			{selectedItem.length > 0 ?
				<>
					<div className={styles.filtered_products_result}>
						<CouponSelect setSelectedItem={setSelectedItem}
						              selectedCouponId={selectedCouponId}
						              coupon={coupon}
						              selectedItem={selectedItem}
						              setSelectedCouponId={setSelectedCouponId}/>
						<CountButton selectedCoupon={selectedCoupon}/>
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

export default Payment;
