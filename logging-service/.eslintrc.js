module.exports = {
    env: {
        node: true,
        es6: true,
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    rules: {
        "prettier/prettier": "error",
        "no-console": "off"
    }
};
