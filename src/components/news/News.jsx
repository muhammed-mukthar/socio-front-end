import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Modal from 'react-modal'
import './news.scss'
// import { countries } from './Countries'
import CloseIcon from '@mui/icons-material/Close';

// const apiKey = process.env.NEWSAPI_KEY
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
        Axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=f17aff16c6524c5eb33e7d156dde18a0`).then(({ data }) => {
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
        <div className= 'news  '>
          

            <div className='container'>
                {articles.length ? articles.map((article, index) => (

                    <div className="article">                       
                            <img  src={article.urlToImage} alt="news img" />
                        <div class="p-5">
                            <a href="#">
                                <h5>{article.title}</h5>
                            </a>
                            <span className='font-light text-xs'>Author: {article.author}</span>
                            <p class="mb-3 font-normal text-gray-700 ">{article.description}</p>
                         
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

            {/* <Modal isOpen={modal} onRequestClose={() => { setModal(false) }} style={customStyles}>
                <div className='text-end'><CloseIcon onClick={() => { setModal(false) }} /></div>
                    
                  <img class="rounded-t-lg" src={item.urlToImage} alt="" />
                    
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{item.title}</h5>
                        </a>
                        <span className='font-light text-xs'>Author: {item.author}</span>
                       
                    </div>
                        <p class="mb-3 font-normal text-gray-700 ">{item.content}</p>

            </Modal> */}

        </div>
    )
}

export default News