import React from 'react';
import styles from "../../App.module.css";
import CountManager from "./CountManager";
import CouponButton from "./CouponButton";

const ProductControls: React.FC = () => {
	
	return (
		<>
			<div className={styles.selected_item}>
				<CouponButton/>
				<CountManager/>
			</div>
		</>
	);
};

export default ProductControls;
