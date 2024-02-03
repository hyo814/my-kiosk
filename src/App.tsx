import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {Button, ButtonGroup} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import styles from "./App.module.css";

import ButtonModal from "./component/paymentModal/ButtonModal";

interface Category {
	id: string;
	name: string;
}

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

const App = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("payhere.coffee");
	const [selectedItem, setSelectedItem] = useState<SelectedProduct[]>([]);
	const [coupon, setCoupon] = useState<Coupon[]>([]);
	const [payment, setPayment] = useState<boolean>(false);
	const [selectedCouponId, setSelectedCouponId] = useState('');
	
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
	
	const getPriceDisplayStr = (price: number, d = 0) => {
		return `${Number(price?.toFixed(d)).toLocaleString().split(/\s/).join(",")}`;
	};
	
	const CategoriesButton = (categoryId: string) => {
		setSelectedCategoryId(categoryId);
	};
	
	const filteredProducts = selectedCategoryId
		? products.filter(product => product.categoryId === selectedCategoryId)
		: [];
	
	const ProductMenuButton = (product: Product) => {
		const existingProductIndex = selectedItem.findIndex(p => p.name === product.name);
		if (existingProductIndex > -1) {
			const newSelectedProducts = [...selectedItem];
			newSelectedProducts[existingProductIndex] = {
				...newSelectedProducts[existingProductIndex],
				itemCount: newSelectedProducts[existingProductIndex].itemCount + 1,
			};
			setSelectedItem(newSelectedProducts);
		} else {
			const newProduct = {...product, itemCount: 1, option: product.option || []};
			setSelectedItem([...selectedItem, newProduct]);
		}
	};
	
	const selectOptionMinus = (productName: string, optionName: string) => {
		setSelectedItem(currentItems =>
			currentItems.map(item => {
				if (item.name === productName) {
					const optionIndex = item.option.findIndex(opt => opt.name === optionName);
					let newOptions = [...item.option];
					
					if (optionIndex > -1) {
						const option = newOptions[optionIndex];
						if (option.price && (option.count || 0) > 0) {
							let updatedCount = (option.count || 0) - 1;
							newOptions[optionIndex] = {...option, count: updatedCount};
						} else {
							newOptions[optionIndex] = {...option, count: 0};
						}
					}
					
					return {...item, option: newOptions};
				}
				return item;
			})
		);
	};
	
	const selectOptionPlus = (productName: string, optionName: string) => {
		setSelectedItem(currentItems =>
			currentItems.map(item => {
				if (item.name === productName) {
					const optionIndex = item.option.findIndex(opt => opt.name === optionName);
					let newOptions = [...item.option];
					
					if (optionIndex > -1) {
						const option = newOptions[optionIndex];
						if (option.price) {
							let updatedCount = option.count ? option.count + 1 : 1;
							newOptions[optionIndex] = {...option, count: updatedCount};
						} else {
							newOptions[optionIndex] = {...option, count: 1};
						}
					}
					return {...item, option: newOptions};
				}
				return item;
			})
		);
	};
	
	const handleItemCountChange = (productName: string, change: number) => {
		setSelectedItem(current =>
			current.map(product =>
				product.name === productName
					? {...product, itemCount: Math.max(1, product.itemCount + change)}
					: product
			)
		);
	};
	
	const calculateItemTotal = (item: SelectedProduct): number => {
		const baseTotal = parseFloat(item.price) * item.itemCount;
		const optionTotal = item.option.reduce((acc, opt) => acc + ((opt.price || 0) * (opt.count || 0)), 0);
		return baseTotal + optionTotal;
	};
	
	const calculateCumulativeTotal = (selectedItems: SelectedProduct[]): number => {
		return selectedItems.reduce((acc, item) => acc + calculateItemTotal(item), 0);
	};
	
	const removeItem = (productName: string) => {
		setSelectedItem(currentItems => currentItems.filter(item => item.name !== productName));
	};
	

	
	const selectedCoupon = coupon.find(coupons => coupons.id === selectedCouponId);
	
	const discountText = selectedCoupon ?
		`${selectedCoupon.type === 'amount' ? '금액 할인' : '비율 할인'}: -${getPriceDisplayStr(selectedCoupon.price)}${selectedCoupon.type === 'amount' ? '원' : '%'}` :
		'쿠폰을 선택해주세요.';
	
	const calculateFinalTotalWithDiscount = () => {
		const totalWithoutDiscount = calculateCumulativeTotal(selectedItem);
		let discountAmount = 0;
		let finalTotalWithDiscount: number;
		
		if (selectedCoupon) {
			if (selectedCoupon.type === 'amount') {
				discountAmount = selectedCoupon.price;
			} else if (selectedCoupon.type === 'rate') {
				discountAmount = (totalWithoutDiscount * selectedCoupon.price) / 100;
			}
		}
		finalTotalWithDiscount = totalWithoutDiscount - discountAmount
		if (finalTotalWithDiscount <= 0) {
			return 0;
		}
		return finalTotalWithDiscount;
	};
	
	return (
		<>
			<div className={styles.container}>
				<div className={styles.container_menu}>
					<div className={styles.menu_categories}>
						{categories.map(category => (
							<Button
								className={styles.categories}
								variant="contained" key={category.id}
								onClick={() => CategoriesButton(category.id)}>{category.name}</Button>
						))}
					</div>
				</div>
				<div className={styles.container_view}>
					<div className={styles.filtered_products}>
						{filteredProducts.map(product => (
							<Button
								variant="outlined"
								onClick={() => ProductMenuButton(product)}
								className={styles.product_menu_button}
								style={{
									backgroundImage: `url(${product.url})`
								}}
								key={product.name}>
								{product.name}<br/>
								{getPriceDisplayStr(Number(product.price))}
							</Button>
						))}
					</div>
					{selectedItem.length > 0 ?
						<>
							<div className={styles.filtered_products_result}>
								<div className={styles.selected_item}>
									<FormControl variant="standard">
										<InputLabel id="demo-customized-select-label">쿠폰 선택</InputLabel>
										<Select sx={{m: 2, p: 1}} className={styles.coupon}
										        onChange={(e) => setSelectedCouponId(e.target.value)}
										        value={selectedCouponId}>
											
											{coupon.map((coupons) => (
												<MenuItem key={coupons.id} value={coupons.id}>{coupons.name}</MenuItem>
											))}
										</Select>
									</FormControl>
									{selectedItem.map((item, itemIndex) => (
										<>
											<div className={styles.selected_item_card} key={itemIndex}>
												<div className={styles.pay_button}>
													<ButtonGroup variant="outlined" aria-label="outlined button group">
														<Button className={styles.handle_item_count_change}
														        onClick={() => handleItemCountChange(item.name, -1)}> -1잔 </Button>
														<Button className={styles.handle_item_count_change}
														        onClick={() => handleItemCountChange(item.name, 1)}> +1잔 </Button>
														<Button className={styles.handle_item_count_change}
														        onClick={() => removeItem(item.name)}>X</Button>
													</ButtonGroup>
												</div>
												<h3 className={styles.selected_item_title}>{item.name} x {item.itemCount}</h3>
												{item.option.map((opt, optIndex) => (
													<div className={styles.option} key={optIndex}>
														<p
															className={styles.option_title}>{opt.name} - {opt.count ? `x ${opt.count}번` : '0번'} / {opt.price ? `${getPriceDisplayStr(opt.price)}원` : '0원'}</p>
														<Button variant="outlined" className={styles.select_option_button}
														        onClick={() => selectOptionPlus(item.name, opt.name)}>
															{opt.name} 선택 ( + 1)
														</Button>&nbsp;
														<Button variant="outlined" className={styles.select_option_button}
														        onClick={() => selectOptionMinus(item.name, opt.name)}>
															{opt.name} 해제 ( - 1)
														</Button>
													</div>
												))}<br/>
												<div className={styles.total}> 총 {getPriceDisplayStr(calculateItemTotal(item))}원</div>
											</div>
										</>
									))}
								</div>
								<br/>
								<div className={styles.apply_discount}>
									<div className={styles.apply_discount_text}>{selectedCoupon ? selectedCoupon.name : '할인 정보'}</div>
									<div className={styles.apply_discount_price}>{discountText}</div>
								</div>
							</div>
						</>
						:
						<div className={styles.no_result}>
							메뉴를 선택해주세요.
						</div>
					}
				</div>
			</div>
			<ButtonModal
				selectedItem={selectedItem}
				setPayment={setPayment}
				payment={payment}
				calculateFinalTotalWithDiscount={calculateFinalTotalWithDiscount}
				calculateItemTotal={calculateItemTotal}
			  selectedCoupon={selectedCoupon ?? null}
			  discountText={discountText}
			/>
		</>
	);
}

export default App;
