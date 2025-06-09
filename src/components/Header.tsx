/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google?: any;
  }
}

const Header = () => {
  useEffect(() => {
    // Cargar el script de Google Translate solo una vez
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      // Definir la función global de inicialización
      window.googleTranslateElementInit = function () {
        // eslint-disable-next-line no-undef
        new window.google.translate.TranslateElement(
          { pageLanguage: "es", includedLanguages: "en,es,fr,de", layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
          "google_translate_element"
        );
      };
    }
  }, []);

  return (
    <header className="sticky-top py-3">
      <div className="container-fluid d-flex justify-content-end">
        <span className="me-3">Idioma:</span>
        <div id="google_translate_element" />
      </div>
    </header>
  );
};

export default Header;
