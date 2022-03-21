import { useEffect, useState } from "react";
import Header from "../../components/header";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles({
  main: {
    width: "100%",
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  root: {
    padding: "20px",
    minWidth: 375,
    maxWidth: 400,
    marginTop: "20px",
    paddingBottom: "20px",
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    display: "flex",
    alignSelf: "center",
    justifyContent: "space-around",
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
function Search() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleValueChange = (e: any) => {
    setSearch(e.target.value);
  };
  window.onload = function () {
    sessionStorage.clear();
  };

  const handleBtnClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (search !== "") {
      navigate("/search", { state: search });
    }
  };

  useEffect(()=>{
    sessionStorage.clear();
  })

  return (
    <div>
      <Header />
      <div className={classes.main}>
        <Card className={classes.root}>
          <form name="searchForm" noValidate onSubmit={handleBtnClick}>
            <CardContent>
              <Typography className={classes.title} variant="h1">
                Search Engine
              </Typography>
              <br></br>
              <MuiThemeProvider theme={theme}>
                <TextField
                  style={{ marginBottom: "20px" }}
                  variant="outlined"
                  label="Search"
                  autoFocus={false}
                  type="text"
                  name="search"
                  required={true}
                  fullWidth
                  onChange={handleValueChange}
                  value={search}
                />
              </MuiThemeProvider>
            </CardContent>
            <CardActions className={classes.cardAction}>
              {
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBtnClick}
                >
                  Search
                </Button>
              }
            </CardActions>
          </form>
        </Card>
      </div>
      )
    </div>
  );
}

export default Search;
