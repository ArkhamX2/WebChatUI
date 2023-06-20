import React, { useEffect } from 'react'
import { useState } from 'react';
import ChatRoomList from '../components/ChatRoomList'
import Navbar from '../components/UI/Navbar/Navbar'
import { useFetching } from '../hooks/useFetching';
import RoomsService from '../API/RoomsService';

const Rooms = () => {

  const [limit,setLimit] = useState(10)
  const [page,setPage] = useState(1)
  const [rooms, setRooms] = useState([{
    userId: 0,
    userName: "Bob",
  },
  {
    userId: 1,
    userName: "Tom",
  },
  {
    userId: 2,
    userName: "Kate",
  }]);

  const [fetchRooms, isRoomsLoading, roomError] = useFetching(async (limit,page) =>{
    const responce = await RoomsService.getAll(limit,page);
    setRooms([...rooms, ...rooms.data])
  })

  useEffect(()=>{
    fetchRooms(limit,page)
  }, [page,limit])

  return (
    <div>
      <Navbar />
      <h1>Чаты</h1>
      <p>-------------</p>
      <ChatRoomList rooms={rooms} />
    </div>
  )
}

export default Rooms
