import React from 'react';
import styles from "../../App.module.css";
import {calculateItemTotal, getPriceDisplayStr} from "../Utils/utils";
import {useRecoilValue} from "recoil";
import {selectedItemsState} from "../../state/atoms";

const PayPaper: React.FC = () => {
	const selectedItem = useRecoilValue(selectedItemsState);
	
	return (
		<>
			{selectedItem.map((item, itemIndex) => (
				<div className={styles.paper_content} key={itemIndex}>
					<h3 className={styles.selected_title}>{item.name} x {item.itemCount}</h3>
					{item.option && item.option.map((opt, optIndex) => (
						<div className={styles.option_title} key={optIndex}>
							<p>{opt.name} - {opt.count ? `x ${opt.count}` : ''} {opt.price ? `${getPriceDisplayStr(opt.price)}원` : ''}</p>
						</div>
					))}
							<div className={styles.total}> 총 {getPriceDisplayStr(calculateItemTotal(item))}원</div>
				</div>
			))}
		</>
	);
}

export default PayPaper;
