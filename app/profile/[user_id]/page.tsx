"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function ProfileID() {
  const params = useParams(); // Get dynamic route parameters

  console.log(params); // Debugging purpose

  return <main>Profile Page {params?.user_id}</main>;
}
