let opt = new Options("#options");

opt.loadSchema({
    sections: {
        default: "Default",
        section1: "Section 1"
    },
    options: [
        {
            id: "firstString",
            section: "default",
            type: "string",
            value: "Some text..."
        },
        {
            id: "something",
            section: "section1",
            type: "string",
            value: "",
            placeholder: "enter value here",
            label: "Something"
        },
        {
            id: "st2",
            section: "section1",
            type: "number",
            label: "Enter a number between 5 and 20",
            value: 10,
            min: 5,
            max: 20,
            step: 0.5
        },
        {
            id: "bool",
            type: "boolean",
            label: "A checkbox",
            value: true,
            section: "default"
        },
        {
            id: "sometjhasdf",
            type: "select",
            values: ["Yes", "No", "Maybe"],
            value: "No",
            label: "Make a selection",
            section: "section1"
        },
    ]
});

opt.init();

let opt2 = new Options("#options-dirty");

opt2.loadSchema({
    sections: {
        default2: "Default",
        section12: "Section 1"
    },
    options: [
        {
            id: "firstString1",
            section: "default2",
            type: "string",
            value: "Some text..."
        },
        {
            id: "something1",
            section: "section12",
            type: "string",
            value: "OK",
            label: "Something"
        },
        {
            id: "st21",
            section: "section12",
            type: "number",
            label: "Enter a number:",
            value: 10,
            min: 5,
            max: 20,
            step: 0.5
        },
        {
            id: "bool1",
            type: "boolean",
            label: "a toggle",
            value: true,
            section: "default2"
        },
        {
            id: "test1",
            type: "object",
            label: "Colorscheme",
            section: "section12",
            options: [
                {
                    id: "cName",
                    type: "text",
                    placeholder: "c name",
                    minLength: 1
                },
                {
                    id: "test21",
                    type: "color",
                    placeholder: "First color"
                },
                {
                    id: "test31",
                    type: "color",
                    placeholder: "second color"
                }
            ]
        },
        {
            id: "sometjhasdf1",
            type: "select",
            values: ["opt1", "opt2", "opt3"],
            value: "opt2",
            label: "Mode",
            section: "section12"
        },
        {
            id: "array",
            label: "Some array",
            type: "array",
            section: "section12",
            template: {
                id: "$array",
                type: "string",
                value: "OK"
            }
        }
    ]
});

opt2.init();
