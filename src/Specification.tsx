import React from 'react';
import styles from "../src/App.module.css";

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

interface SpecificationProps {
	payment: boolean; // 결제 여부
	selectedItem: SelectedProduct[]; // 선택된 상품 목록
	selectedCoupon: Coupon | null; // 선택된 쿠폰, 없을 경우 null
	calculateFinalTotalWithDiscount: () => number; // 할인 적용 후 최종 금액 계산 함수
	discountText: string; // 할인 정보 텍스트
	calculateItemTotal: (item: SelectedProduct) => number; // 각 아이템의 총액 계산 함수
}

const Specification: React.FC<SpecificationProps> = ({
	                                                     selectedItem,
	                                                     selectedCoupon,
	                                                     calculateFinalTotalWithDiscount,
	                                                     discountText,
	                                                     calculateItemTotal
                                                     }) => {
	
	return (
		<>
			<div className={styles.paper}>
				<div className={styles.paper_title}>주문 내역</div>
				<div>
					{selectedItem.map((item, itemIndex) => (
						<div key={itemIndex}>
							<h3 className={styles.selected_title}>{item.name} x {item.itemCount}</h3>
							{item.option.map((opt, optIndex) => (
								<div className={styles.option_title} key={optIndex}>
									<p>{opt.name} - {opt.count ? `x ${opt.count}` : ''} {opt.price ? `${opt.price}원` : ''}</p>
								</div>
							))}
							<div className={styles.total}> 총 {calculateItemTotal(item)}원</div>
						</div>
					))}
				</div>
				<div className={styles.apply_discount}>
					<div className={styles.apply_discount_text}>{selectedCoupon ? selectedCoupon.name : '할인 정보'}</div>
					<div className={styles.apply_discount_price}>{discountText}</div>
				</div>
				<div className={styles.total_price}>{calculateFinalTotalWithDiscount()}원 결제</div>
			</div>
		</>
	);
}

export default Specification;
