import React from 'react'
import Logo from '../assets/logo.jpeg'
import Avatar from '../assets/user.png'
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user }, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false)

    const login = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider)
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        } else {
            setIsMenu(!isMenu);
        }
    };

    const logout = () => {
        setIsMenu(false)
        localStorage.clear()

        dispatch({
            type: actionType.SET_USER,
            user: null
        });
    };

    return (
        <header className='fixed z-50 w-screen bg-white p-3 px-4 md:p-6 md:px-16 '>
            {/*desktop & tablet */}
            <div className='hidden md:flex w-full h-full items-center justify-between '>
                <Link to={"/"} className='flex items-center gap-2'>
                    <img src={Logo} className="w-21 h-20 object-cover" alt="logo" />
                </Link>
                <div className='flex items-center gap-8'>
                    <motion.ul
                        initial={{ opcaity: 0, x: 200 }}
                        animate={{ opcaity: 1, x: 0 }}
                        exit={{ opcaity: 0, x: 200 }}
                        className='flex items-center gap-8'
                    >
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer '>Home</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer '>Menu</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer '>Service</li>
                    </motion.ul>
                    <div className='relative flex items-center justify-center'>
                        <MdShoppingBasket className='text-textColor text-2xl ml-8 cursor-pointer'></MdShoppingBasket>
                        <div className='absolute -top-1 -right-3 w-5 h-5 rounded-full bg-pink-300 flex items-center justify-center'>
                            <p className='text-xs text-white font-semibold'>2</p>
                        </div>
                    </div>
                    <div className='relative'>
                        <motion.img whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avatar} alt='userProfile' className='w-5 min-w-[30px] h-5 min-h-[30px] 
                        drop-shadow-xl cursor-pointer rounded-full'
                            onClick={login}
                        />
                        {
                            isMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute right-0 top-12">
                                    {
                                        user && user.email === "ranarsay@gmail.com" && (
                                            <Link to={'createItem'}>
                                                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">

                                                    New Item <MdAdd /></p>
                                            </Link>
                                        )
                                    }
                                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                        onClick={logout}>

                                        Log out <MdLogout /></p>
                                </motion.div>
                            )
                        }
                    </div>

                </div>

            </div>
            {/*mobile */}
            <div className='flex items-center justify-between md:hidden h-full'>
                <div className='relative flex items-center justify-center'>
                    <MdShoppingBasket className='text-textColor text-2xl ml-8 cursor-pointer'></MdShoppingBasket>
                    <div className='absolute -top-1 -right-3 w-5 h-5 rounded-full bg-pink-300 flex items-center justify-center'>
                        <p className='text-xs text-white font-semibold'>2</p>
                    </div>
                </div>
                <Link to={"/"} className='flex items-center gap-2'>
                    <img src={Logo} className="w-21 h-20 object-cover" alt="logo" />
                </Link>

                <div className='relative'>
                    <motion.img whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : Avatar} alt='userProfile' className='w-5 min-w-[30px] h-5 min-h-[30px] 
                        drop-shadow-xl cursor-pointer rounded-full'
                        onClick={login}
                    />
                    {
                        isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute right-0 top-12">
                                {
                                    user && user.email === "ranarsay@gmail.com" && (
                                        <Link to={'createItem'}>
                                            <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">

                                                New Item <MdAdd /></p>
                                        </Link>
                                    )
                                }
                                <ul className='flex flex-col'>
                                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>Home</li>
                                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>Menu</li>
                                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>About</li>
                                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>Service</li>
                                </ul>
                                <p className="m-2 p-2 rounded-md shadow-md flex items-center gap-3 cursor-pointer justify-center bg-gray-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                                    onClick={logout}>

                                    Log out
                                    <MdLogout /></p>
                            </motion.div>
                        )
                    }
                </div>

            </div>
        </header>
    )
}

export default Header;