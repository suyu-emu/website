import { v4 } from "uuid";

export interface Modal {
	title: string;
	message: string;
}

export class ModalManager {
	private static listeners: {
		id: string;
		callback: (data: Modal) => void;
	}[] = [];

	static addListener(callback: (data: Modal) => void) {
		const id = v4();
		this.listeners.push({ id, callback });
		return id;
	}

	static removeListener(id: string) {
		this.listeners = this.listeners.filter((listener) => listener.id !== id);
	}

	static notify(data: Modal) {
		this.listeners.forEach((listener) => listener.callback(data));
	}
}
