import app from "./firebase";
import "firebase/firestore";

const db = app.firestore();

export const locationsCollection = db.collection("locations");
