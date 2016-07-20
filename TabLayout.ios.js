import React, { Component } from 'react'
import { View, Text, TabBarIOS, StyleSheet, Image, Navigator } from 'react-native'
import Feed from './Feed'
import Detail from './Detail'

class TabLayout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedTab: 'Feed'
		}
	}

	_renderScene(route, navigator) {
		let globarNavigatorProps = { navigator }
		switch(route.id) {
			case 'Feed':
				return <Feed {...globarNavigatorProps} margin={45} />

			case 'Detail':
				return <Detail {...globarNavigatorProps} 
					feed={route.feed} />	
		}
	}

	render() {
		return (
			<TabBarIOS style={styles.container}>
				<TabBarIOS.Item
					selected={this.state.selectedTab === 'Feed'}
					icon={require('./images/ic_star.png')}
					title='Feed'
					onPress={() => {
						this.setState({selectedTab: 'Feed'})
					}}>
					<Navigator
						initialRoute={{id: 'Feed'}}
						renderScene={this._renderScene} />

				</TabBarIOS.Item>
				<TabBarIOS.Item
					selected={this.state.selectedTab === 'Search'}
					icon={require('./images/ic_search.png')}
					title='Search'
					onPress={() => {
						this.setState({selectedTab: 'Search'})
					}}>
					<View><Text>Nothing</Text></View>
				</TabBarIOS.Item>	
			</TabBarIOS>	
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    	alignItems: 'center',
    	justifyContent: 'center',
    	backgroundColor: 'white',
	}
})

module.exports = TabLayout