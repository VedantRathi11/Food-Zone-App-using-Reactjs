import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchReasult from "./Components/SearchResult/SearchReasult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const resp = await fetch(BASE_URL);
        const json = await resp.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch Data");
      }
    };
    fetchFoodData();
  }, [1]);

  console.log(data);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(e);
    console.log(searchValue);

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredData(filter);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading....</div>;
  }

  const filteredFood = (typee) => {
    if (typee === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(typee.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(typee);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "BreakFast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  return (
    <>
      <Container>
        <TopSection>
          <div className="logo">
            <img src="./public/Foody Zone.svg" alt="" />
          </div>

          <div className="search">
            <input
              onChange={searchFood}
              type="text"
              placeholder="Search Food..."
            />
          </div>
        </TopSection>

        <FilterContainer>
          {filterBtns.map(({ name, type }) => (
            <Button
              isSelected={selectedBtn === type}
              key={name}
              onClick={() => filteredFood(type)}
            >
              {name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchReasult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  /* background: #000; */
`;

const TopSection = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  .search {
    input {
      background: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;

      &::placeholder {
        color: white;
      }
    }
  }

  @media (0 < width <600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
`;

export const Button = styled.button`
  color: white;
  background: ${(props) => (props.isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${(props) => (props.isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: #f22f2f;
  }
`;
