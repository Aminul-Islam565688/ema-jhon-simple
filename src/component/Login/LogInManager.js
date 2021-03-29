import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'


export const initializeLogInFrameWork = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }else {
        firebase.app(); // if already initialized, use that one
    }
};


export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success:true
        }
        return signedInUser
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  };

export const handleGoogleSignOut = () => {
    return firebase.auth().signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          password:'',
          photo: '',
          error:'',
          success:false,
        }
        return signedOutUser;
      })
      .catch((error) => {
      });
  }

export const handleFacebook = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(facebookProvider)
    .then(res => {
        const user = res.user;
        user.success = true;
        return user;
    })
    .catch(err => console.log(err)) 
  }

export const createUserWithEmailAndPassword = (name, email, password) => {
   return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserInfo(name);
        return newUserInfo;
      })
      .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo ;
      });   
}

export const userSignInWithEmailAndPassword = (email, password) => {
   return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
      })
      .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
}

export const updateUserInfo = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,

    }).then(function() {
      console.log("User Name Updated Successfully");
    }).catch(function(error) {
      console.log(error);
    })}