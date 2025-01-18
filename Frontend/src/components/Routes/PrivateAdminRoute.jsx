import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateAdminRoute() {
    const { currentUser } = useSelector((state) => state.user)
    console.log(currentUser)

    if (!currentUser) {
        return <Navigate to="/signin" />
    }

    return currentUser.admin ? <Outlet /> : <Navigate to="/" />
}

export default PrivateAdminRoute;
