import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

export interface Game {
  _id: string
  title: string;
  pageCount: string;
  thumbnailUrl: string;
  isbn: string;
}

const BASEURL = (process.env.NODE_ENV === 'development') ? "http://localhost:5000" : "http://localhost:5000";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: "pointer"
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    padding: "10px"
  },
  cardDetails: {
    display: 'block'
  },
  cardHeading: {
    fontWeight: 600,
    width: "100px"
  },
  cardValue: {
    lineBreak: "anywhere"
  },
  gridAction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  actionButton: {
    margin: "10px !important"
  },
}));


function BookList(props: any) {
  const { history } = props;
  const classes = useStyles();
  const [gameList, setGameList] = useState<Game[]>([]);



  const getGameData = async () => {
    await axios.get(BASEURL + '/books')
      .then((response) => response.data)
      .then((res) => {
        setGameList(res);
      });
  }


  useEffect(() => {
    getGameData();
  }, []);

  return (
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {gameList.map((card, index) => {
              if(!card.thumbnailUrl){
                return null;
              }
              return <Grid key={index} item xs={12} sm={6} md={4}>
                <Card className={classes.card} onClick={() => history.push('books/'+card._id)}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.thumbnailUrl}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <div className={classes.cardDetails}>
                      <Typography className={classes.cardHeading} component="h3">
                        ISBN
                    </Typography>
                      <Typography className={classes.cardValue} component="h4">
                        {card.isbn}
                      </Typography>
                    </div>
                    <div className={classes.cardDetails}>
                      <Typography className={classes.cardHeading} component="h3">
                        Page Count
                    </Typography>
                      <Typography className={classes.cardValue} component="h4">
                        {card.pageCount}
                      </Typography>
                    </div>

                  </CardContent>
                </Card>
              </Grid>
})}
          </Grid>
        </Container>
  );
}

export default BookList;
