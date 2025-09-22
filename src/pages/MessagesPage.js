import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile } from 'lucide-react';

const MessagesPage = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(0);
  const [newMessage, setNewMessage] = useState('');

  const chats = [
    {
      id: 1,
      name: 'TechMart Electronics',
      lastMessage: 'Thanks for your interest! When can you start?',
      time: '2 min ago',
      unread: 2,
      avatar: 'https://ui-avatars.com/api/?name=TechMart+Electronics&background=14a800&color=fff',
      messages: [
        {
          id: 1,
          sender: 'TechMart Electronics',
          text: 'Hi! I saw your application for the Retail Store Assistant position. Do you have any questions about the role?',
          time: '10:30 AM',
          isOwn: false
        },
        {
          id: 2,
          sender: 'You',
          text: 'Hello! Yes, I\'m very interested. Could you tell me more about the working hours?',
          time: '10:32 AM',
          isOwn: true
        },
        {
          id: 3,
          sender: 'TechMart Electronics',
          text: 'The position is for weekends (Saturday and Sunday) from 10 AM to 6 PM. Does that work for you?',
          time: '10:35 AM',
          isOwn: false
        },
        {
          id: 4,
          sender: 'You',
          text: 'That sounds perfect! I\'m available for both days. What\'s the next step?',
          time: '10:37 AM',
          isOwn: true
        },
        {
          id: 5,
          sender: 'TechMart Electronics',
          text: 'Thanks for your interest! When can you start?',
          time: '10:40 AM',
          isOwn: false
        }
      ]
    },
    {
      id: 2,
      name: 'Market Research Co.',
      lastMessage: 'Great! We\'ll send you the survey forms tomorrow.',
      time: '1 hour ago',
      unread: 0,
      avatar: 'https://ui-avatars.com/api/?name=Market+Research+Co&background=14a800&color=fff',
      messages: [
        {
          id: 1,
          sender: 'Market Research Co.',
          text: 'Hi! We\'d like to offer you the Field Survey Executive position. Are you still interested?',
          time: '9:15 AM',
          isOwn: false
        },
        {
          id: 2,
          sender: 'You',
          text: 'Yes, I\'m very interested! When does the survey start?',
          time: '9:20 AM',
          isOwn: true
        },
        {
          id: 3,
          sender: 'Market Research Co.',
          text: 'The survey starts next Monday and will run for one week. We\'ll provide all the necessary materials.',
          time: '9:25 AM',
          isOwn: false
        },
        {
          id: 4,
          sender: 'You',
          text: 'Perfect! I\'m ready to start on Monday.',
          time: '9:30 AM',
          isOwn: true
        },
        {
          id: 5,
          sender: 'Market Research Co.',
          text: 'Great! We\'ll send you the survey forms tomorrow.',
          time: '9:35 AM',
          isOwn: false
        }
      ]
    },
    {
      id: 3,
      name: 'Wedding Planners Inc.',
      lastMessage: 'The event is this Saturday at 2 PM. See you there!',
      time: '3 hours ago',
      unread: 1,
      avatar: 'https://ui-avatars.com/api/?name=Wedding+Planners+Inc&background=14a800&color=fff',
      messages: [
        {
          id: 1,
          sender: 'Wedding Planners Inc.',
          text: 'Hello! We\'re excited to have you on our team for the wedding event. Do you have any questions?',
          time: '8:00 AM',
          isOwn: false
        },
        {
          id: 2,
          sender: 'You',
          text: 'Hi! I\'m looking forward to it. What time should I arrive?',
          time: '8:05 AM',
          isOwn: true
        },
        {
          id: 3,
          sender: 'Wedding Planners Inc.',
          text: 'Please arrive at 1 PM for setup. The event starts at 2 PM.',
          time: '8:10 AM',
          isOwn: false
        },
        {
          id: 4,
          sender: 'You',
          text: 'Got it! I\'ll be there at 1 PM.',
          time: '8:15 AM',
          isOwn: true
        },
        {
          id: 5,
          sender: 'Wedding Planners Inc.',
          text: 'The event is this Saturday at 2 PM. See you there!',
          time: '8:20 AM',
          isOwn: false
        }
      ]
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view messages</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access your messages.</p>
          <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Log In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Messages</h1>
          <p className="text-lg text-gray-600">
            Communicate with clients and gig workers
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex h-[600px]">
            {/* Chat List */}
            <div className="w-1/3 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>

              <div className="overflow-y-auto">
                {chats.map((chat, index) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(index)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedChat === index ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {chat.name}
                          </h3>
                          <span className="text-xs text-gray-500">{chat.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {chat.lastMessage}
                        </p>
                        {chat.unread > 0 && (
                          <div className="flex justify-end mt-1">
                            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                              {chat.unread}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedChat !== null && (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={chats[selectedChat].avatar}
                        alt={chats[selectedChat].name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {chats[selectedChat].name}
                        </h3>
                        <p className="text-sm text-gray-500">Online</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chats[selectedChat].messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <Smile className="w-5 h-5" />
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
