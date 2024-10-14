"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Message } from "@prisma/client"; // Import Message type from Prisma client
import { toast } from "react-toastify";

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [tagInput, setTagInput] = useState<string>("");
  const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null); // Index of the tag being edited
  const [isSaving, setIsSaving] = useState<boolean>(false); // New state for saving

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/message");
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data: Message[] = await response.json();
        setMessages(data);
      } catch (err) {
        setError("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const openEditModal = (message: Message) => {
    setEditingMessage(message);
    setModalOpen(true);
    setTagInput(""); // Reset the tag input
    setEditingTagIndex(null); // Reset editing tag index
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingMessage(null);
    setTagInput(""); // Reset the tag input
    setEditingTagIndex(null); // Reset editing tag index
  };

  const handleEditSave = async () => {
    if (editingMessage) {
      setIsSaving(true); // Start loading
      const response = await fetch(`/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingMessage),
      });

      if (response.ok) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === editingMessage.id ? editingMessage : msg,
          ),
        );
        toast.success("Message updated.");
        closeModal();
      } else {
        console.error("Failed to save changes");
      }
      setIsSaving(false); // Stop loading
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (editingMessage) {
      setEditingMessage({ ...editingMessage, [e.target.name]: e.target.value });
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput) {
      e.preventDefault();
      if (editingTagIndex !== null) {
        // Update the existing tag
        const newOptions = [...(editingMessage?.options || [])];
        newOptions[editingTagIndex] = tagInput; // Replace the tag at the editing index
        setEditingMessage({ ...editingMessage!, options: newOptions });
        setEditingTagIndex(null); // Reset editing tag index
      } else {
        // Add a new tag
        const newOptions = [...(editingMessage?.options || []), tagInput];
        setEditingMessage({ ...editingMessage!, options: newOptions });
      }
      setTagInput(""); // Clear input after adding/updating
    }
  };

  const handleEditTag = (index: number) => {
    setEditingTagIndex(index);
    setTagInput(editingMessage?.options[index] || ""); // Set the input to the existing tag
  };

  const handleRemoveTag = (tag: string) => {
    if (editingMessage) {
      const newOptions = editingMessage.options.filter(
        (option) => option !== tag,
      );
      setEditingMessage({ ...editingMessage, options: newOptions });
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="Messages" />

        <div className="grid grid-cols-1 gap-8">
          <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                      Text
                    </th>
                    <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                      Options
                    </th>
                    <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="py-4 text-center">
                        Loading messages...
                      </td>
                    </tr>
                  ) : (
                    messages.map((message) => (
                      <tr key={message.id}>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {message.text}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11">
                          <div className="flex flex-wrap gap-2">
                            {message.options.map((option, index) => (
                              <span
                                key={index}
                                className="flex cursor-pointer items-center rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800"
                                onClick={() => handleEditTag(index)} // Set tag as editable
                              >
                                {option}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering edit on click
                                    handleRemoveTag(option);
                                  }}
                                  className="text-red-600 ml-2"
                                >
                                  &times;
                                </button>
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <button
                            onClick={() => openEditModal(message)}
                            className="rounded bg-yellow-500 px-2 py-1 text-white"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="modal-overlay absolute inset-0 bg-black opacity-50" />
            <div className="modal-container z-50 w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-lg">
              <div className="modal-content p-8">
                <h2 className="text-xl font-semibold">Edit Message</h2>
                {editingMessage && (
                  <div>
                    <div className="mb-4">
                      <label className="text-gray-700 block text-sm font-medium">
                        Text
                      </label>
                      <textarea
                        name="text"
                        value={editingMessage.text}
                        onChange={handleChange}
                        className="border-gray-300 mt-1 block w-full rounded-md border p-2"
                        rows={4}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-gray-700 block text-sm font-medium">
                        Options
                      </label>
                      <div className="mb-2 flex flex-wrap gap-2">
                        {editingMessage.options.map((tag, index) => (
                          <span
                            key={index}
                            title="Edit?"
                            className="flex cursor-pointer items-center rounded bg-blue-100 px-3.5 py-2 text-sm font-medium text-blue-800"
                            onClick={() => handleEditTag(index)}
                          >
                            {tag}
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              title="Delete?"
                              className="text-white flex justify-center items-center bg-red p-2 rounded-full ml-3 w-5 h-5"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyPress={handleTagKeyPress}
                        className="border-gray-300 mt-1 block w-full rounded-md border p-2"
                        placeholder="Press Enter to add or edit a tag"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleEditSave}
                        className={`mr-2 rounded bg-blue-500 px-4 py-2 text-white ${
                          isSaving ? "cursor-not-allowed opacity-50" : ""
                        }`}
                        disabled={isSaving} // Disable the button while saving
                      >
                        {isSaving ? (
                          <span>
                            <span className="loader"></span>{" "}
                            {/* Your loading icon */}
                            Saving...
                          </span>
                        ) : (
                          "Save"
                        )}
                      </button>
                      <button
                        onClick={closeModal}
                        className="bg-gray-300 text-gray-800 rounded px-4 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Messages;
