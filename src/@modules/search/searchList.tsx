import { useEffect, useState } from "react";
import Header from "../../components/header";
import RowItem from "../../components/rowItem";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles({
  singleLine: {
    width: "90%",
    marginLeft: "5%",
    height: "50px !important",
  },
  singleLineSearch: {
    width: "89%",
    height: "100%",
  },
  singleLineSearchButton: {
    width: "10%",
    height: "100%",
    padding: "15px 14px",
    marginLeft: "1%",
  },
  results: {
    width: "90%",
    marginLeft: "5%",
  },
  cardAction: { display: "flex", justifyContent: "space-around" },
});
const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(61, 54, 54)",
    },
    secondary: {
      main: "rgb(61, 54, 54)",
    },
  },
});
function SearchList() {
  const classes = useStyles();
  const locationState = useLocation();
  let history: string | null = sessionStorage.getItem("history");
  const state = JSON.parse(JSON.parse(JSON.stringify(history)));
  const [search, setSearch] = useState(state?.search ? state.search :  locationState?.state ? locationState.state : "");
  const [searchResults, setSearchResults] = useState(
    state?.searchResults ?? ""
  );

  const handleValueChange = (e: any) => {
    setSearch(e.target.value);

    const obj = {
      search: search,
      searchResults: searchResults,
    };
    sessionStorage.setItem("history", JSON.stringify(obj));
  };
  window.onload = function () {
    sessionStorage.clear();
  };

  const handleBtnClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    callAPI();
  };

  const callAPI = () => {
    if (search !== "") {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/search?search=${search}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then(async (results) => {
          setSearchResults(results.data);
          let obj = {
            search: search,
            searchResults: results.data,
          };
          sessionStorage.setItem("history", JSON.stringify(obj));
        });
    }
  };
  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div>
      <Header />
      {
        <div>
          <div className={classes.singleLine}>
            <form name="searchForm2" noValidate onSubmit={handleBtnClick}>
              <MuiThemeProvider theme={theme}>
                <TextField
                  variant="outlined"
                  label="Search"
                  autoFocus={false}
                  type="text"
                  name="search"
                  required={true}
                  fullWidth
                  onChange={handleValueChange}
                  value={search}
                  className={classes.singleLineSearch}
                />
              </MuiThemeProvider>
              {
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBtnClick}
                  className={classes.singleLineSearchButton}
                >
                  Search
                </Button>
              }
            </form>
          </div>
          <div className={classes.results}>
            {searchResults.length == 0 ? (
              <h2> No results found for the search</h2>
            ) : (
              searchResults.map((result: any) => <RowItem data={result} />)
            )}
          </div>
        </div>
      }
    </div>
  );
}

export default SearchList;
