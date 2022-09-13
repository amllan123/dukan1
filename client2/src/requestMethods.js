import axios from "axios";
  
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

 const BASE_URL=process.env.REACT_APP_API_KEY
 export const publicRequest = axios.create({
  baseURL:BASE_URL,
 })
 
 export const userRequest = axios.create({
 baseURL:BASE_URL,
 headers: { token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTgzMzA5NjQwNWViZTc1MWZhODE5MSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjI5MDU5MjcsImV4cCI6MTY2MzE2NTEyN30.ZLFLDEBBFa9k9UJX4fTbXZD_Sj4J1ouEGUKB9yzdAo8" 
  , "Content-Type": "text/json"

},



 })

 export const numberFormat = value =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(value);