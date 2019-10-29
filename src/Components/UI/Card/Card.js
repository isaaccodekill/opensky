import React from 'react'
import	 styles	from './Card.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



// import Pin from ''
const CardComponent = ({ id, name, image, Location, clickFunc }) => {
	return (
	 <Card className={styles.card} onClick={clickFunc}>
	  {/*className={classes.card}*/}
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/*icon*/} {Location}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
	)
}

export default CardComponent