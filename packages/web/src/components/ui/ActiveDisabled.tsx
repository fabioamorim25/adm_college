import React from "react";

interface IStatus {
  status: Boolean
}


export default function ActiveDisabled({ status }: IStatus) {


  const statusColor = status === true ? 'bg-green-400' : 'bg-red-400';

  return (
    <>
      <div className={`flex items-center mr-2`}>
        <div className={`w-4 h-4 rounded-full ${statusColor} flex mx-1`}></div>
        <span>status</span>
      </div>
    </>



  )
}