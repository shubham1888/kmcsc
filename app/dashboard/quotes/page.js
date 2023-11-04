'use server'
import Addquotescomponent from './addquotes'
import { MdDelete } from "react-icons/md"

const QuotesComponent = async () => {
  let res = {}
  let quotes = []
  try {
    res = await fetch(`${process.env.HOST_URL}/api/quotes?limit=6`, { cache: 'no-store' });
    quotes = await res.json()
  } catch (error) {
    console.error(error)
  }
  return (
    <div className='min-h-screen bg-gray-900 text-gray-400'>
      {/* Toast component */}
      <div className='text-center text-white text-3xl font-bold my-4'>Quotes</div>
      <Addquotescomponent />
      {/* quotes div */}
      <div>
        <h2 className='text-white text-center text-2xl my-6'>Some Quotes To Feel Positive And Motivated</h2>
        {quotes.map((quote) => {
          return (
            <div className='card bg-gray-800 p-4 rounded-lg my-6 flex justify-between items-center' key={quote._id.toString()}>
              <div>
                <div className="date my-2 mb-2">{quote.createdAt ? quote.createdAt.toString() : ''}</div>
                <div className="message">{quote.quote}</div>
              </div>
              <div>
                <MdDelete className='text-2xl hover:text-red-500 transition-all duration-250 hover:scale-125' />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default QuotesComponent