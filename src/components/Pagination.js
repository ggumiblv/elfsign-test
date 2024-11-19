import styled from 'styled-components';
import { useEffect } from 'react';
import { useData } from './providers';

export function Pagination() {
  const { info, searchParams, setSearchParams } = useData();

  const activePage = parseInt(searchParams.get('page')) || 1;

  const pageClickHandler = (index) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchParams({ page: index + 1 });
  };

  const pages = Array.from({ length: info.pages }, (_, i) => i + 1);

  if (pages.length <= 1) return null;

  return (
    <StyledPagination>
      {activePage > 1 && (
        <>
          <Page onClick={() => pageClickHandler(0)}>« First</Page>
          <Ellipsis>...</Ellipsis>
        </>
      )}

      {activePage > 1 && (
        <Page onClick={() => pageClickHandler(activePage - 2)}>
          {activePage - 1}
        </Page>
      )}

      <Page active>{activePage}</Page>

      {activePage < pages.length && (
        <Page onClick={() => pageClickHandler(activePage)}>
          {activePage + 1}
        </Page>
      )}

      {activePage < pages.length && (
        <>
          {activePage + 1 !== pages.length && (
            <>
              <Ellipsis>...</Ellipsis>
              <Page onClick={() => pageClickHandler(pages.length - 1)}>
                Last »
              </Page>
            </>
          )}
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
  min-height: 50px;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
