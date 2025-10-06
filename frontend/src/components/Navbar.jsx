import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useState } from "react";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

	return (
		<>
			<header className='fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-lg shadow-2xl z-50 border-b border-emerald-500/30'>
				<div className='container mx-auto px-4 py-3'>
					<div className='flex justify-between items-center'>
						{/* Logo */}
						<Link 
							to='/' 
							className='flex items-center space-x-3 group'
							onClick={() => setIsMenuOpen(false)}
						>
							<div className='relative'>
								<div className='w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-400/30 transition-all duration-300'>
									<span className='text-white font-bold text-lg'>S</span>
								</div>
								<div className='absolute -inset-1 bg-emerald-400/20 rounded-xl blur-sm group-hover:bg-emerald-400/30 transition-all duration-300'></div>
							</div>
							<span className='text-2xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent'>
								Shopzi
							</span>
						</Link>

						{/* Desktop Navigation */}
						<nav className='hidden md:flex items-center gap-6'>
							<Link
								to={"/"}
								className='relative text-gray-300 hover:text-emerald-300 transition-all duration-300 
								ease-out py-2 px-3 rounded-lg hover:bg-white/5 group'
							>
								Home
								<span className='absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300'></span>
							</Link>
							
							{user && (
								<Link
									to={"/cart"}
									className='relative group text-gray-300 hover:text-emerald-300 transition-all duration-300 
									ease-out py-2 px-3 rounded-lg hover:bg-white/5'
								>
									<div className='flex items-center gap-2'>
										<ShoppingCart className='group-hover:scale-110 transition-transform duration-300' size={20} />
										<span>Cart</span>
										{cartItemCount > 0 && (
											<span
												className='absolute -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full 
												w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg shadow-emerald-500/25 
												group-hover:scale-110 transition-transform duration-300'
											>
												{cartItemCount}
											</span>
										)}
									</div>
									<span className='absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300'></span>
								</Link>
							)}
							
							{isAdmin && (
								<Link
									className='bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 
									text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 ease-out 
									shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/30 flex items-center gap-2 
									hover:scale-105 active:scale-95'
									to={"/secret-dashboard"}
								>
									<Lock className='inline-block' size={18} />
									<span>Dashboard</span>
								</Link>
							)}

							{user ? (
								<button
									className='bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 
									text-white py-2 px-4 rounded-xl flex items-center gap-2 transition-all duration-300 ease-out 
									shadow-lg hover:shadow-gray-500/20 hover:scale-105 active:scale-95'
									onClick={logout}
								>
									<LogOut size={18} />
									<span>Log Out</span>
								</button>
							) : (
								<div className='flex items-center gap-3'>
									<Link
										to={"/login"}
										className='bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 
										text-white py-2 px-4 rounded-xl flex items-center gap-2 transition-all duration-300 ease-out 
										shadow-lg hover:shadow-gray-500/20 hover:scale-105 active:scale-95'
									>
										<LogIn className='mr-1' size={18} />
										Login
									</Link>
									<Link
										to={"/signup"}
										className='bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 
										text-white py-2 px-4 rounded-xl flex items-center gap-2 transition-all duration-300 ease-out 
										shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/30 hover:scale-105 active:scale-95'
									>
										<UserPlus className='mr-1' size={18} />
										Sign Up
									</Link>
								</div>
							)}
						</nav>

						{/* Mobile Menu Button */}
						<button 
							className='md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300'
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? <X size={24} className="text-emerald-400" /> : <Menu size={24} className="text-gray-300" />}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				<div className={`md:hidden absolute top-full left-0 w-full bg-gray-800/95 backdrop-blur-lg border-b border-emerald-500/30 
					transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
					<nav className='container mx-auto px-4 py-6 flex flex-col gap-4'>
						<Link
							to={"/"}
							className='text-gray-300 hover:text-emerald-300 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/5 
							flex items-center gap-3 text-lg border-l-4 border-transparent hover:border-emerald-400'
							onClick={() => setIsMenuOpen(false)}
						>
							🏠 Home
						</Link>
						
						{user && (
							<Link
								to={"/cart"}
								className='text-gray-300 hover:text-emerald-300 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/5 
								flex items-center gap-3 text-lg border-l-4 border-transparent hover:border-emerald-400 relative'
								onClick={() => setIsMenuOpen(false)}
							>
								🛒 Cart
								{cartItemCount > 0 && (
									<span className='ml-auto bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold'>
										{cartItemCount}
									</span>
								)}
							</Link>
						)}
						
						{isAdmin && (
							<Link
								className='bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-4 rounded-xl 
								flex items-center gap-3 text-lg mt-2'
								to={"/secret-dashboard"}
								onClick={() => setIsMenuOpen(false)}
							>
								🔒 Dashboard
							</Link>
						)}

						{user ? (
							<button
								className='bg-gradient-to-r from-gray-700 to-gray-600 text-white py-3 px-4 rounded-xl 
								flex items-center gap-3 text-lg mt-4 justify-center'
								onClick={() => {
									logout();
									setIsMenuOpen(false);
								}}
							>
								🚪 Log Out
							</button>
						) : (
							<div className='flex flex-col gap-3 mt-4'>
								<Link
									to={"/login"}
									className='bg-gradient-to-r from-gray-700 to-gray-600 text-white py-3 px-4 rounded-xl 
									flex items-center gap-3 text-lg justify-center'
									onClick={() => setIsMenuOpen(false)}
								>
									🔑 Login
								</Link>
								<Link
									to={"/signup"}
									className='bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-4 rounded-xl 
									flex items-center gap-3 text-lg justify-center'
									onClick={() => setIsMenuOpen(false)}
								>
									👤 Sign Up
								</Link>
							</div>
						)}
					</nav>
				</div>
			</header>
			
			{/* Spacer for fixed navbar */}
			<div className='h-16'></div>
		</>
	);
};

export default Navbar;