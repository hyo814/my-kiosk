import React, {useState} from 'react';
import Modal from "./Modal";
import styles from "../../App.module.css";
import {Button} from "@mui/material";
import Specification from "../../Specification";

interface Option {
	name: string;
	price?: number;
	count?: number;
	selected?: boolean;
}

interface Product {
	categoryId: string;
	name: string;
	url: string;
	option: Option[];
	price: string;
}

interface SelectedProduct extends Product {
	itemCount: number;
	option: Option[];
}

interface Coupon {
	id: string;
	name: string;
	price: number;
	type: string;
}

interface TestProps {
	payment: boolean;
	setPayment: (value: boolean) => void;
	selectedItem: SelectedProduct[];
	calculateFinalTotalWithDiscount: () => number;
	selectedCoupon: Coupon | null;
	discountText: string;
	calculateItemTotal: (item: SelectedProduct) => number;
}

const ButtonModal: React.FC<TestProps> = ({
	                                          payment,
	                                          setPayment,
	                                          selectedItem,
	                                          calculateFinalTotalWithDiscount,
	                                          selectedCoupon,
	                                          discountText,
	                                          calculateItemTotal
                                          }) => {
	const [showModal, setShowModal] = useState(false);
	
	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);
	
	return (
		<div className={styles.App}>
			<Button className={styles.total_price}
			        variant="contained"
			        onClick={() => {
				        if (selectedItem.length > 0) {
					        setPayment(!payment);
					        openModal()
				        } else {
					        alert("상품을 최소 하나 이상 선택해주세요.");
				        }
			        }}>
				{calculateFinalTotalWithDiscount()}원 결제
			</Button>
			<Modal show={showModal} onClose={closeModal}>
				<Specification
					payment={payment}
					selectedItem={selectedItem}
					selectedCoupon={selectedCoupon ?? null}
					calculateFinalTotalWithDiscount={calculateFinalTotalWithDiscount}
					discountText={discountText}
					calculateItemTotal={calculateItemTotal}
				/>
				<Button variant="contained" onClick={() => closeModal()}>영수증 확인</Button>
			</Modal>
		</div>
	);
};

export default ButtonModal;
