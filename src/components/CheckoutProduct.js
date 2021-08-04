import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from 'react-currency-formatter'
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket, removeOneFromBasket } from '../slices/basketSlice'

function CheckoutProduct({ id, title, price, rating, description, category, image, hasPrime, quantity }) {
    const dispatch = useDispatch()

    const addOneItemToBasket = () => {
        const product = {
            id, title, price, rating, description, category, image, hasPrime
        }
        dispatch(addToBasket(product))
    }

    const removeOneItemFromBasket = () => {
        const product = {
            id, title, price, rating, description, category, image, hasPrime
        }

        if (quantity === 1){
            dispatch(removeFromBasket({ id }))
        } else {
            dispatch(removeOneFromBasket(product))
        }
    }

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }))
    }

    return (
        <div className='grid grid-cols-5'>
            <Image
                src={image}
                height={200}
                width={200}
                objectFit='contain'
            />
            {/* Middle */}

            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className='h-5 text-yellow-500' />
                        ))
                    }
                </div>
                <p className='text-xs my-2 line-clamp-3'>{description}</p>
                <Currency quantity={price} currency='USD' />
                {hasPrime && (
                    <div className='flex items-center space-x-2'>
                        <img className='w-12' loading='lazy' src='https://links.papareact.com/fdw' alt='' />
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )}
            </div>
            {/* Right add/remove buttons */}
            <div className='flex flex-grow flex-col space-y-2 my-auto justify-self-center'>
                <div className='flex flex-grow items-center'>
                    <button className='itemToggle rounded-l-md' onClick={removeOneItemFromBasket}>-</button>
                    <p className='itemAmount'>{quantity}</p>
                    <button className='itemToggle rounded-r-md' onClick={addOneItemToBasket}>+</button>
                </div>
                <button className='button' onClick={removeItemFromBasket}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
