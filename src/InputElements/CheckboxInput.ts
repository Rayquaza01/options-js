import { GenericInputOptions, GenericInputElement } from "./GenericInput";

export interface CheckboxInputOptions extends GenericInputOptions {
    checked?: boolean;
}

export class CheckboxInputElement extends GenericInputElement {
    constructor(opts?: CheckboxInputOptions) {
        super(opts);

        this._element.type = "checkbox";
    }

    get value(): boolean {
        return this._element.checked;
    }

    set value(val: boolean) {
        this._element.checked = val;
    }
}
