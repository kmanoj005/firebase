"use client"
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { app } from '../FirebaseConfig';

export default function EnquiryDetails() {

    let [users, setUsers] = useState([])

    const getUserData = () => {
        const db = getDatabase(app);
        const userListData = [];
        const userData = ref(db, 'enquiry/');
        onValue(userData, (enValue) => {
            const data = enValue.val();

            for (let key in data) {
                let obj = data[key];
                obj['key'] = key;
                userListData.push(obj);
            }
            setUsers(userListData);
        });
    };

    useEffect(() => {
        getUserData();
    }, []);


    return (
        <>
            <div className=' mt-[80px] items-center justify-center'>
                <table className='text-md px-[50px] justify-center mx-auto bg-gray-100 '>
                    <thead className='text-md text-center uppercase bg-gray-50 dark:text-gray-800 border border-solid border-black'>
                        <tr className=' bg-violet-500 text-white '>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody className=' border border-solid border-black'>
                        {users.length > 0 ?
                            users.map((item, index) => (
                                <tr key={index} className='text-center'>
                                    <td className=' pb-3 px-2 border border-solid border-black'>{item.key}</td>
                                    <td className=' pb-3 px-2 border border-solid border-black'>{item.name}</td>
                                    <td className=' pb-3 px-2 border border-solid border-black'>{item.email}</td>
                                    <td className=' pb-3 px-2 border border-solid border-black'>{item.phone}</td>
                                    <td className=' pb-3 px-2 border border-solid border-black'>{item.message}</td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan="4">No data</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
