import React from 'react';
import styles from "../../App.module.css";
import { Button } from "@mui/material";
import { getPriceDisplayStr } from "../Utils/utils";
import { Product, SelectedProduct } from "../../type/Product";
import { useRecoilValue, useRecoilState } from "recoil";
import { productsState, selectedCategoryIdState, selectedItemsState } from "../../state/atoms";

const ProductList: React.FC = () => {
	const products = useRecoilValue(productsState);
	const [selectedItem, setSelectedItem] = useRecoilState(selectedItemsState);
	const selectedCategoryId = useRecoilValue(selectedCategoryIdState);
	
	const filteredProducts = products.filter(product => product.categoryId === selectedCategoryId);
	
	const addProductToSelectedItem = (product: Product) => {
		const existingProductIndex = selectedItem.findIndex(p => p.id === product.id);
		if (existingProductIndex > -1) {
			const newSelectedProducts = [...selectedItem];
			newSelectedProducts[existingProductIndex] = {
				...newSelectedProducts[existingProductIndex],
				itemCount: newSelectedProducts[existingProductIndex].itemCount + 1,
			};
			setSelectedItem(newSelectedProducts);
		} else {
			const newProduct: SelectedProduct = {
				...product,
				itemCount: 1,
				option: product.option ?? [],
			};
			setSelectedItem(prevItems => [...prevItems, newProduct]);
		}
	};
	
	return (
		<>
			<div className={styles.filtered_products}>
				{filteredProducts.map(product => (
					<Button
						variant="outlined"
						onClick={() => addProductToSelectedItem(product)}
						key={product.id}
						className={styles.product_menu_button}
						style={{ backgroundImage: `url(${product.url})` }}
					>
						{product.name}<br />
						{getPriceDisplayStr(Number(product.price))}
					</Button>
				))}
			</div>
		</>
	);
};

export default ProductList;
