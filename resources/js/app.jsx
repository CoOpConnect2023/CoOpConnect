import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from './ThemeContext.jsx';
import puzzle from '../../public/images/puzzle.svg'

const appName = import.meta.env.VITE_APP_NAME || "Laravel";



createInertiaApp({
    title: (title) => `${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {

        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = puzzle; 
        link.type = 'image/svg+xml';
        document.head.appendChild(link);

        const root = createRoot(el);

        root.render(
            <Provider store={store}>
                <ThemeProvider>
                    <App {...props} />
                </ThemeProvider>
            </Provider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
