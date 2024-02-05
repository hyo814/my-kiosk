import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from "./App.module.css";

import ButtonModal from "./component/paymentModal/ButtonModal";
import MenuBar from "./component/MenuBar/MenuBar";
import MenuCategory from "./component/MenuCategory/MenuCategory";
import Payment from "./component/Payment/Payment";
import {Category} from "./type/Category";
import {Product, SelectedProduct} from "./type/Product";
import {Coupon} from "./type/Coupon";

const App = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("payhere.coffee");
	const [selectedItem, setSelectedItem] = useState<SelectedProduct[]>([]);
	const [coupon, setCoupon] = useState<Coupon[]>([]);
	const [payment, setPayment] = useState<boolean>(false);
	const [selectedCouponId, setSelectedCouponId] = useState<string>('');
	
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
	
	
	const selectedCoupon = coupon.find(coupons => coupons.id === selectedCouponId);
	
	return (
		<>
			<div className={styles.container}>
				<MenuBar
					categories={categories}
					setSelectedCategoryId={setSelectedCategoryId}/>
				<div className={styles.container_view}>
					<MenuCategory products={products} selectedCategoryId={selectedCategoryId} selectedItem={selectedItem}
					              setSelectedItem={setSelectedItem}/>
					<Payment
						selectedItem={selectedItem}
						setSelectedItem={setSelectedItem}
						selectedCouponId={selectedCouponId}
						selectedCoupon={selectedCoupon ?? null}
						coupon={coupon}
						setSelectedCouponId={setSelectedCouponId}
					/>
				</div>
			</div>
			<ButtonModal
				selectedItem={selectedItem}
				setPayment={setPayment}
				payment={payment}
				selectedCoupon={selectedCoupon ?? null}
			/>
		</>
	);
}

export default App;
