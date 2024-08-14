import { Heart, Search, ShoppingCart, UserRound } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='bg-gray-300'>
      <h1 className='flex justify-start text-2xl md:font-bold'>SHOPALL</h1>
      <ul className='flex justify-end italic text-xl'>
        <li className='mr-4'>Products</li>
        <li className='mr-4'>Categories</li>
        <li className='mr-4'>Customers</li>
        <li className='mr-4'>Orders</li>
        <li className='mr-4'>Support</li>
        <Search className='mr-4'/>
        <Heart className='mr-4'/>
        <ShoppingCart className='mr-4'/>
        <UserRound />
      </ul>
    </nav>
  );
}

export default Navbar;