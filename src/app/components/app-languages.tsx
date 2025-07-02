// src/components/LanguageDropdown.tsx
import React from "react";
import { useTranslation } from "react-i18next";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { languages } from "../../utilities/languages";

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();

  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    const selectedLang = event.target.value as string;
    i18n.changeLanguage(selectedLang);
  };

  return (
    <div className="w-full max-w-[200px]">
      <FormControl fullWidth size="small">
        <InputLabel id="language-select-label">{t("language")}</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={i18n.language}
          label="Language"
          onChange={handleChange}
          className="bg-white rounded-md shadow-sm"
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default LanguageDropdown;
