import React from "react";
import calculateTime from "/utils/calculateTime";
import Link from "next/link";
import styled from '/public/styles/all.module.css'
function LikeNotification({ notification }) {
  return (
    notification.type === "newLike" && (
      <div className={styled.commentNotificationBox}>
        <img    style={{borderRadius:'50%',width:'60px',height:'60px'}} src={notification?.user?.profilePicUrl||'/dexlogo.svg'} alt="userimg" />
        <div className="select-none"  style={{marginLeft:'10px'}}>
          <p>
            <Link href={`/${notification?.user?.username?notification.user.username:''}`} passHref>
              {notification?.user?.name?notification?.user?.name?.length>10?notification.user.name.slice(0,3)+'...'+notification.user.name.slice(-4):notification.user.name:''}
            </Link>
            liked your
            {/*<Link href={`/post/${notification.post.id}`} passHref>*/}
            {/*  post*/}
            {/*</Link>*/}
            {/*.*/}
          </p>
          <p className="text-gray-500" style={{ marginTop: "0" }}>
            {calculateTime(notification.date, true)}
          </p>
        </div>
        {/* {notification.post.picUrl} */}
      </div>
    )
  );
}

export default LikeNotification;
