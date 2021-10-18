import { useCallback, useEffect, useState } from "react";
import { FormContainer } from "./style";

import { AutoCompleteInput } from "../../common/AutoCompleteInput";

export const CountrySelectionForm = ({ map, countriesData }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(countriesData.map((country) => country.name));
  }, [countriesData]);

  const getCountryLayer =
    ({ latitude, longitude, name }) =>
    (layer) => {
      const { _latlng, _tooltip } = layer;

      if (!_latlng && !_tooltip) return false;

      const { children: countryName } = _tooltip && _tooltip.options;

      const coordinatesAreTheSame =
        _latlng && _latlng.lat === latitude && _latlng.lng === longitude;

      const namesAreTheSame = countryName === name;

      return coordinatesAreTheSame && namesAreTheSame;
    };

  const handleSelectCountry = useCallback(
    (countryName) => {
      const selectedCountry = countriesData.find(
        ({ name }) => name === countryName
      );
      if (selectedCountry) {
        const { coordinates, name } = selectedCountry;
        const { latitude, longitude } = coordinates;

        const countryLayer = Object.values(map._layers).find(
          getCountryLayer({ latitude, longitude, name })
        );

        if (countryLayer) {
          map.flyTo([latitude, longitude]);
          countryLayer.openPopup();
        }
      }
    },
    [countriesData, map]
  );

  return (
    <FormContainer>
      <h1>Covid Data</h1>
      <AutoCompleteInput
        options={options}
        onClickOption={handleSelectCountry}
      />
      <p>Click on a marker or search a country</p>
    </FormContainer>
  );
};
