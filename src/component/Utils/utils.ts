import {SelectedProduct} from "../../type/Product";
import {Coupon} from "../../type/Coupon";

export 	const getPriceDisplayStr = (price: number, d = 0) => {
	return `${Number(price?.toFixed(d)).toLocaleString().split(/\s/).join(",")}`;
};

export const calculateItemTotal = (item: SelectedProduct): number => {
	const baseTotal = parseFloat(item.price) * item.itemCount;
	const optionTotal = item.option.reduce((acc, opt) => acc + ((opt.price || 0) * (opt.count || 0)), 0);
	return baseTotal + optionTotal;
};

export const calculateCumulativeTotal = (selectedItems: SelectedProduct[]): number => {
	return selectedItems.reduce((acc, item) => acc + calculateItemTotal(item), 0);
};

export const calculateFinalTotalWithDiscount = (selectedCoupon: Coupon | null, selectedItem: SelectedProduct[]): number => {
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

export const discountText = (selectedCoupon: Coupon | null): string => {
	return selectedCoupon ?
		`${selectedCoupon.type === 'amount' ? '금액 할인' : '비율 할인'}: -${getPriceDisplayStr(selectedCoupon.price, selectedCoupon.type === 'amount' ? 0 : 2)}${selectedCoupon.type === 'amount' ? '원' : '%'}` :
		'쿠폰을 선택해주세요.';
};
