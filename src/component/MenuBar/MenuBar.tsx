import React from 'react';
import styles from "../../App.module.css";
import {Button} from "@mui/material";
import {Category} from "../../type/Category";

interface MenuBarProps {
	categories: Category[];
	setSelectedCategoryId: (categoryId: string) => void;
}

const MenuBar : React.FC<MenuBarProps> = ({categories, setSelectedCategoryId}) => {
	const CategoriesButton = (categoryId: string) => {
		setSelectedCategoryId(categoryId);
	};
	return (
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
	);
}

export default MenuBar;
