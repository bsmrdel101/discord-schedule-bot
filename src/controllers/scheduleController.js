const { getDocs, addDoc, collection, query } = require('firebase/firestore');
const { db } = require('../scripts/firebase');

const dbInstance = collection(db, 'schedules');

const addSchedule = (value) => {
  addDoc(dbInstance, {
    username: value
  });
};

const fetchSchedulesData = async () => {
  const q = query(
    collection(db, 'schedules')
  );
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

const editSchedule = (id, value) => {
  const collectionById = doc(db, 'users', id)
  updateDoc(collectionById, {
      username: value
  });
};

module.exports = {
  addSchedule,
  fetchSchedulesData,
  editSchedule
};
