export interface GenericInputOptions {
    placeholder?: string
    classes?: string[]
    dataset?: Record<string, string>
}

export class GenericInputElement {
    protected _container: HTMLSpanElement;
    protected _element: HTMLInputElement;

    constructor(opts?: GenericInputOptions) {
        this._container = document.createElement("span");
        this._element = document.createElement("input");
        this._container.appendChild(this._element);

        this._element.placeholder = opts.placeholder ?? "";

        for (const className in opts.classes) {
            this._element.classList.add(className);
        }

        for (const [key, value] of Object.entries(opts.dataset)) {
            this._element.dataset[key] = value;
        }
    }

    get element(): HTMLInputElement {
        return this._element;
    }

    get container(): HTMLSpanElement {
        return this._container;
    }

    get disabled(): boolean {
        return this._element.disabled;
    }

    set disabled(val: boolean) {
        this._element.disabled = val;
    }

    get valid(): boolean {
        return this._element.validity.valid;
    }
}
