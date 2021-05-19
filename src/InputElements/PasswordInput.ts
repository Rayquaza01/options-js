import { TextInputElement, TextInputOptions } from "./TextInput";

export interface PasswordInputOptions extends TextInputOptions {
    hidden: boolean
}

export class PasswordInputElement extends TextInputElement {
    constructor(opts?: PasswordInputOptions) {
        super(opts);

        this._element.type = "password";
        this.hidden = opts.hidden ?? true;
    }

    get hidden(): boolean {
        return this._element.type === "password";
    }

    set hidden(val: boolean) {
        this._element.type = val
            ? "password"
            : "text";
    }
}
