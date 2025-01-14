import Image from "next/image"
import { useSelector } from "react-redux"
import CheckoutProduct from "../components/CheckoutProduct"
import Header from "../components/Header"
import { selectItems, selectTotal } from "../slices/basketSlice"
import Currency from 'react-currency-formatter'
import { useSession } from "next-auth/client"

function Checkout() {
    const items = useSelector(selectItems)
    const [session] = useSession()
    const { total, itemAmount } = useSelector(selectTotal)

    console.log(total, itemAmount)

    return (
        <div className='bg-gray-100 h-10'>
            <Header />
            <main className='lg:flex max-w-screen-2xl mx-auto'>

                {/* Left */}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image
                        src='https://links.papareact.com/ikj'
                        width={1800}
                        height={500}
                        objectFit='contain'
                    />

                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0
                                ? 'Your Amazon Basket is empty'
                                : 'Shopping Basket'}
                        </h1>

                        {items.map((item, index) => (
                            <CheckoutProduct
                                key={index}
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                                quantity={item.quantity}
                            />
                        ))}

                    </div>
                </div>

                {/* Right */}

                {itemAmount > 0 && (
                    <div className='flex flex-col bg-white p-10 shadow-md my-5 w-96 max-w-xl'>
                        <>
                            <h2 className='whitespace-nowrap'>Subtotal ({itemAmount} items):
                                <span className='font-bold'>
                                    <Currency quantity={total} currency='USD' />
                                </span>
                            </h2>
                            <button disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {!session ? 'Sign In to checkout' : 'Proceed to checkout'}
                            </button>
                        </>
                    </div>
                )}

            </main>
        </div>
    )
}

export default Checkout
