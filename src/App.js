// FRON-ENT OF SMART-BRAIN APP

import React,{Component} from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from './components/Logo/Logo';
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank"
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


const initialState = {
  input: '',
  imageUrl: '', // We want to have an 'imageUrl' state and it will be empty for now and this 'imageUrl' should
                //get displayed when we click on submit,
  box: {},
  route: 'signin',  // the route keeps track of where we are on the page.In our case, we want it to start on 'signin'.
  isSignedIn: false,
  user: {
        id: '',
        name:'',
        email: '',
        entries: 0,
        joined: ''

  }
} //we use this now because we want to use state. so that, our app knows, what the value is that the user enters, remembers it, and updates at any time it gets changed.


class App extends Component {
  constructor(){
    super();
      this.state = initialState ;
    
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name:data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    try {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
  
      return {
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
        leftCol: clarifaiFace.left_col * width
      };
    } catch (error) {
      console.log('Error in calculateFaceLocation:', error);
      return {}; // Return an empty object or handle the error appropriately
    }
  }
  



  displayFaceBox = (box) => {
      this.setState({box: box })
  }



  onInputChange = (event) => {
      this.setState({input: event.target.value});  //.target.value is the way we get our value from the input
  }  //we want to pass it as a prop to the linkform

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
  
    fetch("https://fr-server.onrender.com/imageurl", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://fr-server.onrender.com/image", {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }
  


    onRouteChange = (route) => {
      if (route === 'signout'){
        this.setState({...initialState})  
      } else if (route === 'home'){
        this.setState({isSignedIn: true})
      }
      this.setState({route:  route});
    }
      
  render() {
    const {isSignedIn, imageUrl,route,box} = this.state; //with this destructuring i dont have to write everytime this.state infront of the components
      return ( //Here is where we declare and create our components needed to assemble the web app
        <div className="App">  
        <>
          <ParticlesBg type="circle" bg={true} />
        </>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
              <Logo/>
              <Rank name={this.state.user.name} 
              entries = {this.state.user.entries} 
              />

              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
                
              <FaceRecognition box = {box} imageUrl={imageUrl}/>
          </div>
          
          :(
            route === 'signin'
            ? <Signin loadUser= {this.loadUser}  onRouteChange={this.onRouteChange}/>
            : <Register loadUser= {this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          
      
      }
        </div>
      );
  }
}

export default App;
