import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser, updateUserRoles } from '../../redux/user/userSlice';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const today = new Date();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await axios.get('http://localhost:3000/api/user/users');
            setUsers(data.data);
            dispatch(updateUserRoles(data.data));
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const updateUserRole = async (userID, isAdmin) => {
        try {
            await axios.patch(`http://localhost:3000/api/user/users/${userID}`, { admin: isAdmin });
            const updatedUsers = users.map((user) =>
                user.id === userID ? { ...user, admin: isAdmin } : user
            );
            setUsers(updatedUsers);
            dispatch(updateUserRoles(updatedUsers));
            dispatch(updateCurrentUser());
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <section className="flex flex-col w-[94%] mx-auto mt-5 p-4 gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h3 className="text-lg sm:text-2xl font-bold font-archivo">
                    Today <span>{formattedDate}</span>
                </h3>
                <div className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-6 rounded-full text-lg cursor-pointer">
                    <FaUser className="text-xl" />
                    <span>{currentUser.username}</span>
                </div>
            </div>

            <div>
                <h3 className="text-3xl sm:text-4xl font-bold font-archivo mb-2">Welcome!!</h3>
                <p className="text-lg">View and manage all your users:</p>
                {!loading ? (
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full border-collapse border border-gray-200 text-sm sm:text-base">
                            <thead>
                                <tr className="bg-blue-900 text-white">
                                    <th className="border border-gray-200 p-2 sm:p-3 text-center">S/N</th>
                                    <th className="border border-gray-200 p-2 sm:p-3 text-center">Username</th>
                                    <th className="border border-gray-200 p-2 sm:p-3 text-center">Email</th>
                                    <th className="border border-gray-200 p-2 sm:p-3 text-center">Role</th>
                                    <th className="border border-gray-200 p-2 sm:p-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(users) &&
                                    users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td className="border border-gray-200 p-2 sm:p-3 text-center">
                                                {index + 1}
                                            </td>
                                            <td className="border border-gray-200 p-2 sm:p-3 text-center">
                                                {user.username || 'N/A'}
                                            </td>
                                            <td className="border border-gray-200 p-2 sm:p-3 text-center">
                                                {user.email || 'N/A'}
                                            </td>
                                            <td className="border border-gray-200 p-2 sm:p-3 text-center">
                                                {user.admin ? 'Admin' : 'User'}
                                            </td>
                                            <td className="border border-gray-200 p-2 sm:p-3 text-center">
                                                <button
                                                    className={`px-4 py-2 rounded font-bold transition ${
                                                        !user.admin
                                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                                            : 'bg-green-500 text-white hover:bg-green-600'
                                                    }`}
                                                    onClick={() =>
                                                        updateUserRole(
                                                            user.uid,
                                                            user.admin ? false : true
                                                        )
                                                    }
                                                >
                                                    Make {user.admin ? 'User' : 'Admin'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">Loading users...</p>
                )}
            </div>
        </section>
    );
}

export default AdminPanel;
