import React from 'react'
import	 styles	from './Card.module.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



// import Pin from ''
const CardComponent = ({ id, name, image, Location, clickFunc }) => {
	return (
	 <Card className={styles.card} onClick={clickFunc}>
	  {/*className={classes.card}*/}
      <CardActionArea style={{
        height: "290px"
      }}>
        <CardMedia
          component="img"
          height="180"
          image={image}
          style={{
              position: "absolute",
              top: 0
          }}
        />
        <CardContent
            style={{
              position: "absolute",
              top: "180px"
            }}

        >
          <Typography gutterBottom variant="h5" component="h2" style={{
            fontSize: '18px'
          }}>
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