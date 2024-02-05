import React, {useEffect} from 'react';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import styles from "./App.module.css";

import PaymentSummary from "./PaymentSummary/PaymentSummary";
import CategoryHeader from "./component/CategoryHeader/CategoryHeader";
import ProductList from "./component/ProductList/ProductList";
import CheckoutList from "./component/CheckoutList/CheckoutList";

import {
	categoriesState,
	productsState,
	couponsState,
	selectedCouponIdState,
} from "./state/atoms";

const App = () => {
	const [, setCategories] = useRecoilState(categoriesState);
	const [, setProducts] = useRecoilState(productsState);
	const [coupon, setCoupon] = useRecoilState(couponsState);
	const [selectedCouponId] = useRecoilState(selectedCouponIdState);
	
	useEffect(() => {
		axios.get('/categories')
			.then(response => {
				setCategories(response.data.data);
			})
			.catch(error => console.error("There was an error categories!", error));
		
		axios.get('/products')
			.then(response => {
				setProducts(response.data.data);
			})
			.catch(error => console.error("There was an error products!", error));
		
		axios.get('/coupons')
			.then(response => {
				setCoupon(response.data.data);
			})
			.catch(error => console.error("There was an error coupons!", error));
	}, []);
	
	return (
		<>
			<div className={styles.container}>
				<CategoryHeader/>
				<div className={styles.container_view}>
					<ProductList/>
					<CheckoutList/>
				</div>
			</div>
			<PaymentSummary/>
		</>
	);
}

export default App;
