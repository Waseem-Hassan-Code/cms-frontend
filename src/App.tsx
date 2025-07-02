import { useTranslation } from "react-i18next";
import LanguageDropdown from "./app/components/app-languages";

function App() {
  const { t } = useTranslation();
  return (
    <>
      <div className="min-h-screen bg-red-200 flex justify-center items-center">
        <LanguageDropdown />
        <h1 className="text-3xl font-bold text-red-700">{t("testing")}</h1>
      </div>
    </>
  );
}

export default App;
