import React, { useState, useEffect } from "react";
import axios from "axios";

const EventUploader = () => {
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !date) {
      alert("Please select an image and date");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("date", date);

    try {
      await axios.post("https://nativeadminpost.vercel.app/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Event uploaded successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error uploading event", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-[] shadow-lg border-2 rounded-lg mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-4">Upload Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={handleImageChange}
          className="block w-full border p-2 cursor-pointer"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="block w-full border p-2 cursor-pointer"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
        >
          Upload Event
        </button>
      </form>
      {/* <h2 className="text-2xl font-bold mt-6">Event List</h2>
      <div className="mt-4">
        {events.map((event) => (
          <div key={event._id} className="border p-4 mb-4">
            <img
              src={event.imageUrl}
              alt="Event"
              className="w-full h-48 object-cover"
            />
            <p className="mt-2">
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default EventUploader;
