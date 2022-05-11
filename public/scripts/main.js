/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * Christian Beadling and Matthew McClenahan 
 */
// Comment test
var rhit = rhit || {};

function htmlToElement(html) {
	var template = document.createElement('template');
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
}

rhit.Text = class {
	constructor(id, text) {
		this.id = id;
		this.text = text;
	}
}

rhit.FbTextManager = class {

}

rhit.DuckyPageController = class {

}

//-------------------------------------------------------------------------------------

rhit.FbAuthManager = class {
	constructor() {
		this._user = null;
	}
	beginListening(changeListener) {
		firebase.auth().onAuthStateChanged((user) => {
			this._user = user;
			changeListener();
		});
	}
	signIn() {
		Rosefire.signIn("fb2a6a0c-f24a-4fbd-ad0c-b2e095ca2be9", (err, rfUser) => {       
			if (err) {
				console.log("Rosefire error!", err);
				return;
			}
			console.log("Rosefire success!", rfUser);

			// Next use the Rosefire token with Firebase auth.
			firebase.auth().signInWithCustomToken(rfUser.token).catch((error) => {
				if (error.code === 'auth/invalid-custom-token') {
					console.log("The token you provided is not valid.");
				} else {
					console.log("signInWithCustomToken error", error.message);
				}
			});
		});


	}
	signOut() {
		firebase.auth().signOut();
	}
	get uid() {
		return this._user.uid;
	}
	get isSignedIn() {
		return !!this._user;
	}
}

rhit.LoginPageController = class {
	constructor() {
		document.querySelector("#rosefireButton").onclick = (event) => {
			rhit.fbAuthManager.signIn();
		};
	}
}
 
rhit.checkForRedirects = function () {
	// Redirects
	if (document.querySelector("#loginPage") && rhit.fbAuthManager.isSignedIn) {
		window.location.href = "/managerPage.html";             //fix
	}
	if (!document.querySelector("#loginPage") && !rhit.fbAuthManager.isSignedIn) {
		window.location.href = "/";
	} 
}

rhit.initializePage = function () {
	if (document.querySelector("#loginPage")) {
		new rhit.LoginPageController();
	}
	if (document.querySelector("#managerPage")) {
		new rhit.ManagerPageController();
	}
}

//-------------------------------------------------------------------------------------

rhit.main = function () {
	console.log("Ready");
	rhit.fbAuthManager = new rhit.FbAuthManager();
	rhit.fbAuthManager.beginListening(() => {
		console.log(`The auth state has changed.   isSignedIn = ${rhit.fbAuthManager.isSignedIn}`);
		rhit.checkForRedirects();
		rhit.initializePage();
	});


	var uiConfig = {
		signInSuccessUrl: "/list.html",
		signInOptions: [
		  // Leave the lines as is for the providers you want to offer your users.
		  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		  firebase.auth.EmailAuthProvider.PROVIDER_ID,
		  firebase.auth.PhoneAuthProvider.PROVIDER_ID,
		  firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
		],
	  };
	  const ui = new firebaseui.auth.AuthUI(firebase.auth());
	  ui.start("#firebaseui-auth-container", uiConfig);
};

rhit.main();