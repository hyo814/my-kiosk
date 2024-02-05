import React, {useState} from 'react';
import Modal from "./Modal";
import styles from "../../App.module.css";
import {Button} from "@mui/material";
import Specification from "./Specification";
import {calculateFinalTotalWithDiscount} from "../Utils/utils";
import {SelectedProduct} from "../../type/Product";
import {Coupon} from "../../type/Coupon";

interface ButtonModalProps {
	payment: boolean;
	setPayment: (value: boolean) => void;
	selectedItem: SelectedProduct[];
	selectedCoupon: Coupon | null;
}

const ButtonModal: React.FC<ButtonModalProps> = ({
	                                          payment,
	                                          setPayment,
	                                          selectedItem,
	                                          selectedCoupon,
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
				{calculateFinalTotalWithDiscount(selectedCoupon, selectedItem )}원 결제
			</Button>
			<Modal show={showModal} onClose={closeModal}>
				<Specification
					selectedItem={selectedItem}
					selectedCoupon={selectedCoupon ?? null}
				/>
				<Button variant="contained" onClick={() => closeModal()}>영수증 확인</Button>
			</Modal>
		</div>
	);
};

export default ButtonModal;
