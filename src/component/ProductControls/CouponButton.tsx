import React from 'react';
import styles from "../../App.module.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useRecoilState, useRecoilValue} from "recoil";
import {couponsState, selectedCouponIdState} from "../../state/atoms";

const CouponButton: React.FC = () => {
	const coupon = useRecoilValue(couponsState)
	const [selectedCouponId, setSelectedCouponId] = useRecoilState(selectedCouponIdState)
	
	return (
		<>
				<FormControl variant="standard">
					<InputLabel>쿠폰 선택</InputLabel>
					<Select
						className={styles.coupon}
						onChange={(e) => setSelectedCouponId(e.target.value)}
						value={selectedCouponId}
					>
						{coupon.map((coupons) => (
							<MenuItem key={coupons.name} value={coupons.name}>{coupons.name}</MenuItem>
						))}
					</Select>
				</FormControl>
		</>
	);
};

export default CouponButton;
