import { createMoodEntry } from "./actions";
import { prisma } from "@/lib/db";

export default async function Home() {
  // Fetch all existing entries from the DB to display them
  const entries = await prisma.moodEntry.findMany({
    orderBy: { createdAt: "desc" }, // Newest first
  });

  return (
    <div style={{ padding: "50px", fontFamily: "sans-serif" }}>
      <h1>Mood Journal (Debug Mode)</h1>

      {/* THE FORM */}
      <form
        action={createMoodEntry}
        style={{
          marginBottom: "50px",
          border: "1px solid #ccc",
          padding: "20px",
        }}
      >
        {/* Mood Selector */}
        <div style={{ marginBottom: "10px" }}>
          <label>How are you feeling?</label>
          <select
            name="mood"
            required
            style={{ display: "block", padding: "5px", marginTop: "5px" }}
          >
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="afraid">Afraid</option>
          </select>
        </div>

        {/* Text Area */}
        <div style={{ marginBottom: "10px" }}>
          <label>Why?</label>
          <textarea
            name="content"
            required
            rows={4}
            style={{
              display: "block",
              width: "100%",
              padding: "5px",
              marginTop: "5px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: "10px 20px", background: "black", color: "white" }}
        >
          Save Entry
        </button>
      </form>

      {/* THE LIST OF ENTRIES */}
      <hr />
      <h2>History</h2>
      {entries.map((entry) => (
        <div
          key={entry.id}
          style={{
            border: "1px solid #eee",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <strong>Mood: {entry.mood.toUpperCase()}</strong>
          <p>{entry.content}</p>
          <small style={{ color: "#888" }}>
            {entry.createdAt.toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}
