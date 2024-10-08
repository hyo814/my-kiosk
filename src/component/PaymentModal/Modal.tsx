import React from 'react';
import styles from "../../App.module.css";

interface ModalProps {
	show: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
	if (!show) {
		return null;
	}
	
	return (
		<div className={styles.modal} onClick={onClose}>
			<div className={styles.modal_content} onClick={e => e.stopPropagation()}>
				<span className={styles.close} onClick={onClose}>&times;</span>
				{children}
			</div>
		</div>
	);
};

export default Modal;
