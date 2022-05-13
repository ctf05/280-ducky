/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * Christian Beadling and Matthew McClenahan 
 */
// Comment test
var rhit = rhit || {};
// console.log("test");

//Christian's Version
// rhit.fbTextManager = null;
// rhit.fbDuckyManager = null;
// rhit.currentDucky = "blah";

rhit.FB_COLLECTION_DUCKYS = "Duckys";
rhit.FB_KEY_AUTHOR = "author";
rhit.FB_KEY_LAST_TOUCHED = "lastTouched";
rhit.FB_KEY_DUCKYNAME = "duckyName";
rhit.FB_KEY_COLOR = "color";
rhit.FB_KEY_CHAT = "chat";
rhit.duckyManager = null;
rhit.fbAuthManager = null;



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

rhit.Ducky = class {
	constructor(id, name, color, chat) {
		this.id = id;
		this.chat = chat;
		this.name = name;
		this.color = color;
	}
}

rhit.FbTextManager = class {

}

rhit.DuckyPageController = class {

}

//-------------------------------------------------------------------------------------


// Christian's Version
// rhit.FbTextManager = class {

//     constructor() {

//         this._ref = firebase.firestore().collection("Duckys");

//     }



//     add(sender, text) {

//         this._ref.add({

//             ["sender"]: sender,

//             ["text"]: text,

//         });

//     }

// }

rhit.ChatPageController = class {
	constructor() {
		document.querySelector("#signOutButton").onclick = (event) => {
			rhit.fbAuthManager.signOut();
		};
		document.querySelector("#managerButton").onclick = (event) => {
			window.location.href = `/managerPage.html?uid=${rhit.fbAuthManager.uid}`
		};

		let duckyText = document.querySelector(".duckyText").innerHTML;

		// document.querySelector("#duckyImage").src="images/duckBlue.png";

		// Change Picture function (not working right now, ducky.color is out of scope)
		document.querySelector("#duckyImage").src=`images/duck${ducky.color}.png`;

		


		// rhit.duckyManager.beginListening(this.loadChat.bind(this));
	}



}

// Christians Version
// rhit.ManagerPageController = class {

// 	constructor() {



// 		document.querySelector("#blue").onclick = (event) => {

// 			document.getElementById("persDropdown").innerHTML = "blue";

// 		};

// 		document.querySelector("#red").onclick = (event) => {

// 			document.getElementById("persDropdown").innerHTML = "red";

// 		};

// 		document.querySelector("#yellow").onclick = (event) => {

// 			document.getElementById("persDropdown").innerHTML = "yellow";

// 		};

// 		document.querySelector("#green").onclick = (event) => {

// 			document.getElementById("persDropdown").innerHTML = "green";

// 		};



// 		document.querySelector("#submitAddBot").onclick = (event) => {

// 			const name = document.querySelector("#inputName").value;

// 			const color = document.getElementById("persDropdown").innerHTML;

// 			rhit.fbDuckyManager.add(name, color);

// 		};

// 	}

// }

rhit.ManagerPageController = class {
	constructor() {
		console.log(rhit.duckyManager);
		document.querySelector("#signOutButton").onclick = (event) => {
			rhit.fbAuthManager.signOut();
		};
		document.querySelector("#blue").onclick = (event) => {
			document.getElementById("persDropdown").innerHTML = "blue";
		};
		document.querySelector("#red").onclick = (event) => {
			document.getElementById("persDropdown").innerHTML = "red";
		};
		document.querySelector("#yellow").onclick = (event) => {
			document.getElementById("persDropdown").innerHTML = "yellow";
		};
		document.querySelector("#green").onclick = (event) => {
			document.getElementById("persDropdown").innerHTML = "green";
		};
		document.querySelector("#submitAddDucky").onclick = (event) => {
			const name = document.querySelector("#inputName").value;
			const color = document.querySelector("#colorDropdown").innerHTML.toLowerCase();
			const chat = [];
			if (name == "" || color.trim() == "color") {
				$('#errorDialog').modal('show')
			} else {
				const colorArray = document.querySelector("#colorDropdown").innerHTML.toLowerCase().split('<')
				rhit.duckyManager.add(name, colorArray[0], chat);
			}
		};

		$('#color a').on('click', function () {
			document.querySelector("#colorDropdown").innerHTML = this.innerHTML;
		});

		$("#addDuckyDialog").on("show.bs.modal", (event) => {
			document.querySelector("#inputName").value = "";
			document.querySelector("#colorDropdown").innerHTML = "Color";
		});

		$("#addDuckyDialog").on("shown.bs.modal", (event) => {
			document.querySelector("#inputName").focus();

		});

		rhit.duckyManager.beginListening(this.updateList.bind(this));
	}

	_createEntry(ducky) {
		console.log("Ducky ID: " + ducky.id);
		return htmlToElement(`<tr id=${ducky.id}>
		<td class="column1">${ducky.name}</td>
		<td class="column2">"TODO: ADD PORTRAIT"</td>
		<td class="column3">${ducky.color}</td>
		<td class="column4"><button type="button" class="btn loadBtn"><i class="material-icons">play_arrow</i></button></td>
		<td class="column5"><button type="button" class="btn delBtn"><i class="material-icons">delete</i></button></td>
	</tr>`)
	}

	updateList() {
		console.log(rhit.duckyManager.length);
		const newTable = htmlToElement('<tbody id="duckyTable"></tbody>')

		for (let i = 0; i < rhit.duckyManager.length; i++) {
			const ducky = rhit.duckyManager.getDuckyAtIndex(i);
			const newRow = this._createEntry(ducky);

			newRow.querySelector(".loadBtn").onclick = (event) => {
				window.location.href = `/chatPage.html?index=${i}&uid=${rhit.fbAuthManager.uid}&color=${ducky.color}&name=${ducky.name}`;
			};
			newRow.querySelector(".delBtn").onclick = (event) => {
				firebase.firestore().collection(rhit.FB_COLLECTION_DUCKYS).doc(ducky.id).delete();
			};

			newTable.appendChild(newRow);
		}

		this.loadBtns = document.querySelectorAll(".loadBtn");
		const oldTable = document.querySelector("#duckyTable");
		oldTable.removeAttribute("id");
		oldTable.hidden = true;
		oldTable.parentElement.appendChild(newTable)
	}
}


// Christian's Version
// rhit.FbDuckyManager = class {

//     constructor() {

//         this._ref = firebase.firestore().collection("Duckys"); //ask prof how to get to a specific ducky

//     }



//     add(name, color) {

//         this._ref.add({

//             ["color"]: color,

//             ["name"]: name,

//         });

//         console.log("added duck")

//     }

// }

rhit.UserDuckyManager = class {
	constructor(uid) {
		this._uid = uid;
		this._documentSnapshots = [];
		this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_DUCKYS);
		this._unsubscribe = null;
	}
	add(name, color, chat) {
		this._ref.add({
			[rhit.FB_KEY_AUTHOR]: rhit.fbAuthManager.uid,
			[rhit.FB_KEY_DUCKYNAME]: name,
			[rhit.FB_KEY_COLOR]: color,
			[rhit.FB_KEY_CHAT]: chat,
			[rhit.FB_KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now(),
		})
			.then((docRef) => {
				console.log("Document written with ID: ", docRef.id);
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	}
	beginListening(changeListener) {
		let query = this._ref.orderBy(rhit.FB_KEY_LAST_TOUCHED, "desc").limit(50);
		if (this._uid) {
			query = query.where(rhit.FB_KEY_AUTHOR, "==", this._uid);
		}
		this._unsubscribe = query.onSnapshot((querySnapshot) => {
			this._documentSnapshots = querySnapshot.docs;
			if (changeListener) {
				changeListener();
			}
		});
	}
	stopListening() {
		this._unsubscribe();
	}
	get length() {
		return this._documentSnapshots.length;
	}
	getDuckySnapshot(index) {
		return this._documentSnapshots[index];
	}
	getDuckyAtIndex(index) {
		const docSnapshot = this._documentSnapshots[index];
		const ducky = new rhit.Ducky(
			docSnapshot.id,
			docSnapshot.get(rhit.FB_KEY_DUCKYNAME),
			docSnapshot.get(rhit.FB_KEY_COLOR),
			docSnapshot.get(rhit.FB_KEY_CHAT)
		);
		return ducky;
	}
}


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
		window.location.href = `/managerPage.html?uid=${rhit.fbAuthManager.uid}`;             //fix
	}
	if (!document.querySelector("#loginPage") && !rhit.fbAuthManager.isSignedIn) {
		window.location.href = "/";
	}
}

//Christian's Version
// rhit.initializePage = function () {

// 	if (document.querySelector("#loginPage")) {

// 		new rhit.LoginPageController();

// 	}

// 	if (document.querySelector("#managerPage")) {

// 		new rhit.ManagerPageController();

// 		rhit.fbTextManager = new rhit.FbTextManager();

// 		rhit.fbDuckyManager = new rhit.FbDuckyManager();

// 	}

// }


rhit.initializePage = function () {
	if (document.querySelector("#loginPage")) {
		new rhit.LoginPageController();
	}
	if (document.querySelector("#managerPage")) {
		var urlParams = new URLSearchParams(window.location.search);
		const uid = urlParams.get("uid");
		rhit.duckyManager = new rhit.UserDuckyManager(uid);

		new rhit.ManagerPageController();
	}
	if (document.querySelector("#chatPage")) {
		new rhit.ChatPageController();
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
			// firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
		],
	};
	// const ui = new firebaseui.auth.AuthUI(firebase.auth());
	// ui.start("#firebaseui-auth-container", uiConfig);
};

rhit.main();