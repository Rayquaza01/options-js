class Options {
    constructor(parentElement) {
        if (typeof parentElement !== "string" && typeof parentElement !== "HTMLElement") {
            throw TypeError(
                "Options constructor first argument must either be query string or HTMLElement"
            );
        }

        if (typeof parentElement === "string") {
            parentElement = document.querySelector(parentElement);
        }

        this.parent = parentElement;
    }

    loadSchema(schema) {
        if (schema.toString() !== "[object Object]") {
            throw TypeError("Schema must be object.");
        }

        this.schema = schema;
    }

    clear() {
        parentElement.innerText = "";
    }

    init() {
        Object.keys(this.schema.sections)
            .map(i => [i, this.schema.sections[i]])
            .forEach(this.createSection.bind(this));

        this.schema.options.forEach(item => new OptionsElement(item));
    }

    createSection(sectionInfo) {
        let head = document.createElement("h3");
        head.innerText = sectionInfo[1];
        this.parent.appendChild(head);

        let sectionBody = document.createElement("div");
        sectionBody.id = "optionSection" + sectionInfo[0];
        sectionBody.classList.add("optionsSection");
        this.parent.appendChild(sectionBody);
    }

    get(id) {
        return new OptionsElement(id);
    }

    export() {
        let obj = {};
        Object.keys(this.schema.sections).forEach(item => (obj[item] = {}));
        this.schema.options.forEach(item => {
            if (Object.prototype.hasOwnProperty.call(item, "section")) {
                obj[item.section][item.id] = new OptionsElement(item.id).getValue();
            }
        });
        return obj;
    }

    import(obj) {
        let sections = Object.keys(obj);
        sections.forEach(section => {
            let keys = Object.keys(obj[section]);
            keys.forEach(item => {
                new OptionsElement(item).setValue(obj[section][item])
            })
        })
    }
}

class OptionsElement {
    constructor(option, sectionBody = undefined) {
        if (typeof option === "string") {
            if (!option.startsWith("#")) {
                option = "#" + option;
            }
            this.ele = document.querySelector(option);
        } else if (option.toString() === "[object Object]") {
            if (typeof sectionBody === "undefined") {
                if (!Object.prototype.hasOwnProperty.call(option, "section")) {
                    throw Error("Section was not specified");
                }
                sectionBody = document.querySelector("#optionSection" + option.section);
            }
            if (!Object.prototype.hasOwnProperty.call(option, "id")) {
                throw Error("Option does not have ID")
            } else {
                if (option.id.startsWith("$")) {
                    let length = document.querySelector("#" + option.id.substring(1)).firstChild.children.length - 1;
                    option.id = option.id.substring(1) + "Element" + length;
                }

                if (sectionBody.classList.contains("arrayRow")) {
                    let match = (option.id.match(/\d+$/) || [])[0];
                    option.id = option.id.substring(0, option.id.length - match.length) + (parseInt(match) + 1)
                }
            }

            if (Object.prototype.hasOwnProperty.call(option, "label")) {
                let row = document.createElement("div");
                row.classList.add("optionsRow");

                let label = document.createElement("label");
                label.innerText = option.label;
                label.for = option.id;
                sectionBody.appendChild(label);
                row.appendChild(label);

                sectionBody.appendChild(row);
                sectionBody = row;
            }

            if (option.type === "select") {
                let select = document.createElement("select");
                select.id = option.id;
                option.values.forEach(item => {
                    let opt = document.createElement("option");
                    opt.value = item;
                    opt.innerText = item;
                    select.appendChild(opt);
                });
                select.value = option.value;

                sectionBody.appendChild(select);
                return;
            } else if (option.type === "array") {
                let cont = document.createElement("div");
                cont.id = option.id;
                cont.classList.add("arrayContainer");

                let arrayCol = document.createElement("div");
                arrayCol.classList.add("arrayContainer");
                cont.appendChild(arrayCol);

                let arrayRow = document.createElement("div");
                arrayRow.classList.add("arrayRow")
                arrayCol.appendChild(arrayRow);

                let add = document.createElement("button");
                add.innerText = "Add";
                add.classList.add("arrayadd");
                add.addEventListener("click", this.addEntry.bind(this, option.template))
                cont.appendChild(add);

                sectionBody.appendChild(cont);
                this.ele = cont;

                new OptionsElement(option.template, arrayRow);

                return;
            } else if (option.type === "object") {
                this.ele = [];
                let cont = document.createElement("div");
                cont.id = option.id;
                sectionBody.appendChild(cont);
                option.options.forEach(item => {
                    this.ele.push(new OptionsElement(item, cont));
                });
                return;
            } else if (option.type === "color") {
                let cont = document.createElement("div");
                cont.id = option.id;
                cont.classList.add("color");

                let colorTextInput = document.createElement("input");
                colorTextInput.type = "text";
                colorTextInput.pattern = "#[a-f0-9]{6}";
                cont.appendChild(colorTextInput);

                let colorInput = document.createElement("input");
                colorInput.type = "color";
                cont.appendChild(colorInput);
                sectionBody.appendChild(cont);

                colorInput.value = option.value;
                colorTextInput.value = colorInput.value;

                colorInput.addEventListener("input", () => {
                    colorTextInput.value = colorInput.value;
                });
                colorTextInput.addEventListener("input", () => {
                    colorInput.value = colorTextInput.value;
                });

                return;
            }

            let optInput = document.createElement("input");
            optInput.id = option.id;
            if (option.type === "string" || option.type === "text") {
                optInput.type = "text";
                ["pattern", "placeholder", "minLength", "maxLength"].forEach(item => {
                    if (Object.prototype.hasOwnProperty.call(option, item)) {
                        optInput.setAttribute(item, option[item]);
                    }
                });
            } else if (option.type === "number") {
                optInput.type = "number";
                ["min", "max", "step"].forEach(item => {
                    if (Object.prototype.hasOwnProperty.call(option, item)) {
                        optInput.setAttribute(item, option[item]);
                    }
                });
            } else if (option.type === "boolean" || option.type === "checkbox") {
                optInput.type = "checkbox";
            }

            optInput.value = Object.prototype.hasOwnProperty.call(option, "value")
                ? option.value
                : "";

            sectionBody.appendChild(optInput);
            if (option.type === "boolean" || option.type === "checkbox") {
                sectionBody.appendChild(sectionBody.firstChild);
                if (option.value) {
                    optInput.click();
                }
            }

            this.ele = optInput;
        }
    }

    getValue() {
        if (this.ele.tagName === "DIV") {
            if (this.ele.classList.contains("color")) {
                return this.ele.firstChild.value;
            } else if (this.ele.classList.contains("arrayContainer")) {
                let arr = [];
                if (this.ele.firstChild.children.length === 0) {
                    return arr;
                }
                [...this.ele.firstChild.children].forEach(item => {
                    console.log(item.firstChild)
                    arr.push(new OptionsElement(item.firstChild.id, item).getValue())
                })
                return arr;
            }
            let obj = {};
            [...this.ele.children].forEach(item => {
                let itemObj = new OptionsElement("#" + item.id);
                obj[item.id] = itemObj.getValue();
            });
            return obj;
        } else if (this.ele.type === "checkbox") {
            return this.ele.checked;
        }
        return this.ele.value;
    }

    setValue(val) {
        if (this.ele.tagName === "DIV") {
            [...this.ele.children].forEach(item => {
                let itemObj = new OptionsElement("#" + item.id);
                itemObj.setValue(val);
            });
        } else if (this.ele.type === "checkbox") {
            if (this.ele.checked !== val) {
                this.ele.click();
            }
        }
        this.ele.value = val;
    }

    addEntry(template) {
        if (this.ele.classList.contains("arrayContainer")) {
            let row = document.createElement("div");
            row.classList.add("arrayRow");
            this.ele.firstChild.appendChild(row);

            console.log(template)
            new OptionsElement(template, row);
        } else {
            throw TypeError(
                "This element is not an array. addEntry is only supported on arrays."
            );
        }
    }

    setAttribute(name, value) {
        this.ele.setAttribute(name, value);
    }

    addEventListener(listener, callback) {
        this.ele.addEventListener(listener, callback);
    }
}
