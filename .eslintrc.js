module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "settings": {
        "react": {
          "version": "detect"
        }
    },
    "plugins": [
        "react", "prettier"
    ],
    "rules": {
        "no-console": "warn",
        "no-irregular-whitespace": 0,
        "react/prop-types": 0,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "prettier/prettier": "error",
        "react/no-unescaped-entities": 0
    }
};
