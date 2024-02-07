import React, {useState} from 'react';
import Modal from "../PaymentModal/Modal"
import styles from '../../App.module.css';
import {Button} from "@mui/material";
import Specification from "../PaymentModal/Specification";
import {useRecoilState, useRecoilValue} from "recoil";
import {paymentState, couponsState, selectedItemsState, selectedCouponIdState} from "../../state/atoms";
import {getPriceDisplayStr, calculateFinalTotalWithDiscount} from '../Utils/utils';

const PaymentSummary: React.FC = () => {
	const coupons = useRecoilValue(couponsState);
	const selectedCouponId = useRecoilValue(selectedCouponIdState);
	const [payment, setPayment] = useRecoilState(paymentState);
	const selectedItem = useRecoilValue(selectedItemsState);
	const [showModal, setShowModal] = useState(false);
	
	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);
	
	const selectedCoupon = coupons.find(coupon => coupon.name === selectedCouponId);

	return (
		<>
			{selectedItem.length > 0 && (
				<>
					<Button className={styles.total_price_popup}
					        variant="contained"
					        onClick={() => {
						        if (selectedItem.length > 0) {
							        setPayment(!payment);
							        openModal();
						        } else {
							        alert("상품을 최소 하나 이상 선택해주세요.");
						        }
					        }}>
						{getPriceDisplayStr(calculateFinalTotalWithDiscount(selectedCoupon, selectedItem))}원 결제
					</Button>
				</>)}
			&nbsp;
			<Modal show={showModal} onClose={closeModal}>
				<Specification/>
				<Button className={styles.printed} variant="contained" onClick={closeModal}>영수증 확인</Button>
			</Modal>
		</>
	);
};

export default PaymentSummary;
