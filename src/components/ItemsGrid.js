import { useState } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { Card } from './card';
import { useData } from './providers';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid() {
  const { characters, isFetching, isError } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  function cardOnClickHandler(props) {
    setPopupSettings({
      visible: true,
      content: { ...props }
    });
  }

  if (isFetching) {
    return <p>Загрузка данных...</p>;
  }

  if (isError) {
    return <p>Ошибка при загрузке данных</p>;
  }

  if (!characters.length) {
    return <p>Нет персонажей, соответствующих фильтрам</p>;
  }

  return (
    <Container>
      {characters.map((props) => (
        <Card
          key={props.id}
          onClickHandler={() => cardOnClickHandler(props)}
          {...props}
        />
      ))}

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
