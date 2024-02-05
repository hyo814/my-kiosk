import React from 'react';
import styles from "../../App.module.css";
import { Button } from "@mui/material";
import { getPriceDisplayStr } from "../Utils/utils";
import { Product, SelectedProduct } from "../../type/Product";

interface MenuCategoryProps {
	products: Product[];
	selectedItem: SelectedProduct[];
	setSelectedItem: React.Dispatch<React.SetStateAction<SelectedProduct[]>>;
	selectedCategoryId: string;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ products, selectedItem, setSelectedItem, selectedCategoryId }) => {
	const filteredProducts = products.filter(product => product.categoryId === selectedCategoryId);
	const addProductToSelectedItem = (product: Product) => {
		const existingProductIndex = selectedItem.findIndex(p => p.name === product.name);
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
				option: product.option || [],
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

export default MenuCategory;
