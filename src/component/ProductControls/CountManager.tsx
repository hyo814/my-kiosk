import React from 'react';
import styles from "../../App.module.css";
import {Button, ButtonGroup} from "@mui/material";
import {calculateItemTotal, getPriceDisplayStr} from "../Utils/utils";
import {useRecoilState} from "recoil";
import { selectedItemsState} from "../../state/atoms";

const CountManager: React.FC = () => {
	const [selectedItem, setSelectedItem] = useRecoilState(selectedItemsState)
	const removeItem = (productName: string) => {
		setSelectedItem(currentItems => currentItems.filter(item => item.name !== productName));
	};
	
	const selectOptionPlus = (productName: string, optionName: string) => {
		updateOptionCount(productName, optionName, 1);
	};
	
	const selectOptionMinus = (productName: string, optionName: string) => {
		updateOptionCount(productName, optionName, -1);
	};
	
	const updateOptionCount = (productName: string, optionName: string, change: number) => {
		setSelectedItem(currentItems =>
			currentItems.map(item => {
				if (item.name === productName) {
					const optionIndex = item.option.findIndex(opt => opt.name === optionName);
					if (optionIndex > -1) {
						let newOptions = [...item.option];
						const option = newOptions[optionIndex];
						let updatedCount = (option.count || 0) + change;
						if (!option.price && updatedCount > 1) {
							updatedCount = 1;
						} else {
							updatedCount = Math.max(0, updatedCount);
						}
						
						newOptions[optionIndex] = {...option, count: updatedCount};
						return {...item, option: newOptions};
					}
				}
				return item;
			})
		);
	};
	
	const handleItemCountChange = (productName: string, change: number) => {
		setSelectedItem(current =>
			current.map(product =>
				product.name === productName ? {...product, itemCount: Math.max(1, product.itemCount + change)} : product
			)
		);
	};
	
	return (
		<>
				{selectedItem.map((item, itemIndex) => (
					<>
						<div className={styles.selected_item_card} key={itemIndex}>
							<div className={styles.pay_button}>
								<ButtonGroup variant="outlined" aria-label="outlined button group">
									<Button className={styles.handle_item_count_change}
									        onClick={() => handleItemCountChange(item.name, -1)}> -1 </Button>
									<Button className={styles.handle_item_count_change}
									        onClick={() => handleItemCountChange(item.name, 1)}> +1 </Button>
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
		</>
	);
};

export default CountManager;
