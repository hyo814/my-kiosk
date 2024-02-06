import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../../App.module.css';
import { Button } from '@mui/material';
import { categoriesState, selectedCategoryIdState } from '../../state/atoms';

const CategoryHeader: React.FC = () => {
	const categories = useRecoilValue(categoriesState);
	const [, setSelectedCategoryId] = useRecoilState(selectedCategoryIdState);
	
	const handleCategorySelect = (categoryId: string) => {
		setSelectedCategoryId(categoryId);
	};
	
	return (
		<div className={styles.container_menu}>
			<div className={styles.menu_categories}>
				{categories.map((category) => (
					<Button
						sx={{m:1, p:1, backgroundColor:"darkcyan"}}
						className={styles.categories}
						variant="contained"
						key={category.id}
						onClick={() => handleCategorySelect(category.id)}
					>
						{category.name}
					</Button>
				))}
			</div>
		</div>
	);
};

export default CategoryHeader;
