import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios';

export class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      jobs: []
    }
  }

  componentDidMount() {
    const { isLoggedIn } = this.props.auth;
    if (isLoggedIn) {
      axios({
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
          query: 'Python developer in Texas, USA',
          page: '1',
          num_pages: '1'
        },
        headers: {
          'X-RapidAPI-Key': '6ad7d645b1mshddc5320a2fa9ec2p19467bjsn8945964ebfa4',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      })
        .then(response => {
          const jobData = response.data[0]; // Assuming the API response contains job data
          console.log(response.data[0])
          this.setState({ jobs: jobData });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          console.log("error")
        });
    }
  }

  render() {
    const { isLoggedIn, username } = this.props.auth;
    console.log("redux var from home", this.props.auth)
    const { jobs } = this.state
    return (
      <>
        <View
          style={{ color: 'black' }}>
          <Text style={{ color: 'black' }}> Home Component</Text>
        </View>

        <View
          style={{ color: 'black' }}>

          {true ? (
            <Text>Welcome to the Home Screen, {username}!</Text>

          ) : (
            <Text>Please log in to access this page.</Text>
          )}
        </View>

        <View style={styles.container}>
          {jobs.map(job => (
            <View key={job.id} style={styles.card}>
              <Text style={styles.title}>{job.title}</Text>
              <Text>{job.company}</Text>
              <Text>{job.location}</Text>
              {/* Add more job details */}
            </View>
          ))}
        </View>
      </>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
});




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});


export default connect(mapStateToProps)(Home);
