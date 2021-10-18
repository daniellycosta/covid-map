import { Container } from "./style";

export const CountryInfos = ({
  name,
  casesPerMillion,
  deathRate,
  recoveryRate,
}) => {
  const handlePercentages = (number) => {
    return number ? `${number.toFixed(2)}%` : "no data";
  };

  return (
    <Container>
      <h3>{name}</h3>
      <ul>
        <li>{`Cases per million: ${casesPerMillion}`}</li>
        <li>{`Death rate: ${handlePercentages(deathRate)}`}</li>
        <li>{`Recovery rate: ${handlePercentages(recoveryRate)}`}</li>
      </ul>
    </Container>
  );
};
