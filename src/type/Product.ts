import {Option} from "./Option";

export interface Product {
	id?: string;
	name: string;
	price: string;
	categoryId: string;
	option?: Option[];
	url?: string;
}

export interface SelectedProduct extends Product {
	itemCount: number;
	option: Option[];
	url?: string;
}
