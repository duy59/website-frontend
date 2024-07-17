// pages/games.js
import React from 'react';
import GameList from '../../components/Games/index';


async function getData(pageActive, limit) {
  const res = await fetch(`https://game.tbg95.com/api/game-list?page=${pageActive}&perPage=${limit}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function getStaticProps() {
  const pageActive = 0;
  const limit = 30;
  const result = await getData(pageActive, limit);

  return {
    props: {
      initialData: result.data || [],
      initialCategories: result.categories || [],
      initialPageActive: pageActive,
      initialPageQuantity: Math.ceil(result.totalPage || 0)
    },
    revalidate: 10 // Rebuild the page every 10 seconds if a request comes in
  };
}

export default function Games({ initialData, initialCategories, initialPageActive, initialPageQuantity }) {
  const [data, setData] = React.useState(initialData);
  const [categories, setCategories] = React.useState(initialCategories);
  const [pageActive, setPageActive] = React.useState(initialPageActive);
  const [pageQuantity, setPageQuantity] = React.useState(initialPageQuantity);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getData(pageActive, 30);
      setData(result.data || []);
    };

    fetchData();
  }, [pageActive]);

  const handleClickPage = async (pageIndex) => {
    setPageActive(pageIndex);
  };

  const handlePreviousPage = () => {
    if (pageActive > 0) {
      setPageActive(pageActive - 1);
    }
  };

  const handleNextPage = () => {
    if (pageActive < pageQuantity - 1) {
      setPageActive(pageActive + 1);
    }
  };

  return (
    <GameList
      data={data}
      categories={categories}
      pageActive={pageActive}
      pageQuantity={pageQuantity}
      onClickPage={handleClickPage}
      onPreviousPage={handlePreviousPage}
      onNextPage={handleNextPage}
    />
  );
}
