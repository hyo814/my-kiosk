import {atom} from 'recoil';
import {Category} from '../component/type/Category';
import {Product, SelectedProduct} from '../component/type/Product';
import {Coupon} from '../component/type/Coupon';

export const categoriesState = atom<Category[]>({
	key: 'categoriesState',
	default: [],
});

export const productsState = atom<Product[]>({
	key: 'productsState',
	default: [],
});

export const selectedCategoryIdState = atom<string>({
	key: 'selectedCategoryIdState',
	default: 'frontend.coffee'
});

export const selectedItemsState = atom<SelectedProduct[]>({
	key: 'selectedItemsState',
	default: [],
});

export const couponsState = atom<Coupon[]>({
	key: 'couponsState',
	default: [],
});

export const selectedCouponIdState = atom<string>({
	key: 'selectedCouponIdState',
	default: '',
});

export const paymentState = atom<boolean>({
	key: 'paymentState',
	default: false,
});
