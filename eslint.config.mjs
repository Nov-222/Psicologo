import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                document: "readonly",
                window: "readonly",
                alert: "readonly",
                prompt: "readonly",
                console: "readonly",
                supabase: "readonly" // Agregamos supabase porque lo cargas desde el CDN en el HTML
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "complexity": ["warn", 10]
        }
    }
];