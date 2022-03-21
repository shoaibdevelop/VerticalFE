import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginLeft: "5%",
    marginTop: "30px",
    justifyContent: "center",
  },
  image: {
    width: "60%",
  },
  centerImage: {
    textAlign: "center",
  },
  backButton: { margin: "10px 0px" },
  title: {
    flexGrow: 1,
  },
}));

export default function SearchDetails() {
  const classes = useStyles();
  const [result, setResult] = useState({
    photo: "",
    title: "",
    shortDescription: "",
    description: "",
  });
  let param = useParams();
  let navigate = useNavigate();

  const back = () => {
    navigate("/search");
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/search/${param.id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res.data[0]);
      })
      .catch((e) => console.log("error"));
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.backButton}>
        <ArrowBackIcon onClick={back} />
      </div>
      <div className={classes.centerImage}>
        <img className={classes.image} src={result.photo} />
      </div>
      <h1>{result.title}</h1>
      <h3>{result.shortDescription}</h3>
      <p>{result.description}</p>
    </div>
  );
}
