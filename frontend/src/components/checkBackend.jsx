import { useEffect,useState } from "react";
import { checkBackend } from "../services/api";

function BackendTest(){
    const[status,setStatus]= useState("Checking...");
    useEffect(()=>{
        checkBackend()
        .then((data)=>{
            console.log("Success");
             console.log("Backend response:", data);
            console.log("Response status:", data.status);
            setStatus(data.Status);
        })
        .catch((error)=>{
            console.error("Backend connection error:", error);
            setStatus("Backend Connection Failed");
        });
    },[]);
    return <div className="m-4 rounded-lg border border-gray-300 bg-white p-4">
      <h2 className="text-lg font-bold">Backend Connection Test</h2>
      <p>
        Backend Status: <strong>{status}</strong>
      </p>
    </div>
}
export default BackendTest;