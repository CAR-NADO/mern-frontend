interface Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

interface Country {
  name: string;
  isoCode: string;
  flag: string;
  phonecode: string;
  currency: string;
  timezones: Timezone[]; // Updated to use the correct structure for timezones
}

import CountryJson from "./country.json";
import flags from "react-phone-number-input/flags";

export const getAllCountries = (): Country[] => {
  return CountryJson;
};

export const getCountryByCountryCode = (countryCode: string): Country | null => {
  if (!countryCode) return null;
  return CountryJson.find(({ isoCode }) => isoCode === countryCode) || null;
};

export const getCountryByPhoneCode = (code: string): Country | undefined => {
  return CountryJson.find(({ phonecode }) => phonecode === code);
};

export const getTimezonesByCountryCode = (countryCode: string): Timezone[] | undefined => {
  return CountryJson.find(({ isoCode }) => isoCode === countryCode)?.timezones;
};

interface FlagProps {
  iso?: string;
  className?: string;
}

export const GetFlagWithCountryCode = ({ iso = "IN" }: FlagProps): JSX.Element | null => {
  const flag = flags[iso as keyof typeof flags];
  if (flag) {
    return flag({ title: iso });
  }
  return null;
};

export const GetFlagByCountryName = ({ name }: { name?: string }): JSX.Element | null => {
  const allCountries = getAllCountries();
  const country = allCountries?.find((val) => val.name.toLowerCase() === name?.toLowerCase());

  if (country?.isoCode) {
    return <div className="min-w-[1.2rem] h-6 w-6 flex">
      <GetFlagWithCountryCode iso={country.isoCode} />
    </div>;
  }

  return null;
};

export const GetCountryNameWithFlag = (iso: string): JSX.Element | undefined => {
  const allCountries = getAllCountries();
  const country = allCountries?.find((val) => val?.isoCode === iso);
  if (iso && country) {
    return (
      <div className="flex items-center gap-2">
        <div className="min-w-[1.2rem] flex">
          <GetFlagWithCountryCode iso={iso} />
        </div>
        <div className="flex justify-center font-normal text-sm">{country.name}</div>
      </div>
    );
  }
};

interface NumberWithFlagProps {
  iso: string;
  number: string;
}

export const GetNumberWithFlag = ({ iso, number }: NumberWithFlagProps): JSX.Element | undefined => {
  const allCountries = getAllCountries();
  const country = allCountries?.find((val) => val?.isoCode === iso);
  if (iso && country) {
    return (
      <div className="flagBox d--flex align-items--center gap--sm">
        <div className="w-min--28 d--flex">{GetFlagWithCountryCode({ iso })}</div>
        <div className="d--flex justify-content--center font--400 font--sm">{number}</div>
      </div>
    );
  }
};
