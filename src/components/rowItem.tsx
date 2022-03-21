import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "20px",
  },
  image: {
    width: "20%",
  },
  text: {
    width: "80%",
    marginLeft: "50px",
  },
}));

export default function RowItem({
  data: { id, photo, title, shortDescription },
}: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.image} src={photo} alt="Image" />
      <div className={classes.text}>
        <h2>
          <Link to={`/details/${id}`}>{title}</Link>
        </h2>
        <p>{shortDescription}</p>
      </div>
    </div>
  );
}
