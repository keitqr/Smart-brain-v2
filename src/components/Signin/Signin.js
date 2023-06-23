import React from "react";
// import "./Signin.css";
//since we use tachhyons package, they have some forms available
class Signin extends React.Component <any,any> {
    constructor(props) {
      super(props);
      this.state = {
        signInEmail: '',
        signInPassword: ''
      }
    }

    onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = (event) => {
        event.preventDefault();
        console.log("Sign In button clicked");
        // setTimeout(() => { // Add a delay of 2000 milliseconds (2 seconds) to the console.log
        fetch('https://fr-server.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                console.log("Response from server:", user);
                console.table(user);
                
                if (user.id){ // does the user exist? Did we receive a user with a property of id?
                    console.log("User signed in successfully");
                    this.props.loadUser(user);
                    this.props.onRouteChange('home'); //this means that on click on sign in it will take us somewhere, via route change
                    //we want it to run whenever 'onClick' happens and then 'onClick' will call this function. Thats why we use arrow function 
                } else {
                    console.log("Error logging in");
                    console.log(user);
                }
            }).catch(err => console.log(err));
        // }, 15000); // Delay of 2000 milliseconds (2 seconds)
    }

    render(): React.ReactNode {
        const {onRouteChange} = this.props;
        return ( //making the image to be displayed nicely despite the size making sure that the wirdth is the same no matter what.
            <article className="center br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 ">
                <main className="pa4 black-80">
                        <form className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange = {this.onEmailChange}
                            />
                            
                            </div>
                            <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange = {this.onPasswordChange}
                            />
                            
                            </div>
                            {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                        </fieldset>
                        <div className="">
                            <input 
                            onClick={this.onSubmitSignIn}  //this means that on click on sign in it will take us somewhere, via route change
                            //we want it to run whenever 'onClick' happens and then 'onClick' will call this function. Thats why we use arrow function
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')}  className="f6 link dim black db pointer">Register</p>
                            {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                        </div>
                        </form>
                </main>
            </article>
        
        );
    }  
}

export default Signin;


