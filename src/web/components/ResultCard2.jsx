const axios = require('axios')

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends React.Component {
	constructor() {
		super()
		this.state = {
		  open: true,
		  steps: []
		};
		this.fmtItem = this.fmtItem.bind(this)
	}

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

	componentDidMount() {
		let start = document.querySelector('#step1').value
		let end = document.querySelector('#step2').value

		console.log(`Req ${start} - ${end}`)

		axios.post(`/path`, {
			start: start,
			end: end
		})
		.then(resp => {
			console.log(resp.data)
			let x = resp.data
			this.setState({
				steps: x
			})
			console.log(this.state.steps)
		})
		.catch(err => {
			console.log(err)
			console.log(err.response)
			this.setState({
				steps: [
					{
						station: "Something bad happened",
						lineNumber: "666",
						lineName: "",
						time: ""
					}
				]
			})
		})
	}

  	fmtItem(item) {
		return `${item.lineNumber} @ ${item.station}, ${item.time}, Direction: ${item.lineName}`
  	}

  render() {
    const { classes } = this.props;

    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div">Directions: </ListSubheader>}
        className={classes.root}
      >
	  {
		this.state.steps.map((item, index) => 
			<ListItem key={item.time} button>
				<ListItemIcon>
					<SendIcon />
				</ListItemIcon>
				<ListItemText inset primary={this.fmtItem(item)} />
			</ListItem>
		)
	  }
      </List>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
