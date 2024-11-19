import styled from 'styled-components';
import { Logo } from './Logo';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    gender: ''
  });

  const handleFilterChange = (field, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(field, value);
    } else {
      newParams.delete(field);
    }
    newParams.set('page', 1);
    setSearchParams(newParams);

    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const resetFilters = () => {
    setSearchParams({});
    setFilters({
      name: '',
      status: '',
      species: '',
      gender: ''
    });
  };

  return (
    <HeaderContainer>
      <Logo />
      <FiltersContainer>
        <StyledInput
          type="text"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        <StyledSelect
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </StyledSelect>
        <StyledSelect
          value={filters.species}
          onChange={(e) => handleFilterChange('species', e.target.value)}
        >
          <option value="">All species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
        </StyledSelect>
        <StyledSelect
          value={filters.gender}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
        >
          <option value="">Any gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </StyledSelect>
        <ResetButton onClick={resetFilters}>Reset Filters</ResetButton>
      </FiltersContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const FiltersContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;

  input,
  select {
    font-size: 16px;
    width: 100%;
  }
`;

const StyledInput = styled.input`
  padding: 10px 15px;
  font-size: 16px;
  background: #263750;
  color: #fff;
  border-radius: 10px;
  border: none;
  outline: none;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }
`;

const StyledSelect = styled.select`
  padding: 10px 15px;
  font-size: 16px;
  background: #263750;
  color: #fff;
  border-radius: 10px;
  border: none;
  outline: none;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ResetButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background: #263750;
  color: #fff;
  border-radius: 10px;
  border: none;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }
`;
