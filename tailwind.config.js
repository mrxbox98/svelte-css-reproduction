const plugin = require("tailwindcss/plugin");

/**
 * utility class presets
 */
function _presets() {
    const shapes = ["circle", "ellipse"];
    const pos = {
        c: "center",
        t: "top",
        b: "bottom",
        l: "left",
        r: "right",
        tl: "top left",
        tr: "top right",
        bl: "bottom left",
        br: "bottom right",
    };
    let result = {};
    for (const shape of shapes)
        for (const [posName, posValue] of Object.entries(pos))
            result[`${shape}-${posName}`] = `${shape} at ${posValue}`;

    return result;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            backgroundSize: {
                "size-200": "200% 200%",
            },
            backgroundPosition: {
                "pos-0": "0% 0%",
                "pos-100": "100% 100%",
            },
            colors: {
                default: {
                    950: "var(--default-950)",
                    900: "var(--default-900)",
                    800: "var(--default-800)",
                    700: "var(--default-700)",
                    600: "var(--default-600)",
                    500: "var(--default-500)",
                    400: "var(--default-400)",
                    300: "var(--default-300)",
                    200: "var(--default-200)",
                    100: "var(--default-100)",
                    50: "var(--default-50)",
                },
            },
            screens: {
                sidebar: "1800px",
            },
        },
        textShadow: {
            sm: "1px 1px 2px var(--tw-shadow-color)",
            DEFAULT: "2px 2px 4px var(--tw-shadow-color)",
            lg: "4px 4px 8px var(--tw-shadow-color)",
            xl: "4px 4px 16px var(--tw-shadow-color)",
        },
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    "text-shadow": (value) => ({
                        textShadow: value,
                    }),
                },
                { values: theme("textShadow") },
            );
        }),
        require("@tailwindcss/typography"),
        plugin(
            function ({ matchUtilities, theme }) {
                matchUtilities(
                    {
                        // map to bg-radient-[*]
                        "bg-radient": (value) => ({
                            "background-image": `radial-gradient(${value},var(--tw-gradient-stops))`,
                        }),
                    },
                    { values: theme("radialGradients") },
                );
            },
            {
                theme: {
                    radialGradients: _presets(),
                },
            },
        ),
    ],
};
