const ContactPage = () => {
    return (
        <div className="grid h-full grid-cols-10 grid-rows-10 items-center divide-x divide-y text-4xl">
            <input 
                className="container h-full w-full flex items-center col-span-5 row-span-2" 
                placeholder="First Name"
            />
            <input 
                className="container h-full w-full flex items-center col-span-5 row-span-2" 
                placeholder="Last Name"
            />
            <input 
                className="container h-full w-full flex items-center col-span-5 row-span-2" 
                placeholder="Email"
            />
            <input 
                className="container h-full w-full flex items-center col-span-5 row-span-2" 
                placeholder="Subject"
            />
            <input 
                className="container h-full w-full flex items-center col-span-10 row-span-4" 
                placeholder="Message"
            />
            <div className="container h-full w-full flex items-center col-span-10 row-span-2">
                Submit
            </div>
        </div>
    )
}

export default ContactPage;