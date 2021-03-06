import { useState } from "react";
import {
  Container,
  Select,
  InputContainer,
  SelectContainer,
  ClearButton,
} from "./styles";

import expandMoreImg from "../../assets/expandMore.svg";
import expandLessImg from "../../assets/expandLess.svg";
import closeImg from "../../assets/close.svg";

export const AutoCompleteInput = ({ options = [], onClickOption }) => {
  const [value, setValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [filteredSugestions, setFilteredSugestions] = useState([]);

  const getFilteredSugestions = (filterText) => {
    if (!options) return;

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(filterText.toLowerCase())
    );

    setFilteredSugestions(filteredOptions);
    setShowOptions(true);
  };

  const handleOnChange = (event) => {
    setValue(event.target.value);

    if (event.target.value === "") {
      resetEntries();
      return;
    }

    getFilteredSugestions(event.target.value);
  };

  const resetEntries = () => {
    setFilteredSugestions([]);
    setShowOptions(false);
  };

  const handleClickOption = (optionValue) => {
    setShowOptions(false);
    setValue(optionValue);
    if (onClickOption) onClickOption(optionValue);
  };

  const handleClickShowAllOptions = (event) => {
    event.preventDefault();

    if (!showOptions) setFilteredSugestions(options);
    setShowOptions(!showOptions);
  };

  return (
    <Container>
      <InputContainer optionsOpen={showOptions}>
        <input value={value} onChange={handleOnChange} />
        {value && (
          <ClearButton onClick={() => setValue("")}>
            <img src={closeImg} alt="Clear input" />
          </ClearButton>
        )}
        <button onClick={handleClickShowAllOptions}>
          {showOptions ? (
            <img src={expandLessImg} alt="Expand Less Icon" />
          ) : (
            <img src={expandMoreImg} alt="Expand More Icon" />
          )}
        </button>
      </InputContainer>
      <SelectContainer>
        {showOptions && (
          <Select>
            {filteredSugestions.length ? (
              filteredSugestions.map((option) => (
                <li
                  key={option}
                  value={option}
                  onClick={() => handleClickOption(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li key={"notFound"} className="disabled">
                Not Found
              </li>
            )}
          </Select>
        )}
      </SelectContainer>
    </Container>
  );
};
