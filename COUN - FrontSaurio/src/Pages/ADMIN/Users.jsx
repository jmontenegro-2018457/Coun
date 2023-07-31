import React from 'react'
import Table from '../../components/Table'
import { Outlet } from "react-router-dom"

export const Users = () => {
  return (
    <>
    <Table ></Table>
    <Outlet></Outlet>
    </>
  )
}
