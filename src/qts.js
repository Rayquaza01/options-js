let opt = new Options("#options")

opt.loadSchema({
    sections: {
        shortcut: "Shortcut",
        search: "Search",
        recentlyClosed: "Recently Closed Tabs",
        ui: "UI"
    },
    options: [
        {
            id: "popupShortcut",
            type: "string",
            value: "F1",
            section: "shortcut"
        },
        {
            id: "searchMode",
            type: "select",
            values: ["Normal", "RegEx"],
            value: "Normal",
            section: "search",
            label: "Search Mode"
        },
        {
            id: "caseSensitivity",
            type: "checkbox",
            value: true,
            label: "Case Sensitivity",
            section: "search"
        },
        {
            id: "showRecentlyClosed",
            type: "checkbox",
            value: false,
            label: "Show Recently Closed Tabs",
            section: "recentlyClosed"
        },
        {
            id: "maxDead",
            type: "number",
            value: 0,
            min: 0,
            step: 1,
            label: "Maximum Number of Recently Closed Tabs (0 is unlimited)",
            section: "recentlyClosed"
        },
        {
            id: "colorScheme",
            type: "select",
            values: ["Light", "Dark"],
            value: "Light",
            label: "Colorscheme",
            section: "ui"
        }
    ]
})

opt.init();
