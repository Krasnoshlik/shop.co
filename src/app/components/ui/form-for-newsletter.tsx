export default function FormForNewsLetter() {
  return (
    <div className=' relative -top-[160px] max-w-containerScreen mx-4 my-5 bg-black rounded-[20px] py-8 px-6 text-white flex flex-col gap-8 lg:flex-row'>
        <h2 className=' text-3xl font-extrabold'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>

        <div className=' flex flex-col gap-3 w-full'>
            <input placeholder='Enter your email' className=' py-3 px-5 rounded-[62px] outline-none text-black font-medium text-sm lg:focus-within:bg-black lg:focus-within:text-white ease-in-out duration-500'/>
            <button className=' py-3 rounded-[62px] bg-white text-black font-medium text-sm lg:hover:bg-black lg:hover:text-white border lg:hover:border-white ease-in-out duration-500'>Subscribe to Newsletter</button>
        </div>
    </div>
)
}
