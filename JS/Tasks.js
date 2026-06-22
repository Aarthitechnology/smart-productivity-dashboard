import { db, auth } from "./Firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
export async function addTask(title, priority, dueDate)
{
    await addDoc(collection(db, "tasks"), {
        title,
        priority,
        dueDate,
        completed: false,
        userId: auth.currentUser.uid
    });
}

export async function getTasks() {
    console.log("Current User:", auth.currentUser);

    if (!auth.currentUser) {
        console.log("No user found");
        return [];
    }

    const q = query(
        collection(db, "tasks"),
        where("userId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    console.log("Tasks found:", snapshot.docs.length);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

export async function toggleTask(id,completed)
{
    const taskRef = doc(db,"tasks",id);
    await updateDoc(taskRef,{
        completed: !completed
    });
}

export async function deleteTask(id)
{
    await deleteDoc(doc(db,"tasks",id));
}
export async function updateTask(id,updatedData)
{
    await updateDoc(
        doc(db,"tasks",id),
        updatedData
    );
}