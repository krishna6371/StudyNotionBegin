import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useSelector } from 'react-redux'
import { SidebarLinks } from './SidebarLinks'
import { VscSettingsGear,VscSignOut } from "react-icons/vsc";
import { set } from 'react-hook-form';
import { ConfirmModal } from '../../common/ConfirmModal';
import { logout } from '../../../services/operation/Authapi1';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
	const {user} =useSelector((state)=>state.profile);
	const[conformationModal, setConformationModal]=useState(null);
	const dispatch=useDispatch();
	const navigate=useNavigate();
	console.log("sidebar links ",sidebarLinks.name)
	
  return (

<div className='text-white'>
        <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700
        h-[calc[100vh-3.5rem)] bg-richblack-800 py-10'>

            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
						console.log(link);
                        if(link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLinks key={link.id}  link={link} iconName={link.icon}/>
                        )
                    })}
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

            <div className='flex flex-col'>
                    <SidebarLinks
                        link={{name:"Settings", path:"dashboard/settings"}}
                        iconName="VscSettingsGear"
                    />

                    <button 
                        onClick={ () => setConformationModal({
                            text1: "Are You Sure ?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text:"Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () =>setConformationModal(null),
                        })}
                        className='text-sm font-medium text-richblack-300'
                        >

                        <div className='flex items-center gap-x-2'>
                            <VscSignOut className='text-lg'/>
                            <span>Logout</span>
                        </div>

                    </button>

            </div>

        </div>

      {conformationModal && <ConfirmModal modalData={conformationModal} />}
    </div>
  )
}
