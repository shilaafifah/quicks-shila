import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Tambahkan import axios

interface Inbox {
  id: number;
  sender: string;
  profilePic: string;
  dateTime: string;
  message: string;
  participants?: number; // Tambahkan jumlah participants jika inbox adalah grup
  lastMessageSender?: string;
  type: "group" | "individual";
}

interface ChatMessage {
  sender: string;
  message: string;
  dateTime: string;
}

const InboxMenu: React.FC = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [selectedInbox, setSelectedInbox] = useState<Inbox | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [editMessageIndex, setEditMessageIndex] = useState<number | null>(null);
  const [editMessageText, setEditMessageText] = useState<string>("");
  const [contextMenuIndex, setContextMenuIndex] = useState<number | null>(null);
  const [inboxes, setInboxes] = useState<Inbox[]>([]);

  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  const widgetVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setContextMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchInboxes = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const inboxesData = response.data.map((user: any) => ({
          id: user.id,
          sender: user.name,
          profilePic: "/assets/profile.png",
          dateTime: new Date().toISOString(),
          message: "Pesan terbaru dari " + user.name,
          type: "individual",
        }));
        setInboxes(inboxesData);
      } catch (error) {
        console.error("Error fetching inboxes:", error);
      }
    };

    fetchInboxes();
  }, []);

  const toggleWidget = () => {
    setShowWidget((prevShowWidget) => !prevShowWidget);
    setSelectedInbox(null);
    setChatMessages([]);
    setEditMessageIndex(null);
    setContextMenuIndex(null);
  };

  const handleInboxClick = async (inbox: Inbox) => {
    setSelectedInbox(inbox);

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${inbox.id}`
      );
      const chatMessagesData = response.data.map((comment: any) => ({
        sender: comment.name,
        message: comment.body,
        dateTime: new Date().toISOString(),
      }));
      setChatMessages(chatMessagesData);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }

    setEditMessageIndex(null);
    setContextMenuIndex(null);
  };

  const handleSendMessage = () => {
    if (editMessageText.trim() === "") return;

    if (editMessageIndex !== null) {
      setChatMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[editMessageIndex] = {
          ...updatedMessages[editMessageIndex],
          message: editMessageText,
        };
        return updatedMessages;
      });
      setEditMessageIndex(null);
    } else {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "You",
          message: editMessageText,
          dateTime: new Date().toLocaleString(),
        },
      ]);
    }

    setEditMessageText("");
    setContextMenuIndex(null);
  };

  const handleEditMessage = () => {
    if (editMessageIndex === null) return;

    setChatMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[editMessageIndex] = {
        ...updatedMessages[editMessageIndex],
        message: editMessageText,
      };
      return updatedMessages;
    });
    setEditMessageIndex(null);
    setEditMessageText("");
    setContextMenuIndex(null);
  };

  const handleDeleteMessage = (index: number) => {
    setChatMessages((prevMessages) => {
      if (index < 0 || index >= prevMessages.length) return prevMessages;
      const updatedMessages = prevMessages.filter((_, i) => i !== index);
      return updatedMessages;
    });
    setContextMenuIndex(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative flex flex-col items-center cursor-pointer">
      <span className="text-white mb-1">Inbox</span>
      <Image
        src={showWidget ? "/assets/inbox-open.png" : "/assets/inbox.png"}
        alt="Inbox Icon"
        width={50}
        height={50}
        onClick={toggleWidget}
      />

      {showWidget && (
        <motion.div
          className="absolute top-[-484px] right-0 w-[500px] h-[500px] bg-white shadow-md rounded-lg overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={widgetVariants}
          transition={{ duration: 0.3 }}
        >
          {selectedInbox ? (
            <div className="p-4 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-black cursor-pointer mr-4"
                  size="lg"
                  onClick={() => setSelectedInbox(null)}
                />
                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-medium text-blue-500">
                    {selectedInbox.sender}
                  </h3>
                  {selectedInbox.participants && (
                    <p className="text-gray-500 text-sm">
                      {selectedInbox.participants} Participants
                    </p>
                  )}
                </div>
              </div>
              <hr className="border-t border-gray-300 mb-4" />
              <div className="flex-1 overflow-y-auto mb-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className="relative mb-4"
                    onClick={() => {
                      if (msg.sender === "You") {
                        setContextMenuIndex(index);
                      }
                    }}
                  >
                    {index === 0 ||
                    formatDate(chatMessages[index - 1].dateTime) !==
                      formatDate(msg.dateTime) ? (
                      <div className="text-center text-gray-500 text-sm mb-2">
                        {formatDate(msg.dateTime)}
                      </div>
                    ) : null}

                    {index === chatMessages.length - 1 ? (
                      <div className="text-center text-green-500 text-sm mb-2">
                        New Message
                      </div>
                    ) : null}

                    <div
                      className={`flex ${
                        msg.sender === "You" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className="flex flex-col items-start space-y-1">
                        <div
                          className={`text-sm ${
                            msg.sender === "You"
                              ? "text-[#9B51E0]"
                              : "text-[#E5A443]"
                          }`}
                        >
                          {msg.sender}
                        </div>

                        <div
                          className={`p-2 rounded-lg max-w-xs ${
                            msg.sender === "You"
                              ? "bg-[#EEDCFF] relative"
                              : "bg-[#FCEED3] relative"
                          }`}
                        >
                          {msg.message}

                          {contextMenuIndex === index && (
                            <div
                              ref={contextMenuRef}
                              className="absolute right-0 top-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                            >
                              <button
                                className="block w-full text-blue-500 px-4 py-2 text-left hover:bg-gray-100"
                                onClick={() => {
                                  setEditMessageIndex(index);
                                  setEditMessageText(msg.message);
                                  setContextMenuIndex(null);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="block w-full text-red-500 px-4 py-2 text-left hover:bg-gray-100"
                                onClick={() => {
                                  handleDeleteMessage(index);
                                  setContextMenuIndex(null);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex mt-4">
                <input
                  type="text"
                  placeholder="Type a new message"
                  className="flex-1 p-2 border border-gray-300 rounded-md relative pl-8"
                  value={editMessageText}
                  onChange={(e) => setEditMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  className="bg-blue-500 text-white px-4 rounded-md ml-3"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full p-1 border border-gray-400 rounded-md pl-8"
                />
                <Image
                  src="/assets/search-icon.png"
                  alt="Search Icon"
                  width={17}
                  height={17}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2"
                />
              </div>
              <div className="p-4 h-full overflow-y-auto">
                {inboxes.map((inbox: Inbox) => (
                  <div
                    key={inbox.id}
                    className="mb-4 border-b border-gray-400 pb-4 cursor-pointer"
                    onClick={() => handleInboxClick(inbox)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Image
                          src={inbox.profilePic}
                          alt={`${inbox.sender} Profile`}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="ml-3">
                          <h3 className="text-blue-500 font-medium text-base">
                            {inbox.sender}
                            <span className="ml-5 text-gray-500 text-xs font-light">
                              {inbox.dateTime}
                            </span>
                          </h3>
                          {inbox.participants ? (
                            <p className="text-gray-500 text-sm font-semibold">
                              {inbox.lastMessageSender
                                ? `${inbox.lastMessageSender} :`
                                : `${inbox.participants} Participants`}
                            </p>
                          ) : null}
                          <p className="text-gray-600 truncate text-sm">
                            {inbox.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};
export default InboxMenu;
