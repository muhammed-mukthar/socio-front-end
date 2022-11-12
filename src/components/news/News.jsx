import React, { useEffect, useState } from 'react'
import Axios from '../axios'
import Modal from 'react-modal'
import { countries } from './Countries'
import CloseIcon from '@mui/icons-material/Close';

const apiKey = process.env.REACT_APP_NEWS_KEY
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '35rem',
        height: '38rem',
        backgroundColor: '#fffff',
        border: 'none'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
};

function News() {
    Modal.setAppElement('#root')
    const [country, setCountry] = useState('in')
    const [articles, setArticles] = useState([])
    const [modal, setModal] = useState(false)
    const [item, setItem] = useState({})
    const [error, setError] = useState('')
    console.log(item.content)
    useEffect(() => {
        Axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`).then(({ data }) => {
            setArticles(data.articles)
            console.log(data.articles);
               console.log(data);
        }).catch((error) => {
            setError(error.message)
        })
    }, [country])

    const handleRead = (selected) => {
        setItem(selected)
        setModal(true)
    }
    return (
        <div className='m-3 flex flex-col justify-around '>
            <div className='w-40'>
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Choose a country</label>
                <select id="countries" onChange={(e) => setCountry(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {countries.map((country, index) => (
                        <option key={index} value={country.code}>{country.name}</option>
                    ))}
                </select>
            </div>

            <div className='flex flex-wrap justify-center gap-10 mt-5'>
                {articles.length ? articles.map((article, index) => (

                    <div class="max-w-sm max-h-sm bg-white rounded-lg border border-gray-200 shadow-md ">                       
                            <img class="rounded-t-lg" src={article.urlToImage} alt="news img" />
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{article.title}</h5>
                            </a>
                            <span className='font-light text-xs'>Author: {article.author}</span>
                            <p class="mb-3 font-normal text-gray-700 ">{article.description}</p>
                            <button onClick={() => handleRead(article)} class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    </div>

                )) :
                    <div class="max-w-sm max-h-sm bg-white rounded-lg border border-gray-200 shadow-md ">
                        {/* <a href="#">
                            <img class="rounded-t-lg" src={errImg} alt="" />
                        </a> */}
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Oops! {error}</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 ">Something went wrong, check your internet connection</p>
                        </div>
                    </div>
                }

            </div>

            <Modal isOpen={modal} onRequestClose={() => { setModal(false) }} style={customStyles}>
                <div className='text-end'><CloseIcon onClick={() => { setModal(false) }} /></div>
                    
                  <img class="rounded-t-lg" src={item.urlToImage} alt="" />
                    
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{item.title}</h5>
                        </a>
                        <span className='font-light text-xs'>Author: {item.author}</span>
                       
                    </div>
                        <p class="mb-3 font-normal text-gray-700 ">{item.content}</p>

            </Modal>

        </div>
    )
}

export default News