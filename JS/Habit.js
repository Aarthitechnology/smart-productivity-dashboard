import { db, auth } from "./Firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ➕ Add Habit
export async function addHabit(name) {
  await addDoc(collection(db, "habits"), {
    name,
    streak: 0,
    lastCompleted: null,
    userId: auth.currentUser.uid
  });
}


// 📥 Get Habits
export async function getHabits() {

  if (!auth.currentUser) {
    return [];
  }

  const q = query(
    collection(db, "habits"),
    where("userId", "==", auth.currentUser.uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}


// ✔ Complete Habit
export async function completedHabits(id, streak, lastCompleted) {

  const today = new Date().toISOString().split("T")[0];

  if (lastCompleted !== today) {

    await updateDoc(
      doc(db, "habits", id),
      {
        streak: streak + 1,
        lastCompleted: today
      }
    );
  }
}


// ❌ Delete Habit
export async function deleteHabit(id) {

  await deleteDoc(
    doc(db, "habits", id)
  );
}


// ✏ Update Habit
export async function updateHabit(id, newName) {

  await updateDoc(
    doc(db, "habits", id),
    {
      name: newName
    }
  );
}