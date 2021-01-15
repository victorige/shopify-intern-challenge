import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head'
import GlobalContext from '../context/GlobalContext'
import styles from '../styles/Home.module.css'


export default function Home() {

  const gContext = useContext(GlobalContext)
  const [images, setImages] = useState([]);

  useEffect(() => {
    /**
     * fetches the image data from GlobalContext loadImages function
     * then it changes the 'const images' state.
     */
    async function loadImages() {
      if(images.length === 0){
        const loadedImages = await gContext.loadImages()
        setImages([])
        return setImages(loadedImages);
      }
  }

  loadImages();
  }, []);

  useEffect(() => {}, [images]);

  /**
   * sorts the images and changes the 'const images' state.
   * @param {Array} dataImage - the images array to sort.
   * @param {string} dataBy - one property names to sort.
   * @param {string} dataOrder - one sort order. `'asc'`, `'desc'`
   *
   */
  const sortImages = async (images, by, order) =>{
    const loadedImages = await gContext.sortImages(images, by, order)
    setImages([])
    return setImages(loadedImages);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>victorige/shopify-challenge</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Shopify Challenge
        </h1>

        <p className={styles.description}>
          A sorting function for the image respository.
        </p>
   
         <button onClick={() => sortImages(images, 'id', 'desc')}>Sort by Oldest </button>
         <hr/>
         <button onClick={() => sortImages(images, 'id', 'asc')}>Sort by Newest </button>
         <hr/>
         <button onClick={() => sortImages(images, 'title', 'asc')}>Sort by A-Z (alphabetical order)</button>
         <hr/>
         <button onClick={() => sortImages(images, 'title', 'desc')}>Sort by Z-A (alphabetical order)</button>
          

        <div className={styles.grid}>
          {images.length > 0 ? images.map((data) => (
            <div key={data.id} className={styles.card}>
              <h3>{data.title}</h3>
              <img src={data.url} height={300} width={300} />
            </div>
          )) : ''}
        </div>
      </main>

      <footer className={styles.footer}>
          Developed by Victor Ige    
      </footer>
    </div>
  )
}
