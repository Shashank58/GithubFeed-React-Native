import React, { Component } from 'react'
import { View, StyleSheet, Image, ListView, Text, ActivityIndicator, 
  TouchableHighlight } from 'react-native'

var moment = require('moment')

class Feed extends Component {
	constructor(props) {
	   super(props); 
	   this.state = {
	      dataSource: new ListView.DataSource({
	        rowHasChanged: (row1, row2) => row1 !== row2
	      }),
	      loaded: false,
	   }
  }

	componentDidMount() {
  	this.fetchData()
	}

  fetchData() {
  	require('./AuthService').getAuthInfo((err, authInfo) => {
  		var url = 'https://api.github.com/users/'
  					+ authInfo.login + '/received_events'
  		fetch(url, {
  				headers: authInfo.header
  		})		
  		.then((response) => response.json())
  		.then((responseData) => {
  			this.setState({
  				loaded: true,
  				dataSource: this.state.dataSource.cloneWithRows(responseData)
  			})
  		})
  	})
  }

  renderFeed(feed) {
      let event = ''
      switch(feed.type) {
        case 'PushEvent':
          event = ' pushed to '
          break

        case 'WatchEvent':
          event = ' starred '
          break

        case 'CreateEvent':
          event = ' created '
          break

        case 'ForkEvent':
          event = ' forked '
          break      
      } 
  		return(
        <TouchableHighlight onPress={() => this._pressRow(feed)}>  
      		<View style={styles.container}>
            <Image source={{uri: feed.actor.avatar_url}} 
                      style={styles.avatarPic} />    
              <View style={styles.userInfo}>      
                <Text style={styles.userName}>{feed.actor.display_login}
                <Text style={styles.event}>{event}</Text></Text>
                <Text style={styles.repoName}>{feed.repo.name}</Text>
                <Text style={styles.timeAgo}>{moment(feed.created_at).fromNow()}</Text>
              </View>        
          </View>
        </TouchableHighlight>
		  )
  }

  _pressRow(feed) {
    this.props.navigator.push({
      id: 'Detail',
      feed: feed
    })
  }

	render() {
		if (!this.state.loaded) {
			return(
				<ActivityIndicator
              animating={true}
              size='large'
              style={styles.loading} />
			)
		}

		return(
        <View style={styles.mainContainer}>
          <View style={styles.statusBar} />
          <View style={styles.navBar}>
            <Text style={styles.title}>Feed</Text>
          </View>
    			<ListView 
    				automaticallyAdjustContentInsets={true}
    				dataSource={this.state.dataSource}
    				renderRow={this.renderFeed.bind(this)}
            renderSeparator={this.renderSeparator} 
            style={styles.listView} />
        </View>
		)
	}

  renderSeparator(sectionID, rowID) {
    return (
            <View style={styles.separator} key={sectionID+rowID}/>
        );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: '#EEEEEE',
    height: 20
  },
  navBar: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE'
  },
  title: {
    fontSize: 20,
    fontWeight: '600'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12
  },
  separator: {
    height: 1,
    backgroundColor: '#CCC'
  },
  avatarPic: {
    marginLeft: 4,
    width: 36,
    height: 36,
    borderRadius: 16
  },
  listView: {
    marginBottom: 45
  },
  userInfo: {
    paddingLeft: 24,
    paddingRight: 16,
    flex: 1,
    flexDirection: 'column'
  },
  userName: {
    fontWeight: '600',
  },
  repoName: {
    fontWeight: '600',
    paddingTop: 2
  },
  timeAgo: {
    color: '#727272',
    fontSize: 12,
    paddingTop: 4
  },
  event: {
    fontWeight: '400'
  }, 
  loading: {
    flex: 1,
    alignSelf: 'center'
  }
})

module.exports = Feed