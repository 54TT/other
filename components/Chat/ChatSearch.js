import {
  ArrowLeftIcon,
  DotsHorizontalIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import axios from "axios";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import cookie from "js-cookie";
import { Facebook } from "react-content-loader";
import Link from "next/link";
import { useClickAway } from "react-use";
import baseUrl from "../../utils/baseUrl";
import {notification} from "antd";


function ChatSearch({ setShowChatSearch, setChats, chats,user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChange = async (e) => {
    const { value } = e.target;
    if (value.length === 0) {
      setSearchTerm(value);
      setSearchResults([]);
      return;
    }
    setSearchTerm(value);
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/api/search/${value}`, {params:{userId:user.id}});
      if (res.data.length === 0) {
        searchResults.length > 0 && setSearchResults([]);
        return setLoading(false);
      }
      setSearchResults(res.data);
    } catch (error) {
      notification.error({
        message: `Please note`, description: 'Error reported', placement: 'topLeft',
          duration:2
      });
    }

    setLoading(false);
  };

  // SearchDropdown.handleClickOutside = () => setShowChatSearch(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShowChatSearch(false);
  });

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: "4.35rem",
        left: "0rem",
        minHeight: "6rem",
        width: "26.9rem",
        backgroundColor: "white",
        zIndex: "100",
        padding: "0.67rem",
        borderRadius: "0.7rem",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        fontFamily: "Inter",
      }}
    >
      <div className="flex items-center">
        <ArrowDiv onClick={() => setShowChatSearch(false)}>
          <ArrowLeftIcon className="h-5" />
        </ArrowDiv>
        <div className="flex mr-2 ml-1 items-center rounded-full bg-gray-100 p-1 h-12 flex-grow">
          {/* <SearchIcon className="h-5 text-gray-600" /> */}
          <input
            autoFocus={true}
            className="ml-1 bg-transparent outline-none placeholder-gray-500 w-full font-thin"
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center mt-5 mb-2">
          <DotsHorizontalIcon className="h-6 text-gray-400" />
        </div>
      ) : searchResults.length > 0 ? (
        <>
          {searchResults.map((resultUser) => (
            <Link
              key={resultUser.id}
              href={`/chats?chat=${resultUser.id}`}
              passHref
            >
              <div
                onClick={() => {
                  setShowChatSearch(false);
                  const isUserInChats =
                    chats &&
                    chats.length > 0 &&
                    chats.find((chat) => chat.textsWith === resultUser.id);
                  const newChat = {
                    textsWith: resultUser.id,
                    name: resultUser.name,
                    profilePicUrl: resultUser.profilePicUrl,
                    lastText: "",
                  };

                  if (!isUserInChats) {
                    if (!chats) {
                      setChats([newChat]);
                    } else {
                      setChats((prev) => [newChat, ...prev]);
                    }

                    return;
                  }
                }}
                className="flex items-center space-x-3 mt-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
              >
                <img style={{width:'50px',borderRadius:'50%'}} src={resultUser?.profilePicUrl} alt="userimg" />
                <Name>{resultUser?.name}</Name>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <div className="w-full flex items-center justify-center mt-5 mb-2">
          <p className="text-gray-400 font-thin ">
            Start typing to begin searching...
          </p>
        </div>
      )}
    </div>
  );
}
// const clickOutsideConfig = {
//   handleClickOutside: () => SearchDropdown.handleClickOutside,
// };

// export default onClickOutside(SearchDropdown, clickOutsideConfig);
export default ChatSearch;

const ArrowDiv = styled.div`
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  padding: 0.75rem;
  :hover {
    background-color: #eee;
  }
`;

const Name = styled.p`
  user-select: none;
  font-family: Inter;
  font-size: 1rem;
`;
