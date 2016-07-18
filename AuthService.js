import { Alert, AsyncStorage } from 'react-native'

const _ = require('lodash')
const buffer = require('buffer')
const LOGIN_URL = 'https://api.github.com/user'
const AUTH_KEY = 'auth'
const USER_KEY = 'user'

class AuthService {

	getAuthInfo(callBack) {
		AsyncStorage.multiGet([AUTH_KEY, USER_KEY], (err, val) => {
			console.log('Err', err)
			console.log('Value ', val)
			if(err) {
				return callBack(err)
			}

			if(!val) {
				return callBack(null, null)
			}

			return callBack(null, JSON.parse(val[1][1]))
		})
	}

	loginToAccount(credentials, callBack) {
		var b = buffer.Buffer(credentials.userName + ':' + 
				credentials.password)
		var encodedAuth = b.toString('base64');
		fetch(LOGIN_URL, {
				headers: {
					'Authorization' : 'Basic ' + encodedAuth
				}
			})
			.then(response => {
				if (response.status >= 200 && response.status <= 300) {
					return response
				}

				if (response.status === 401) {
					throw 'Bad credentials'
				}

				throw 'Unknown error'
			})
			.then(response => response.json())
			.then(result => {
				AsyncStorage.multiSet([
						[AUTH_KEY, encodedAuth],
						[USER_KEY, JSON.stringify(result)]
					], (err) => {
						if (err) {
							throw err
						}
					})

				return callBack({isChecking: false, user: result})
			})
			.catch(err => {
				Alert.alert('Error!', err)
			})
			.finally(() => callBack({isChecking: false}))
	}
}

module.exports = new AuthService()