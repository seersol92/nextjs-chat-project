"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Message } from "@prisma/client";

const EditMessage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the ID from the URL
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchMessage = async () => {
      if (!id) return; // Wait for the ID to be available

      try {
        const response = await fetch(`/api/message/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch message");
        }
        const data: Message = await response.json();
        setMessage(data);
        setText(data.text);
        setOptions(data.options);
      } catch (err) {
        setError("Error fetching message");
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message) return;

    try {
      const response = await fetch(`/api/message/${message.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          options,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update message");
      }

      // Redirect back to messages page after successful update
      router.push("/admin/messages");
    } catch (err) {
      setError("Error updating message");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!message) return <div>Message not found</div>;

  return (
    <DefaultLayout>
      <div className="mx-auto">
        <h1 className="text-xl font-bold">Edit Message</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block">Text:</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded border px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="mb-2 block">Options (comma-separated):</label>
            <input
              type="text"
              value={options.join(", ")}
              onChange={(e) =>
                setOptions(e.target.value.split(",").map((opt) => opt.trim()))
              }
              className="w-full rounded border px-2 py-1"
            />
          </div>
          <button
            type="submit"
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
          >
            Save Changes
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default EditMessage;
