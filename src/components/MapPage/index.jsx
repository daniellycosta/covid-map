import { useCallback, useEffect, useState } from "react";
import { Container, Content } from "./styles";

import { Marker } from "../../common/Marker";
import { Map } from "../../common/Map";
import { CountryInfos } from "../../common/CountryInfos";

import { api } from "../../api";

import { CountrySelectionForm } from "../CountrySelectionForm";

export const MapPage = () => {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState("");
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    api.get("/countries").then(({ data: response }) => {
      setCountriesData(response.data);
    });
  }, []);

  const flyToPosition = useCallback(
    (coordinates) => {
      map.flyTo(coordinates);
    },
    [map]
  );

  const handleClickMarker = useCallback(
    (name, coordinates) => {
      setSelectedMarker(name);
      if (coordinates) flyToPosition(coordinates);
    },
    [setSelectedMarker, flyToPosition]
  );

  return (
    <Container>
      <Content>
        <CountrySelectionForm map={map} countriesData={countriesData} />
        <Map whenCreated={setMap}>
          {countriesData.map((country) => {
            const { coordinates, code, name, latest_data } = country;
            const { latitude, longitude } = coordinates;
            const { calculated } = latest_data;
            const { cases_per_million_population, death_rate, recovery_rate } =
              calculated;

            return (
              <Marker
                key={code}
                position={{ lat: latitude, lng: longitude }}
                tooltip={name}
                selected={code === selectedMarker}
                eventHandlers={{
                  popupopen: () =>
                    handleClickMarker(code, [latitude, longitude]),
                  popupclose: () => handleClickMarker(""),
                }}
              >
                <CountryInfos
                  name={name}
                  casesPerMillion={cases_per_million_population}
                  deathRate={death_rate}
                  recoveryRate={recovery_rate}
                />
              </Marker>
            );
          })}
        </Map>
      </Content>
    </Container>
  );
};
