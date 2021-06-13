import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import moment from "moment";

interface PublicationDate {
  date: string;
}

interface Book {
  _id: string
  title: string;
  pageCount: string;
  thumbnailUrl: string;
  isbn: string;
  longDescription: string;
  authors : Array<string>;
  publishedDate: PublicationDate;
}

const BASEURL = (process.env.NODE_ENV === 'development') ? "http://localhost:5000" : "http://localhost:5000";

const useStyles = makeStyles((theme: any) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    marginBottom: "2em"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "red"
  }
}));

function BookDetails(props: any) {
  const classes = useStyles();
  const [bookDetails, setBookDetails] = useState<Partial<Book>>({});



  const getGameData = async () => {
    await axios.get(BASEURL + '/books/'+ props.match.params.id)
      .then((response) => response.data)
      .then((res) => {
        setBookDetails(res.book);
      });
  }


  useEffect(() => {
    getGameData();
  });

  return <Container className={classes.cardGrid} maxWidth="md">
  {/* End hero unit */}
  <Grid container spacing={4}>
  {bookDetails._id ? <div>
              <Card className={classes.card}>
                <CardHeader title={bookDetails.title} />
                <CardMedia
                  className={classes.media}
                  image={bookDetails.thumbnailUrl}
                  title="Contemplative Reptile"
                />

                <CardContent>
                  <Typography paragraph variant="h6">
                        Author:
                  </Typography>
                  <Typography paragraph>
                       {bookDetails.authors && bookDetails.authors.length ? bookDetails.authors.join(", "): null}
                  </Typography>
                  <Typography paragraph variant="h6">
                        Publication Year:
                  </Typography>
                  <Typography paragraph>
                        {bookDetails.publishedDate &&  moment(bookDetails.publishedDate.date).format("YYYY")}
                  </Typography>
                  <Typography paragraph variant="h6">
                        Description:
                  </Typography>
                  <Typography paragraph>
                        {bookDetails.longDescription}
                  </Typography>
                  <Typography paragraph variant="h6">
                        ISBN:
                  </Typography>
                  <Typography paragraph>
                        {bookDetails.isbn}
                  </Typography>
                  <Typography paragraph variant="h6">
                        Page Count:
                  </Typography>
                  <Typography paragraph>
                        {bookDetails.pageCount} pages
                  </Typography>
                </CardContent>
              </Card>
            </div> : 
            <Typography paragraph variant="h6">
           No record found
      </Typography>}
      </Grid>
      </Container>
  ;
}

export default BookDetails;
