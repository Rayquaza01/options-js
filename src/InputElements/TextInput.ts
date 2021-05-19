import { GenericInputOptions, GenericInputElement } from "./GenericInput";

export interface TextInputOptions extends GenericInputOptions {
    pattern?: string
}

export class TextInputElement extends GenericInputElement {
    constructor(opts?: TextInputOptions) {
        super(opts);

        this._element.type = "text";
        this._element.pattern = opts.pattern ?? "";
    }

    get value(): string {
        return this._element.value;
    }

    set value(val: string) {
        this._element.value = val;
    }

}
