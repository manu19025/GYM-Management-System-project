// Login functionality
function login(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => logAction(`User logged in: ${email}`))
    .catch(error => {
      alert('Login failed: ' + error.message);
      logAction('Login failed: ' + error.message);
    });
}

function addMember() {
  const name = prompt('Enter member name:');
  if (name) {
    firebase.firestore().collection('members').add({ name })
      .then(() => {
        alert('Member added!');
        logAction(`Added member: ${name}`);
        loadMembers();
      });
  }
}

function loadMembers() {
  firebase.firestore().collection('members').get()
    .then(snapshot => {
      const list = document.getElementById('memberList');
      list.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        list.innerHTML += `<div>${data.name} 
          <button onclick="deleteMember('${doc.id}')">Delete</button></div>`;
      });
    });
}

function deleteMember(id) {
  firebase.firestore().collection('members').doc(id).delete()
    .then(() => {
      alert('Member deleted');
      logAction(`Deleted member ID: ${id}`);
      loadMembers();
    });
}

document.addEventListener('DOMContentLoaded', loadMembers);


function createBill() {
  const amount = prompt('Enter amount:');
  if (amount) {
    firebase.firestore().collection('bills').add({ amount, date: new Date() })
      .then(() => {
        alert('Bill created');
        logAction(`Created bill of amount: ${amount}`);
        loadBills();
      });
  }
}

function loadBills() {
  firebase.firestore().collection('bills').get()
    .then(snapshot => {
      const list = document.getElementById('billList');
      list.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        list.innerHTML += `<div>₹${data.amount} on ${new Date(data.date.seconds * 1000).toDateString()}</div>`;
      });
    });
}

document.addEventListener('DOMContentLoaded', loadBills);


function sendNotification() {
  const message = prompt('Enter notification:');
  if (message) {
    firebase.firestore().collection('notifications').add({ message, date: new Date() })
      .then(() => {
        alert('Notification sent');
        logAction(`Sent notification: ${message}`);
        loadNotifications();
      });
  }
}

function loadNotifications() {
  firebase.firestore().collection('notifications').get()
    .then(snapshot => {
      const list = document.getElementById('notificationList');
      list.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        list.innerHTML += `<div>${data.message} (${new Date(data.date.seconds * 1000).toLocaleString()})</div>`;
      });
    });
}

document.addEventListener('DOMContentLoaded', loadNotifications);


function logAction(message) {
  console.log(`[LOG]: ${message}`);
  firebase.firestore().collection('logs').add({ message, timestamp: new Date() });
}


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
