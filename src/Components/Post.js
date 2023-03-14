import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import Tooltip from '@mui/material/Tooltip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




const Search = styled('div')(({ theme }) => ({       //  this is styling used for  search icon .. it provide  material ui
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


function Post() {
  const [data, setData] = useState([]);        // create this state for store repsonse data which is got from api
  const [expandedId, setExpandedId] = React.useState(-1);   // define this state for   expanded collapse  open or close
  const [searchData, setSearchData] = useState('');       // using this state for  filter the card  based  on title



  const handleExpandClick = (i) => {                    // This is function  used  for show more details after click on  down arrow icon ...
    setExpandedId(expandedId === i ? -1 : i)               // the -1  equal to false   bacause  expanded function  exist only boolean value

  }

  useEffect(() => {

    axios.get("https://dummyjson.com/posts")      // using aixos library for fetech data from api
      .then(response => {
        setData(response.data.posts)             // store  the data in state
      })
      .catch(error => console.log(error))     // if catch any error
  }, [])
  // console.log(data)
  return (
    <>

      {/* ------------------------------------------------------Navbar  section---------------------------------------------------------------  */}


      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Detrator
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => setSearchData(e.target.value)}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>


      {/*--------------------------- Card section------------------------------------------- */}

      {/* Using  some unnecessary material Ui icon or tag for UI looked better */}
      <Box sx={{ flexGrow: 1, paddingTop: "32px", }}>

        <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: 'flex-start' }} spacing={2}>
          {
            data.filter((value) => {
              if (searchData === "") {
                return value
              } else if (value.title.toLowerCase().includes(searchData.toLowerCase())) {
                return value
              }
            }).map((element, index) => {
              return <Card key={element.id} sx={{ maxWidth: "400px", minHeight: '300px', borderRadius: "10px", margin: "12px" }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {element.title[0]}
                    </Avatar>
                  }

                  title={element.title}
                  subheader={element.userId}
                />

                <CardContent >
                  <Typography variant="subtitle2" color="text.secondary">
                    {element.body.slice(0, 120)}...
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>

                  <ExpandMore
                    expand={expandedId === index}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expandedId === index}
                    aria-label="show more"
                  >
                    <Tooltip title="Read more">
                     <ExpandMoreIcon color="primary" />
                    </Tooltip>
                   </ExpandMore>
                </CardActions>





  {/*--------------------------  Collapse Section   it show when  click on the down arrow icon----------------------------------  */}

                <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>User id: {element.id}</Typography>
                    <Typography component="h3" paragraph>{element.body}</Typography>
                    <Typography paragraph>Tags: {element.tags.join(" ")}</Typography>
                  </CardContent>
                </Collapse>
              </Card>




            })
          }


        </Grid>

      </Box>

    </>
  )
}

export default Post;